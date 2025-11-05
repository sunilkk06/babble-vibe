
import { GoogleGenAI, Chat, GenerateContentResponse, Modality, Type } from "@google/genai";
import type { Message, ImageVocabularyWord } from '../types';

const getAIInstance = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        throw new Error("VITE_API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey });
};

let ai: GoogleGenAI | null = null;
let activeChat: Chat | null = null;

const grammarCheckPrompt = `
Also, analyze the user's last message for grammatical errors. 
If there are errors, provide a correction and a brief explanation in a section formatted EXACTLY like this, at the end of your response:
---GRAMMAR CHECK---
Correction: [The corrected sentence].
Explanation: [A short, clear explanation of the grammar rule].
---END GRAMMAR CHECK---
If there are no errors, do not include the grammar check section.
`;

export const startChat = (systemPrompt: string) => {
    if (!ai) ai = getAIInstance();
    activeChat = ai.chats.create({
        model: 'gemini-flash-lite-latest',
        config: {
            systemInstruction: systemPrompt,
        },
    });
};

export const sendMessage = async (message: string, includeGrammarCheck: boolean): Promise<GenerateContentResponse> => {
    if (!activeChat) {
        throw new Error("Chat not initialized. Call startChat first.");
    }
    const fullMessage = includeGrammarCheck ? `${message}\n${grammarCheckPrompt}` : message;
    const response = await activeChat.sendMessage({ message: fullMessage });
    return response;
};

export const analyzeGrammar = async (text: string): Promise<string> => {
    try {
        if (!ai) ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `You are an expert language tutor. Provide a detailed grammatical breakdown of the following text. Explain verb tenses, sentence structure, parts of speech, and any potential errors or areas for improvement. Format your response using markdown. Text: "${text}"`,
            config: {
                thinkingConfig: { thinkingBudget: 32768 }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing grammar:", error);
        return "Sorry, I couldn't analyze the grammar at this time.";
    }
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
        if (!ai) ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;
    } catch (error) {
        console.error("Error editing image:", error);
        return null;
    }
};

export const generateVocabularyFromImage = async (base64Image: string, mimeType: string, languageName: string): Promise<ImageVocabularyWord[] | null> => {
    const prompt = `Identify the main objects in this image. Provide a list of up to 7 vocabulary words for these objects in ${languageName}.
    Provide the response as a JSON array of objects. Each object must have three keys:
    1. "word": The vocabulary word in ${languageName}.
    2. "transliteration": A simple phonetic transliteration for pronunciation.
    3. "meaning": The English translation of the word.
    
    If you cannot identify any objects, return an empty array.`;

    try {
        if (!ai) ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            word: { type: Type.STRING },
                            transliteration: { type: Type.STRING },
                            meaning: { type: Type.STRING },
                        },
                        required: ["word", "transliteration", "meaning"],
                    },
                },
            },
        });

        const jsonString = response.text.trim();
        const vocabularyList = JSON.parse(jsonString);
        return vocabularyList as ImageVocabularyWord[];

    } catch (error) {
        console.error("Error generating vocabulary from image:", error);
        return null;
    }
};


export const generateSpeech = async (prompt: string): Promise<string | null> => {
    try {
        if (!ai) ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};

export const getPronunciationFeedback = async (originalText: string, userTranscription: string, languageName: string): Promise<string> => {
    const prompt = `You are an expert accent coach for ${languageName} learners. The user was asked to say "${originalText}". They pronounced it as "${userTranscription}".
    
Provide a short, constructive analysis of their pronunciation based on the transcription. 
- If the transcription is perfect or very close, praise them.
- If there are errors, focus on the potential mispronunciations and offer simple, actionable tips for improvement.
- Keep the feedback concise and encouraging.
- Format your response using markdown.
- Do not grade them or give a score.`;

    try {
        if (!ai) ai = getAIInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting pronunciation feedback:", error);
        return "Sorry, I couldn't provide feedback at this time.";
    }
};