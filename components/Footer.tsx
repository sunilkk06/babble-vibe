
import React from 'react';
import { Link } from 'react-router-dom';
import { VIEWS } from '../constants';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full mt-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm md:ml-72">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2">
                <Link to={VIEWS.ABOUT.path} className="hover:text-teal-600 transition-colors">About Us</Link>
                <Link to={VIEWS.TERMS.path} className="hover:text-teal-600 transition-colors">Terms of Service</Link>
                <Link to={VIEWS.PRIVACY.path} className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
            </div>
            <p className="mt-4">© {new Date().getFullYear()} ChirPolly. All rights reserved.</p>
        </footer>
    );
};