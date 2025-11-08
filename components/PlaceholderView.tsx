
import React from 'react';
import { Button } from './common/Button';

interface PlaceholderViewProps {
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className="flex items-center justify-center h-full animate-fade-in">
             <div className="relative bg-gradient-to-br from-teal-400 to-sky-500 border border-white/30 p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-lg overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-16 -left-12 w-48 h-48 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center p-4">
                         <Icon className="w-full h-full text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white font-poppins drop-shadow-lg">{title}</h1>
                    <p className="mt-4 text-white/90 max-w-md drop-shadow-md">{description}</p>
                    <div className="mt-8">
                        <Button onClick={() => alert('This feature is chirping its way here soon!')} className="bg-white/90 text-teal-700 hover:bg-white">
                            Notify Me!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};