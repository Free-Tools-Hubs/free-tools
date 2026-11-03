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
    Download,
    Wrench,
    ArrowRight
} from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/config';

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
        return {
            title: 'File Extension Not Found',
            robots: { index: false, follow: false }
        };
    }

    const cleanExt = file.ext.toUpperCase();
    let title = `What is a .${cleanExt} file? | ${file.name} | File Encyclopedia`;
    let description = `Learn all about .${file.ext} files. Discover what they are, how to open them, and which software programs support the ${file.name} format.`;

    if (file.category === 'code') {
        title = `.${cleanExt} File Extension — How to Open, View & Edit ${file.name} Online`;
        description = `Learn what a .${file.ext} file is and how to open, view, and edit ${file.name} format online or with modern IDEs. Free developer reference with syntax and software support.`;
    } else if (file.category === 'document' || file.category === 'image' || file.category === 'archive') {
        title = `.${cleanExt} File Extension — How to Open, View & Convert .${file.ext} Files`;
        description = `Learn what a .${file.ext} file is, which software programs open it, and how to convert ${file.name} format online for free without installing desktop software.`;
    }

    return {
        title,
        description,
        keywords: [`.${file.ext}`, `${file.ext} file`, `how to open ${file.ext}`, `${file.name}`, 'file extension encyclopedia'],
        alternates: {
            canonical: `/file-extension/${file.ext.toLowerCase()}`
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: `${SITE_URL}/file-extension/${file.ext.toLowerCase()}`,
            siteName: 'Free Tools Hubs',
            images: [
                {
                    url: '/og.png',
                    width: 1200,
                    height: 630,
                    alt: `.${cleanExt} File Extension`,
                },
            ],
        },
        twitter: {
            title,
            description,
            card: 'summary_large_image',
            images: ['/og.png'],
        },
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

    const getRelatedTools = (ext: string, category: string) => {
        const clean = ext.toLowerCase();
        if (clean === 'pdf') {
            return [
                { name: 'Merge PDF Files', href: '/tools/pdf/merge-pdf' },
                { name: 'PDF to Word Converter', href: '/tools/pdf/pdf-to-word' },
                { name: 'Compress PDF Online', href: '/tools/pdf/compress-pdf' },
            ];
        }
        if (category === 'document') {
            return [
                { name: 'Merge PDF Files', href: '/tools/pdf/merge-pdf' },
                { name: 'Word Counter & Text Analyzer', href: '/tools/text/word-counter' },
                { name: 'PDF Tools Hub', href: '/tools/pdf' },
            ];
        }
        if (category === 'image') {
            return [
                { name: 'PNG to JPG Converter', href: '/tools/image/png-to-jpg' },
                { name: 'Compress Image Online', href: '/tools/image/compress-image' },
                { name: 'WebP to JPG Converter', href: '/tools/image/webp-to-jpg' },
            ];
        }
        if (category === 'code' || clean === 'json' || clean === 'xml' || clean === 'sql') {
            return [
                { name: 'JSON Formatter & Validator', href: '/tools/developer/json-formatter' },
                { name: 'Base64 Encoder / Decoder', href: '/tools/developer/base64-encode-decode' },
                { name: 'Developer Tools Hub', href: '/tools/developer' },
            ];
        }
        if (category === 'archive' || category === 'database' || category === 'system') {
            return [
                { name: 'Base64 Encoder / Decoder', href: '/tools/developer/base64-encode-decode' },
                { name: 'Hash & Checksum Generator', href: '/tools/developer/hash-generator' },
                { name: 'Developer Tools Hub', href: '/tools/developer' },
            ];
        }
        return [
            { name: 'Unit & Format Converters', href: '/convert' },
            { name: 'Browse All Online Tools', href: '/tools' },
        ];
    };

    const relatedTools = getRelatedTools(file.ext, file.category);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "DefinedTerm",
                "name": `.${file.ext.toUpperCase()} File Extension`,
                "description": file.description,
                "inDefinedTermSet": {
                    "@type": "DefinedTermSet",
                    "name": "File Extension Encyclopedia",
                    "url": `${SITE_URL}/file-extension`
                }
            }} />
            <Breadcrumbs 
                items={[
                    { label: 'File Encyclopedia', href: '/file-extension' },
                    { label: `.${file.ext.toUpperCase()}`, href: `/file-extension/${file.ext.toLowerCase()}` }
                ]} 
            />
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

                        {/* Prominent Cross-Hub Tool Bridge */}
                        {relatedTools.length > 0 && (
                            <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Recommended Browser Utilities</span>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                            Online Tools & Converters for .{(file.ext).toUpperCase()}
                                        </h3>
                                    </div>
                                    <span className="text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                                        100% Free & Private
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                                    Need to process, convert, or format this file? Use our free browser tools without uploading sensitive data to cloud servers.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {relatedTools.map((t) => (
                                        <Link
                                            key={t.href}
                                            href={t.href}
                                            className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 hover:shadow-md transition-all group"
                                        >
                                            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                                {t.name}
                                            </span>
                                            <ArrowRight size={15} className="text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

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
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Wrench size={16} className="text-amber-500" />
                                Related Online Tools
                            </h3>
                            <div className="space-y-3">
                                {relatedTools.map((t) => (
                                    <Link
                                        key={t.href}
                                        href={t.href}
                                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 transition-colors group"
                                    >
                                        <span className="text-sm font-medium">{t.name}</span>
                                        <Download size={14} className="text-zinc-400 group-hover:text-amber-500 transition-colors" />
                                    </Link>
                                ))}
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
