
import React from 'react';
import type { View } from '../types';
import { VIEWS } from '../constants';

interface FooterProps {
    onNavigate: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="w-full mt-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm md:ml-72">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(VIEWS.ABOUT); }} className="hover:text-teal-600 transition-colors">About Us</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(VIEWS.TERMS); }} className="hover:text-teal-600 transition-colors">Terms of Service</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(VIEWS.PRIVACY); }} className="hover:text-teal-600 transition-colors">Privacy Policy</a>
            </div>
            <p className="mt-4">© {new Date().getFullYear()} ChirPolly. All rights reserved.</p>
        </footer>
    );
};