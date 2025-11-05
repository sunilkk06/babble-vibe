

import React, { useState, useRef } from 'react';
import { generateVocabularyFromImage, editImage } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { ImageIcon, SpeakerWaveIcon } from './icons/Icons';
import type { Language, ImageVocabularyWord } from '../types';

interface ImageData {
    base64: string;
    mimeType: string;
}

export const ImageEditorView: React.FC<{ language: Language }> = ({ language }) => {
    const [image, setImage] = useState<string | null>(null);
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [vocabulary, setVocabulary] = useState<ImageVocabularyWord[]>([]);
    const [isLoadingVocab, setIsLoadingVocab] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [vocabError, setVocabError] = useState('');
    const [editError, setEditError] = useState('');
    const [editPrompt, setEditPrompt] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                setVocabError('Image size should be less than 4MB.');
                return;
            }
            setVocabError('');
            setEditError('');

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = (reader.result as string).split(',')[1];
                setImageData({ mimeType: file.type, base64 });
                setImage(URL.createObjectURL(file));
                setVocabulary([]); // Reset vocab on new image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateVocab = async () => {
        if (!imageData) {
            setVocabError('Please upload an image first.');
            return;
        }
        setVocabError('');
        setIsLoadingVocab(true);
        setVocabulary([]);
        
        try {
            const result = await generateVocabularyFromImage(imageData.base64, imageData.mimeType, language.name);
            
            if (result && result.length > 0) {
                setVocabulary(result);
            } else {
                setVocabError('Could not identify any objects to generate vocabulary. Try another image.');
            }
        } catch (err) {
            setVocabError('An error occurred during vocabulary generation. Please try again.');
            console.error(err);
        } finally {
            setIsLoadingVocab(false);
        }
    };

    const handleEditImage = async () => {
        if (!imageData) {
            setEditError('Please upload an image first.');
            return;
        }
        if (!editPrompt.trim()) {
            setEditError('Please enter a prompt to edit the image.');
            return;
        }
        setEditError('');
        setIsEditing(true);

        try {
            const newBase64 = await editImage(imageData.base64, imageData.mimeType, editPrompt);
            if (newBase64) {
                // The edited image is likely a PNG, let's update the data
                const newMimeType = 'image/png';
                const newImageData = { base64: newBase64, mimeType: newMimeType };
                setImageData(newImageData);
                setImage(`data:${newMimeType};base64,${newBase64}`);
                setEditPrompt(''); // Clear prompt on success
            } else {
                setEditError('Could not edit the image. Please try a different prompt.');
            }
        } catch (err) {
            setEditError('An error occurred while editing the image. Please try again.');
            console.error(err);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Visual Vocabulary & AI Image Editor</h1>
                <p className="mt-2 text-lg text-gray-600">Learn from your images, then transform them with AI.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left side: Image and controls */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col border-t-4 border-rose-400 space-y-6">
                    <div
                        className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-300/80 rounded-lg cursor-pointer hover:border-teal-400 transition-colors aspect-video"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {image ? (
                            <img src={image} alt="Uploaded" className="max-h-full max-w-full object-contain rounded-md" />
                        ) : (
                            <div className="text-center text-gray-500 p-4">
                                <ImageIcon className="mx-auto h-12 w-12" />
                                <p className="mt-2 font-semibold">Click to upload an image</p>
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
                    
                    {/* Image Editor Section */}
                    <div className="border-t border-slate-200 pt-6">
                         <h3 className="text-xl font-bold font-poppins text-gray-700 mb-2">Edit Image</h3>
                        <p className="text-sm text-gray-600 mb-4">Describe the change you want to make, powered by Gemini 2.5 Flash Image.</p>
                        <textarea
                            value={editPrompt}
                            onChange={(e) => setEditPrompt(e.target.value)}
                            placeholder="e.g., 'Add a retro filter' or 'make the sky blue'"
                            className="w-full h-20 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                            disabled={isEditing}
                        />
                        {editError && <p className="text-red-500 text-sm mt-2">{editError}</p>}
                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleEditImage} disabled={isEditing || !imageData}>
                                {isEditing ? <><Spinner size="sm" /> Applying Edit...</> : 'Apply Edit'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right side: Vocabulary List */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-sky-400">
                    <h2 className="text-xl font-bold font-poppins text-gray-700 mb-2">Vocabulary Builder</h2>
                    <p className="text-sm text-gray-600 mb-4">Generate vocabulary in {language.name} from your image.</p>
                    {vocabError && <p className="text-red-500 text-sm my-4">{vocabError}</p>}
                    <div className="mb-4 flex justify-end">
                        <Button onClick={handleGenerateVocab} disabled={isLoadingVocab || !imageData}>
                             {isLoadingVocab ? <><Spinner size="sm" /> Learning words...</> : 'Generate Vocabulary'}
                        </Button>
                    </div>

                    <div className="min-h-[200px]">
                        {isLoadingVocab ? (
                            <div className="text-center py-10">
                                <Spinner />
                                <p className="mt-2 text-gray-600">Identifying objects...</p>
                            </div>
                        ) : vocabulary.length > 0 ? (
                            <div className="space-y-3 animate-fade-in">
                                {vocabulary.map((item, index) => (
                                    <div key={index} className="p-3 bg-sky-50 rounded-lg border border-sky-200/50 flex items-center">
                                        <div className="flex-grow">
                                            <div className="flex items-baseline gap-x-3">
                                                <p className="text-xl font-bold text-sky-800">{item.word}</p>
                                                <p className="text-md text-gray-500 font-mono">({item.transliteration})</p>
                                            </div>
                                            <p className="text-gray-700 mt-1 capitalize">{item.meaning}</p>
                                        </div>
                                        <button title="Play audio (coming soon)" disabled className="p-2 rounded-full bg-sky-100 text-sky-700 ml-4 cursor-not-allowed">
                                            <SpeakerWaveIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 py-10">
                                <p>Your new vocabulary words will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};