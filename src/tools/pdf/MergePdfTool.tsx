"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, File as FileIcon, Trash2, ArrowUp, ArrowDown, Settings } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFFile {
    id: string;
    file: File;
}

export default function MergePdfTool() {
    const [pdfs, setPdfs] = useState<PDFFile[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFilesAccepted = useCallback((files: File[]) => {
        setPdfs(prev => {
            const newFiles = files.map(file => ({
                id: Math.random().toString(36).substring(7),
                file,
            }));
            return [...prev, ...newFiles];
        });
        setMergedPdfUrl(null);
    }, []);

    const moveUp = (index: number) => {
        if (index === 0) return;
        setPdfs(prev => {
            const newArr = [...prev];
            const temp = newArr[index - 1];
            newArr[index - 1] = newArr[index];
            newArr[index] = temp;
            return newArr;
        });
        setMergedPdfUrl(null);
    };

    const moveDown = (index: number) => {
        if (index === pdfs.length - 1) return;
        setPdfs(prev => {
            const newArr = [...prev];
            const temp = newArr[index + 1];
            newArr[index + 1] = newArr[index];
            newArr[index] = temp;
            return newArr;
        });
        setMergedPdfUrl(null);
    };

    const removeFile = (id: string) => {
        setPdfs(prev => prev.filter(p => p.id !== id));
        setMergedPdfUrl(null);
    };

    const clearAll = () => {
        setPdfs([]);
        setMergedPdfUrl(null);
        setError(null);
    };

    const mergePdfs = async () => {
        if (pdfs.length < 2) {
            setError("Please add at least 2 PDF files to merge.");
            return;
        }

        setIsMerging(true);
        setError(null);
        try {
            const finalPdf = await PDFDocument.create();

            for (const pdfItem of pdfs) {
                const arrayBuffer = await pdfItem.file.arrayBuffer();
                const loadedPdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await finalPdf.copyPages(loadedPdf, loadedPdf.getPageIndices());
                copiedPages.forEach((page) => finalPdf.addPage(page));
            }

            const pdfBytes = await finalPdf.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
            setMergedPdfUrl(URL.createObjectURL(blob));
        } catch (err: any) {
            setError(err.message || 'Failed to merge PDFs. Ensure they are not password protected.');
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <FileUploader
                onFilesAccepted={onFilesAccepted}
                maxFiles={50}
                accept={{ 'application/pdf': ['.pdf'] }}
                maxSizeMB={50}
            />

            {error && (
                <div className="bg-red-500/10 text-red-500 p-4 rounded-lg font-semibold border border-red-500/20">
                    {error}
                </div>
            )}

            {pdfs.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Merge Order ({pdfs.length} files)
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear All
                            </button>
                            {mergedPdfUrl ? (
                                <a
                                    href={mergedPdfUrl}
                                    download={`Merged_Document_${new Date().getTime()}.pdf`}
                                    className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download Merged PDF
                                </a>
                            ) : (
                                <button
                                    onClick={mergePdfs}
                                    disabled={isMerging || pdfs.length < 2}
                                    className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:animate-pulse"
                                >
                                    {isMerging ? 'Merging...' : 'Merge PDFs'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {pdfs.map((pdf, index) => (
                            <div key={pdf.id} className="border border-border/50 rounded-lg p-3 flex items-center gap-4 bg-background/50 hover:bg-background transition-colors group">
                                <div className="flex flex-col gap-1 items-center">
                                    <button
                                        onClick={() => moveUp(index)}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-muted rounded text-muted-foreground disabled:opacity-30 transition-colors"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => moveDown(index)}
                                        disabled={index === pdfs.length - 1}
                                        className="p-1 hover:bg-muted rounded text-muted-foreground disabled:opacity-30 transition-colors"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="w-10 h-10 rounded bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                                    <FileIcon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate" title={pdf.file.name}>{pdf.file.name}</p>
                                    <p className="text-xs text-muted-foreground">{(pdf.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>

                                <button
                                    onClick={() => removeFile(pdf.id)}
                                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
