
import React, { useState, useRef } from 'react';
import { generateVocabularyFromImage } from '../services/geminiService';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { ImageIcon, SpeakerWaveIcon } from './icons/Icons';
import type { Language, ImageVocabularyWord } from '../types';

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

interface ImageEditorViewProps {
    language: Language;
}

export const ImageEditorView: React.FC<ImageEditorViewProps> = ({ language }) => {
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [vocabulary, setVocabulary] = useState<ImageVocabularyWord[]>([]);
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
            setImage(URL.createObjectURL(file));
            setVocabulary([]); // Reset vocab on new image
        }
    };

    const handleGenerate = async () => {
        if (!imageFile) {
            setError('Please upload an image first.');
            return;
        }
        setError('');
        setIsLoading(true);
        setVocabulary([]);
        
        try {
            const { mimeType, base64 } = await fileToGenerativePart(imageFile);
            const result = await generateVocabularyFromImage(base64, mimeType, language.name);
            
            if (result && result.length > 0) {
                setVocabulary(result);
            } else {
                setError('Could not identify any objects to generate vocabulary. Try another image.');
            }
        } catch (err) {
            setError('An error occurred during vocabulary generation. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl font-poppins">Visual Vocabulary Builder</h1>
                <p className="mt-2 text-lg text-gray-600">Learn new words in {language.name} from your own images.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left side: Image and controls */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col border-t-4 border-rose-400">
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
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleGenerate} disabled={isLoading || !imageFile}>
                             {isLoading ? <><Spinner size="sm" /> Learning words...</> : 'Generate Vocabulary'}
                        </Button>
                    </div>
                </div>

                {/* Right side: Vocabulary List */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-sky-400 min-h-[200px]">
                    <h2 className="text-xl font-bold font-poppins text-gray-700 mb-4">Words from your image</h2>
                    {isLoading ? (
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
    );
};