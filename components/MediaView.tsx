import React, { useState } from 'react';
import type { MediaItem, Language } from '../types';
import { MEDIA_ITEMS } from '../constants';
import { PlayIcon } from './icons/Icons';

const MediaPlayerModal: React.FC<{ item: MediaItem; onClose: () => void }> = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full p-6 text-center border border-white/30 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-10">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg"/>
            <h2 className="text-2xl font-bold font-poppins text-slate-800">{item.title}</h2>
            <p className="text-slate-600 mt-2">{item.description}</p>
            <div className="mt-6">
                <p className="text-slate-500">Simulating media playback...</p>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                    <div className="bg-cyan-500 h-2.5 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const MediaCard: React.FC<{ item: MediaItem; onPlay: (item: MediaItem) => void }> = ({ item, onPlay }) => {
    const typeLabels = {
        podcast: { label: 'Podcast', color: 'bg-cyan-500' },
        short_film: { label: 'Short Film', color: 'bg-indigo-500' },
        comic: { label: 'Comic', color: 'bg-amber-500' },
    };
    
    return (
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="relative">
                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover"/>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <button onClick={() => onPlay(item)} className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                        <PlayIcon className="w-8 h-8 ml-1"/>
                    </button>
                </div>
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${typeLabels[item.type].color}`}>
                    {typeLabels[item.type].label}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-1 h-10 line-clamp-2">{item.description}</p>
                <p className="text-xs text-slate-500 mt-2 font-semibold">{item.duration}</p>
            </div>
        </div>
    );
};

export const MediaView: React.FC<{ language: Language }> = ({ language }) => {
    const [playingItem, setPlayingItem] = useState<MediaItem | null>(null);

    const handlePlay = (item: MediaItem) => {
        setPlayingItem(item);
    };

    const handleClosePlayer = () => {
        setPlayingItem(null);
    };

    const filteredMedia = MEDIA_ITEMS.filter(item => item.lang === language.code);

    return (
        <div className="animate-fade-in">
            {playingItem && <MediaPlayerModal item={playingItem} onClose={handleClosePlayer} />}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl font-poppins">
                    Immersive Media
                </h1>
                <p className="mt-2 text-lg text-slate-600">Learn with podcasts, short films, and comics in {language.name}.</p>
            </div>
            
            {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia.map(item => (
                        <MediaCard key={item.id} item={item} onPlay={handlePlay} />
                    ))}
                </div>
            ) : (
                <div className="col-span-full text-center py-12 bg-white/50 backdrop-blur-lg border border-white/30 rounded-lg">
                    <p className="text-slate-500">No media available for {language.name} yet. Try another language!</p>
                </div>
            )}
        </div>
    );
};
