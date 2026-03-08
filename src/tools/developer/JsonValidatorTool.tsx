"use client";

import { useState } from 'react';
import { Trash2, ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function JsonValidatorTool() {
    const [input, setInput] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateJson = () => {
        if (!input.trim()) {
            setIsValid(null);
            setErrorMessage(null);
            return;
        }
        try {
            JSON.parse(input);
            setIsValid(true);
            setErrorMessage(null);
        } catch (err: any) {
            setIsValid(false);
            setErrorMessage(err.message || 'Invalid JSON format');
        }
    };

    const clearAll = () => {
        setInput('');
        setIsValid(null);
        setErrorMessage(null);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand-primary" />
                        JSON Validator
                    </h2>
                    <button
                        onClick={clearAll}
                        disabled={!input}
                        className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" /> Clear
                    </button>
                </div>

                <textarea
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (e.target.value.trim() === '') {
                            setIsValid(null);
                            setErrorMessage(null);
                        } else {
                            // Optional: live validation
                        }
                    }}
                    placeholder="Paste your JSON string here to validate..."
                    className="w-full h-[400px] p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-mono text-sm leading-relaxed"
                    spellCheck={false}
                />

                <div className="flex gap-4 pt-2">
                    <button
                        onClick={validateJson}
                        disabled={!input.trim()}
                        className="px-6 py-3 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-md transition-colors flex items-center gap-2 disabled:opacity-50 w-full justify-center text-lg"
                    >
                        <ShieldCheck className="w-5 h-5" /> Validate JSON Code
                    </button>
                </div>

                {isValid !== null && (
                    <div className={`mt-4 p-6 rounded-xl border ${isValid ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'} animate-in fade-in slide-in-from-top-4 flex items-start gap-4 shadow-sm`}>
                        {isValid ? (
                            <>
                                <CheckCircle2 className="w-8 h-8 shrink-0 text-green-500" />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-bold">Valid JSON</h3>
                                    <p className="opacity-90">The provided text is a perfectly valid JSON object/array. No syntax errors were found.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-8 h-8 shrink-0 text-red-500" />
                                <div className="flex flex-col gap-1 w-full relative">
                                    <h3 className="text-xl font-bold">Invalid JSON</h3>
                                    <p className="font-mono text-sm bg-red-500/10 p-3 rounded mt-2 break-all overflow-x-auto border border-red-500/10">
                                        {errorMessage}
                                    </p>
                                    <div className="mt-3 flex items-center gap-2 opacity-80 text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        Check for missing quotes, trailing commas, or unescaped characters.
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
