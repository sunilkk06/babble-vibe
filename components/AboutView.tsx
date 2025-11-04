
import React from 'react';

export const AboutView: React.FC = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-teal-400 p-8 prose prose-teal max-w-none">
            <h1 className="font-poppins">About ChirPolly: The Future of Language Learning</h1>
            <p>Welcome to ChirPolly, the next-generation, AI-powered language learning platform designed to take you beyond flashcards and into real-world conversational fluency. Our mission is to make mastering a new language an intuitive, engaging, and deeply personal experience. We believe that the key to true fluency lies in practice, context, and confidence—three pillars that form the core of our app.</p>

            <h2>Why ChirPolly?</h2>
            <p>While traditional apps teach you words, ChirPolly teaches you how to <em>use</em> them. Powered by Google's state-of-the-art Gemini models, we offer a suite of unique, monetizable features that you won't find anywhere else:</p>
            <ul>
                <li><strong>Dynamic Conversation Scenarios:</strong> Practice ordering coffee in a Parisian café or navigating a job interview in Berlin with an AI that responds naturally and provides instant grammar feedback.</li>
                <li><strong>AI-Powered Accent Training:</strong> Refine your pronunciation with our advanced voice recognition tool. Get real-time transcriptions and detailed accent analysis to sound more like a native speaker.</li>
                <li><strong>Live Native Tutors:</strong> Connect with real native speakers for on-demand micro-tutoring sessions, conversation practice, and personalized feedback.</li>
                <li><strong>Advanced Grammar & Writing Clinics:</strong> Move beyond the basics with expert-led workshops and professional proofreading services to perfect your writing skills.</li>
            </ul>

            <h2>Our Technology</h2>
            <p>At the heart of ChirPolly is the Gemini API, enabling us to create hyper-realistic learning environments. From the <strong>Live API (Gemini 2.5 Native Audio)</strong> for our Accent Training to the advanced reasoning of <strong>Gemini 2.5 Pro</strong> for our Grammar Clinics, we leverage cutting-edge AI to deliver a learning experience that is both effective and fun.</p>
            <p>Join our community and start your journey to fluency today. With ChirPolly, you're not just learning a language; you're starting a new conversation with the world.</p>
        </div>
    </div>
);