
import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";
import type { Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    activeChat = ai.chats.create({
        // Fix: Updated model name to 'gemini-flash-lite-latest' as per the coding guidelines for 'flash lite' models.
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

export const generateSpeech = async (prompt: string): Promise<string | null> => {
    try {
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