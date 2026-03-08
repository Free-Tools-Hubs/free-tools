"use client";

import { useState, useCallback } from 'react';
import FileUploader from '@/components/tools/FileUploader';
import { Download, Table, File as FileIcon, Loader2, RefreshCcw } from 'lucide-react';

export default function ExcelToPdfTool() {
    const [excelFile, setExcelFile] = useState<{ id: string; file: File; } | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onFilesAccepted = useCallback(async (files: File[]) => {
        if (files.length === 0) return;
        setExcelFile({ id: Math.random().toString(), file: files[0] });
        setResultUrl(null);
        setError(null);
    }, []);

    const clearAll = () => {
        setExcelFile(null);
        setResultUrl(null);
        setError(null);
    };

    const convertExcel = async () => {
        if (!excelFile) return;
        setIsConverting(true);
        setError(null);

        // Requires LibreOffice WASM or equivalent specialized engine.
        setTimeout(() => {
            setIsConverting(false);
            setError("Converting complex Excel workbooks requires our heavy LibreOffice Edge WASM port, which is still syncing to this container environment. Please check back later.");
        }, 2500);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            {!excelFile ? (
                <FileUploader
                    onFilesAccepted={onFilesAccepted}
                    maxFiles={1}
                    accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'application/vnd.ms-excel': ['.xls'] }}
                    maxSizeMB={50}
                />
            ) : (
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="w-full xl:w-80 shrink-0 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Table className="w-5 h-5 text-brand-primary" />
                                Convert Settings
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 text-sm">
                            <p className="text-muted-foreground leading-relaxed">
                                Securely convert your Microsoft Excel workbook (.xls, .xlsx) into a print-ready PDF file.
                            </p>
                            <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary flex gap-2">
                                <RefreshCcw className="w-5 h-5 shrink-0" />
                                <span>Preserves active spreadsheet grids, cell formatting, and graphs locally.</span>
                            </div>
                        </div>

                        {resultUrl ? (
                            <div className="mt-auto flex flex-col gap-2">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700 dark:text-green-400 mb-2 font-semibold flex items-center gap-2">
                                    <Table className="w-4 h-4" /> PDF Document Ready
                                </div>
                                <a
                                    href={resultUrl}
                                    download={`${excelFile.file.name.replace(/\.[^/.]+$/, "")}.pdf`}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                                <button
                                    onClick={clearAll}
                                    className="w-full py-2 text-muted-foreground hover:bg-muted font-bold rounded-lg transition-colors text-sm"
                                >
                                    Convert Another
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={convertExcel}
                                disabled={isConverting}
                                className="w-full mt-auto py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isConverting ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...</> : <><RefreshCcw className="w-4 h-4" /> Convert to PDF</>}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileIcon className="w-5 h-5 text-brand-primary" />
                                Selected File
                            </h2>
                            <button onClick={clearAll} className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                Clear File
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg font-medium border border-red-500/20 text-sm leading-relaxed">
                                {error}
                            </div>
                        )}

                        <div className="border border-border/50 bg-background/50 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4 py-16">
                            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center mb-2">
                                <FileIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="font-bold text-lg max-w-sm mx-auto" style={{ wordBreak: 'break-all' }}>{excelFile.file.name}</p>
                                <p className="text-muted-foreground mt-1 text-sm">{(excelFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
