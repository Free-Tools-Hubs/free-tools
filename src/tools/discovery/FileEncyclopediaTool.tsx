'use client';

import { useState } from 'react';
import { Search, Info, FileCode, ImageIcon, Music, Video, FileText, Monitor } from 'lucide-react';

const FILE_FORMATS = [
    { ext: '.jpg', name: 'JPEG Image', type: 'Image', desc: 'Standard compressed image format.', mime: 'image/jpeg' },
    { ext: '.png', name: 'Portable Network Graphics', type: 'Image', desc: 'Lossless image format with transparency support.', mime: 'image/png' },
    { ext: '.pdf', name: 'Portable Document Format', type: 'Document', desc: 'Versatile document format for sharing across platforms.', mime: 'application/pdf' },
    { ext: '.json', name: 'JSON Data', type: 'Developer', desc: 'Lightweight data interchange format.', mime: 'application/json' },
    { ext: '.csv', name: 'Comma Separated Values', type: 'Data', desc: 'Text-based spreadsheet data format.', mime: 'text/csv' },
    { ext: '.mp3', name: 'MPEG Layer-3 Audio', type: 'Audio', desc: 'The most popular format for digital music.', mime: 'audio/mpeg' },
    { ext: '.mp4', name: 'MPEG-4 Video', type: 'Video', desc: 'Standard format for web and streaming video.', mime: 'video/mp4' },
    { ext: '.exe', name: 'Executable File', type: 'System', desc: 'Program file for Windows environments.', mime: 'application/octet-stream' },
    { ext: '.zip', name: 'ZIP Archive', type: 'Archive', desc: 'Universal file compression format.', mime: 'application/zip' },
    { ext: '.html', name: 'HyperText Markup Language', type: 'Web', desc: 'The foundation of all web pages.', mime: 'text/html' },
    { ext: '.ts', name: 'TypeScript Source Code', type: 'Developer', desc: 'Typed superset of JavaScript.', mime: 'text/plain' },
    { ext: '.md', name: 'Markdown Documentation', type: 'Text', desc: 'Simple text format for documentation.', mime: 'text/markdown' },
];

export default function FileEncyclopediaTool() {
    const [search, setSearch] = useState('');

    const filtered = FILE_FORMATS.filter(f => 
        f.ext.toLowerCase().includes(search.toLowerCase()) || 
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.type.toLowerCase().includes(search.toLowerCase())
    );

    const getIcon = (type: string) => {
        switch(type) {
            case 'Image': return <ImageIcon size={24} />;
            case 'Audio': return <Music size={24} />;
            case 'Video': return <Video size={24} />;
            case 'Developer': return <FileCode size={24} />;
            case 'Document': return <FileText size={24} />;
            default: return <Monitor size={24} />;
        }
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-10">
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-primary transition-colors" size={24} />
                <input
                    type="text"
                    placeholder="Search by extension (e.g. .pdf) or format name..."
                    className="w-full pl-16 pr-8 py-6 bg-zinc-50 dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] outline-none focus:border-brand-primary transition-all font-black text-xl placeholder:text-zinc-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, idx) => (
                    <div 
                        key={idx}
                        className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 hover:border-brand-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                {getIcon(item.type)}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                {item.type}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-black mb-2 tracking-tight flex items-center gap-2">
                            {item.name}
                            <span className="text-sm font-bold text-brand-primary opacity-40">{item.ext}</span>
                        </h3>
                        
                        <p className="text-sm text-zinc-500 font-medium mb-6 leading-relaxed">
                            {item.desc}
                        </p>

                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-zinc-300 tracking-widest">MIME Type</span>
                                <code className="text-xs font-bold text-zinc-400">{item.mime}</code>
                            </div>
                            <button className="p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-brand-primary transition-colors">
                                <Info size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="py-24 flex flex-col items-center justify-center text-zinc-400">
                    <FileCode size={64} className="mb-6 opacity-20" />
                    <h4 className="text-xl font-black tracking-tight">Format Not Found</h4>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-50">Expanding our library daily</p>
                </div>
            )}
            
            <div className="mt-10 p-10 bg-zinc-950 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full group-hover:bg-brand-primary/20 transition-all duration-1000" />
                <div className="z-10 text-center md:text-left">
                    <h4 className="text-3xl font-black mb-2 tracking-tighter">Enterprise Knowledge Base</h4>
                    <p className="text-zinc-500 font-bold max-w-md">Our Encyclopedia covers the most essential file formats for modern business and development.</p>
                </div>
                <div className="flex gap-4 z-10">
                    <div className="px-6 py-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 flex flex-col items-center">
                        <span className="text-2xl font-black">250+</span>
                        <span className="text-[10px] font-black text-brand-primary uppercase">Formats</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
