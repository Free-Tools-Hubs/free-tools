import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fileExtensions } from '@/data/file-extensions';
import Link from 'next/link';
import { 
    FileText, 
    Image as ImageIcon, 
    Music, 
    Video, 
    Code, 
    Archive, 
    Database, 
    Monitor, 
    ExternalLink,
    HelpCircle,
    Download
} from 'lucide-react';

interface Props {
    params: Promise<{ ext: string }>;
}

const CategoryIcon = ({ category, size = 24 }: { category: string, size?: number }) => {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { ext } = await params;
    const file = fileExtensions.find(f => f.ext.toLowerCase() === ext.toLowerCase());
    
    if (!file) {
        return { title: 'File Extension Not Found' };
    }

    const title = `What is a .${file.ext.toUpperCase()} file? | ${file.name} | File Encyclopedia`;
    const description = `Learn all about .${file.ext} files. Discover what they are, how to open them, and which software programs support the ${file.name} format.`;

    return {
        title,
        description,
        keywords: [`.${file.ext}`, `${file.ext} file`, `how to open ${file.ext}`, `${file.name}`, 'file extension encyclopedia'],
    };
}

export async function generateStaticParams() {
    return fileExtensions.map(file => ({
        ext: file.ext,
    }));
}

export default async function FileExtensionPage({ params }: Props) {
    const { ext } = await params;
    const file = fileExtensions.find(f => f.ext.toLowerCase() === ext.toLowerCase());

    if (!file) notFound();

    const related = fileExtensions
        .filter(f => f.category === file.category && f.ext !== file.ext)
        .slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12 mb-12 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="p-6 bg-amber-500 rounded-3xl text-white shadow-xl shadow-amber-500/20">
                        <CategoryIcon category={file.category} size={48} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-500">
                                .{file.ext} Extension
                            </span>
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                {file.category}
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black mb-2 tracking-tight">
                            {file.name}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <HelpCircle className="text-amber-500" />
                                What is a .{(file.ext).toUpperCase()} file?
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <p>{file.description}</p>
                                <p>
                                    As part of the <strong>{file.category}</strong> category, this format is highly optimized for 
                                    its specific use case. Whether you are using it for professional or personal tasks, 
                                    understanding how to handle <strong>.{file.ext}</strong> files is essential for efficient digital workflows.
                                </p>
                            </div>
                        </section>

                        <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <ExternalLink className="text-amber-500" />
                                How to open a .{(file.ext).toUpperCase()} file
                            </h2>
                            <p className="mb-6 text-zinc-600 dark:text-zinc-400">{file.howToOpen}</p>
                            
                            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-zinc-400 text-xs">Recommended Software</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {file.software.map(app => (
                                    <div key={app} className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="font-semibold text-sm">{app}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <div className="p-6 bg-zinc-900 rounded-2xl text-white">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Code className="text-amber-400" size={18} />
                                Technical Details
                            </h3>
                            <div className="space-y-4 text-xs">
                                <div>
                                    <span className="text-zinc-500 block mb-1">MIME Type</span>
                                    <code className="bg-zinc-800 px-2 py-1 rounded text-amber-300 break-all">{file.mimeType}</code>
                                </div>
                                <div>
                                    <span className="text-zinc-500 block mb-1">Category</span>
                                    <span className="font-bold uppercase tracking-widest">{file.category}</span>
                                </div>
                                <div className="pt-4 border-t border-zinc-800 mt-4">
                                    <p className="text-zinc-400 italic">
                                        Note: Always be cautious when opening unknown file extensions to protect your computer from malware.
                                    </p>
                                </div>
                            </div>
                        </div>

                         <div className="p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold mb-4">Common Actions</h3>
                            <div className="space-y-3">
                                <Link href="/tools/convert" className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors group">
                                    <span className="text-sm font-medium">Convert File</span>
                                    <Download size={16} className="text-zinc-400 group-hover:text-amber-500" />
                                </Link>
                                <Link href="/tools" className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors group">
                                    <span className="text-sm font-medium">View Tools</span>
                                    <ImageIcon size={16} className="text-zinc-400 group-hover:text-amber-500" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Section */}
            {related.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-8">Related {file.category} Extensions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {related.map(f => (
                            <Link 
                                key={f.ext} 
                                href={`/file-extension/${f.ext}`}
                                className="p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-all text-center group"
                            >
                                <div className="inline-flex p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <CategoryIcon category={f.category} size={20} />
                                </div>
                                <span className="block font-black text-xl mb-1 uppercase">.{f.ext}</span>
                                <span className="block text-[10px] text-zinc-500 truncate uppercase tracking-tighter">{f.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
