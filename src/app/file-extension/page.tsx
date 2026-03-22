import { Metadata } from 'next';
import { fileExtensions } from '@/data/file-extensions';
import Link from 'next/link';
import FileExtensionExplorer from './FileExtensionExplorer';
import { 
    FileText, 
    Image as ImageIcon, 
    Music, 
    Video, 
    Code, 
    Archive, 
    Database, 
    Monitor, 
    HelpCircle 
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'File Extension Encyclopedia | How to open any file | Free Tools Hub',
    description: 'A comprehensive database of over 5000+ file extensions. Learn what each file type is, how to open it, and which software programs you need.',
    keywords: ['file extensions', 'how to open file', 'file encyclopedia', 'file types list', 'mime types'],
};

const CategoryIcon = ({ category, size = 20 }: { category: string, size?: number }) => {
    switch (category) {
        case 'document': return <FileText size={size} />;
        case 'image': return <ImageIcon size={size} />;
        case 'audio': return <Music size={size} />;
        case 'video': return <Video size={size} />;
        case 'code': return <Code size={size} />;
        case 'archive': return <Archive size={size} />;
        case 'database': return <Database size={size} />;
        case 'system': return <Monitor size={size} />;
        default: return <HelpCircle size={size} />;
    }
};

export default function FileEncyclopediaIndex() {
    const categories = Array.from(new Set(fileExtensions.map(f => f.category)));
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 pb-40">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    Professional Encyclopedia
                </div>
                <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter italic bg-gradient-to-br from-zinc-950 to-zinc-500 dark:from-white dark:to-zinc-600 bg-clip-text text-transparent">
                    File Encyclopedia
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
                   Your one-stop guide to understanding every file format. 
                   Find technical details, compatibility info, and step-by-step instructions on how to open any file type.
                </p>
                <FileExtensionExplorer />
            </div>

            {/* Main Content Hub */}
            <div className="space-y-32">
                {categories.map(cat => (
                    <section key={cat}>
                         <div className="flex items-end justify-between mb-10 border-b-2 border-zinc-100 dark:border-zinc-900 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-amber-500">
                                    <CategoryIcon category={cat} size={28} />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tight">{cat} Files</h2>
                            </div>
                            <span className="text-xs font-mono text-zinc-400 tracking-widest bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
                                {fileExtensions.filter(f => f.category === cat).length} EXTENSIONS
                            </span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {fileExtensions.filter(f => f.category === cat).map(file => (
                                <Link 
                                    key={file.ext} 
                                    href={`/file-extension/${file.ext}`}
                                    className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/5 transition-all group relative overflow-hidden active:scale-95"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 border border-zinc-100 dark:border-zinc-900 rounded-xl group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-colors">
                                             <CategoryIcon category={file.category} size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-amber-500/50 transition-colors uppercase">.{file.ext}</span>
                                    </div>
                                    <span className="block font-black text-2xl uppercase mb-1 tracking-tighter">.{file.ext}</span>
                                    <span className="block text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase font-bold truncate tracking-tighter">{file.name}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Informational SEO Content Block */}
            <section className="mt-40 prose dark:prose-invert max-w-4xl mx-auto border-t border-zinc-100 dark:border-zinc-900 pt-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-6">Why Do File Extensions Matter?</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        File extensions are short identifiers that tell operating systems like Windows and macOS which application is responsible for handling a file. 
                        Without these identifiers, your computer wouldn't know if a file is an image, a document, or an executable program.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-zinc-50 dark:bg-zinc-900/50 p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Compatibility Across Platforms</h3>
                        <p className="text-sm leading-relaxed text-zinc-500">
                            Many formats like <strong>.PDF</strong>, <strong>.JPG</strong>, and <strong>.MP4</strong> are cross-platform, meaning they work 
                            flawlessly on both Windows and Mac. Others, like <strong>.DMG</strong> or <strong>.EXE</strong>, are platform-specific. 
                            Our encyclopedia helps you identify whether a file is compatible with your current device.
                        </p>
                    </div>
                    <div>
                         <h3 className="text-xl font-bold mb-4">Software Recommendations</h3>
                        <p className="text-sm leading-relaxed text-zinc-500">
                            A common issue users face is having a file but not the right software to open it. 
                            We provide curated lists of the best software for each extension, focusing on both 
                            professional tools (like Adobe Creative Cloud) and free open-source alternatives (like VLC or LibreOffice).
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
