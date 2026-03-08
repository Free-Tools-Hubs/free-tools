"use client";

import { useState, useCallback, useEffect } from 'react';
import { Lock, Copy, RefreshCcw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function PasswordGeneratorTool() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        // Ensure at least one set is checked
        if (charset === '') {
            setPassword('');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += charset[array[i] % charset.length];
        }

        setPassword(result);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const handleCopy = async () => {
        if (!password) return;
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const getStrength = () => {
        let score = 0;
        if (!password) return { label: 'None', color: 'bg-muted border-border text-muted-foreground', icon: Shield };
        if (password.length > 8) score += 1;
        if (password.length > 12) score += 1;
        if (password.length > 16) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score < 3) return { label: 'Weak', color: 'bg-red-500/10 border-red-500/20 text-red-500', icon: ShieldAlert };
        if (score < 5) return { label: 'Medium', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500', icon: Shield };
        return { label: 'Strong', color: 'bg-green-500/10 border-green-500/20 text-green-500', icon: ShieldCheck };
    };

    const strength = getStrength();
    const StrengthIcon = strength.icon;

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Lock className="w-6 h-6 text-brand-primary" />
                        Password Generator
                    </h2>
                    <button
                        onClick={generatePassword}
                        className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Generate
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="relative group">
                        <div className="w-full min-h-[96px] p-6 pr-24 bg-muted border-2 border-border shadow-inner rounded-xl font-mono text-3xl font-black text-foreground break-all cursor-text select-all flex items-center tracking-wider text-center flex-wrap justify-center">
                            {password || <span className="text-muted-foreground opacity-50">Select options...</span>}
                        </div>

                        <button
                            onClick={handleCopy}
                            disabled={!password}
                            title="Copy Password"
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-background text-brand-primary border border-border hover:bg-brand-primary hover:text-white shadow-md rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group-hover:flex"
                        >
                            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center justify-center gap-2 font-bold ${strength.color}`}>
                        <StrengthIcon className="w-5 h-5" />
                        Password Strength: {strength.label}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8 mt-4">
                        <div className="flex flex-col gap-6">
                            <label className="text-sm font-bold text-foreground flex justify-between items-center">
                                Password Length:
                                <span className="text-xl text-brand-primary mx-4 bg-muted px-4 rounded">{length}</span>
                            </label>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full accent-brand-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer border border-border"
                            />
                            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                                <span>4 chars</span>
                                <span>64 chars</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 bg-muted/30 p-6 rounded-xl border border-border">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeUppercase}
                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Uppercase (A-Z)</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeLowercase}
                                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Lowercase (a-z)</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Numbers (0-9)</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                />
                                <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors">Symbols (!@#$...)</span>
                            </label>
                        </div>
                    </div>

                    {!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold rounded-lg text-center animate-pulse">
                            You must select at least one character set!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
