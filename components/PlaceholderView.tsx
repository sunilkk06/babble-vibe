
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
             <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-8 sm:p-12 rounded-2xl shadow-lg text-center max-w-lg">
                <Icon className="w-24 h-24 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-slate-800 font-poppins">{title}</h1>
                <p className="mt-4 text-slate-600 max-w-md">{description}</p>
                <div className="mt-8">
                    <Button disabled={true}>
                        Coming Soon!
                    </Button>
                </div>
            </div>
        </div>
    );
};
