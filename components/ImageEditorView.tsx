
import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { ImageIcon } from './icons/Icons';

const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; base64: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({ mimeType: file.type, base64 });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const ImageEditorView: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                setError('Image size should be less than 4MB.');
                return;
            }
            setError('');
            setImageFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setEditedImage(null);
        }
    };

    const handleEdit = async () => {
        if (!imageFile || !prompt.trim()) {
            setError('Please upload an image and provide an editing prompt.');
            return;
        }
        setError('');
        setIsLoading(true);
        setEditedImage(null);
        
        try {
            const { mimeType, base64 } = await fileToGenerativePart(imageFile);
            const result = await editImage(base64, mimeType, prompt);
            if (result) {
                setEditedImage(`data:${mimeType};base64,${result}`);
            } else {
                setError('Could not generate the edited image. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during image editing. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Vocabulary</h1>
                <p className="mt-2 text-lg text-gray-600">Edit images with text prompts. Try "add a retro filter" or "make the sky purple".</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col border-t-4 border-rose-400">
                    <div
                        className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-300/80 rounded-lg cursor-pointer hover:border-teal-400 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {originalImage ? (
                            <img src={originalImage} alt="Original" className="max-h-96 object-contain rounded-md" />
                        ) : (
                            <div className="text-center text-gray-500">
                                <ImageIcon className="mx-auto h-12 w-12" />
                                <p className="mt-2">Click to upload an image</p>
                                <p className="text-xs">PNG, JPG, WEBP up to 4MB</p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Add a smiling sun in the corner"
                            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            disabled={isLoading}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleEdit} disabled={isLoading || !imageFile}>
                             {isLoading ? <><Spinner size="sm" /> Generating...</> : 'Magic Edit!'}
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center border-t-4 border-sky-400">
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner />
                            <p className="mt-2 text-gray-600">Gemini is creating your image...</p>
                        </div>
                    ) : editedImage ? (
                        <img src={editedImage} alt="Edited" className="max-h-full object-contain rounded-md animate-fade-in" />
                    ) : (
                        <div className="text-center text-gray-400">
                            <p>Your edited image will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};