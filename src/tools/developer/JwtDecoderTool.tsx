"use client";

import { useState } from 'react';
import { Copy, Trash2, Key, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function JwtDecoderTool() {
    const [input, setInput] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');
    const [signature, setSignature] = useState('');
    const [error, setError] = useState<string | null>(null);

    const decodeJwt = (token: string) => {
        setInput(token);
        if (!token.trim()) {
            setHeader('');
            setPayload('');
            setSignature('');
            setError(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('JWT must have exactly 3 parts separated by dots.');
            }

            const decodedHeader = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
            const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));

            setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
            setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
            setSignature(parts[2]);
            setError(null);
        } catch (err: any) {
            setHeader('');
            setPayload('');
            setSignature('');
            setError(err.message || 'Invalid JWT format.');
        }
    };

    const clearAll = () => {
        setInput('');
        setHeader('');
        setPayload('');
        setSignature('');
        setError(null);
    };

    const loadExample = () => {
        decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Key className="w-5 h-5 text-brand-primary" />
                        Encoded JWT
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={loadExample}
                            className="px-3 py-1.5 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-lg transition-colors"
                        >
                            Example
                        </button>
                        <button
                            onClick={clearAll}
                            disabled={!input}
                            className="px-3 py-1.5 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" /> Clear
                        </button>
                    </div>
                </div>

                <textarea
                    value={input}
                    onChange={(e) => decodeJwt(e.target.value)}
                    placeholder="eyJo..."
                    className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-border resize-y focus:outline-none focus:ring-2 focus:ring-brand-primary/50 font-mono text-sm leading-relaxed break-all"
                    spellCheck={false}
                />

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-semibold flex items-center gap-3 animate-in fade-in">
                        <ShieldAlert className="w-6 h-6 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {header && payload && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[#fb2] uppercase tracking-wider flex items-center gap-2">
                            Header <span className="text-xs text-muted-foreground font-normal normal-case">(Algorithm & Token Type)</span>
                        </h2>
                        <pre className="w-full flex-1 p-4 rounded-lg bg-muted border border-border overflow-auto font-mono text-sm text-[#fb2]">
                            {header}
                        </pre>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[#d63] uppercase tracking-wider flex items-center gap-2">
                            Payload <span className="text-xs text-muted-foreground font-normal normal-case">(Data)</span>
                        </h2>
                        <pre className="w-full flex-1 p-4 rounded-lg bg-muted border border-border overflow-auto font-mono text-sm text-[#d63]">
                            {payload}
                        </pre>
                    </div>

                    <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[#00b9f1] uppercase tracking-wider flex items-center gap-2">
                            Signature <span className="text-xs text-muted-foreground font-normal normal-case">(Verify)</span>
                        </h2>
                        <div className="w-full p-4 rounded-lg bg-muted border border-border overflow-auto font-mono text-sm break-all text-[#00b9f1]">
                            {signature}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            <span className="italic">Note: Validation of signature against a secret key must be done server-side securely. We only decode the Base64 chunks locally.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
