'use client';

import { useState } from 'react';
import { FileText, Copy, Check, Settings, Download, Globe, Shield, Scale } from 'lucide-react';

export default function TermsAndConditionsGeneratorTool() {
    const [formData, setFormData] = useState({
        websiteName: '',
        websiteUrl: '',
        companyName: '',
        country: '',
        ageRequirement: '13',
    });
    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);

    const generateTerms = () => {
        if (!formData.websiteName || !formData.websiteUrl) return;

        const date = new Date().toLocaleDateString();
        const terms = `
# Terms and Conditions for ${formData.websiteName}

Welcome to ${formData.websiteName}!

Last Updated: ${date}

These terms and conditions outline the rules and regulations for the use of ${formData.websiteName}'s Website, located at ${formData.websiteUrl}.

By accessing this website we assume you accept these terms and conditions. Do not continue to use ${formData.websiteName} if you do not agree to take all of the terms and conditions stated on this page.

## 1. Intellectual Property Rights
Other than the content you own, under these Terms, ${formData.companyName || formData.websiteName} and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.

## 2. Restrictions
You are specifically restricted from all of the following:
- Publishing any Website material in any other media;
- Selling, sublicensing and/or otherwise commercializing any Website material;
- Publicly performing and/or showing any Website material;
- Using this Website in any way that is or may be damaging to this Website;
- Using this Website in any way that impacts user access to this Website;
- Using this Website contrary to applicable laws and regulations.

## 3. Your Content
In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant ${formData.websiteName} a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

## 4. No warranties
This Website is provided "as is," with all faults, and ${formData.websiteName} expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website.

## 5. Limitation of liability
In no event shall ${formData.companyName || formData.websiteName}, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website.

## 6. Governing Law & Jurisdiction
These Terms will be governed by and interpreted in accordance with the laws of ${formData.country || 'the State'}, and you submit to the non-exclusive jurisdiction of the state and federal courts located in ${formData.country || 'the State'} for the resolution of any disputes.
        `;

        setGenerated(terms.trim());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generated);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-10 flex flex-col gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] bg-zinc-950 text-white shadow-2xl space-y-8 relative overflow-hidden group">
                         <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-primary/10 blur-[100px] rounded-full group-hover:bg-brand-primary/20 transition-all duration-1000" />
                         
                         <div className="flex items-center gap-4 mb-4 z-10 relative">
                            <Scale className="text-brand-primary" size={24} />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Legal Agreement Wizard</h3>
                         </div>

                         <div className="space-y-6 z-10 relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Website Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-14 px-6 bg-white/5 border-2 border-white/10 rounded-2xl font-bold outline-none focus:border-brand-primary transition-all text-white"
                                        value={formData.websiteName}
                                        onChange={(e) => setFormData({...formData, websiteName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Website URL</label>
                                    <input
                                        type="text"
                                        className="w-full h-14 px-6 bg-white/5 border-2 border-white/10 rounded-2xl font-bold outline-none focus:border-brand-primary transition-all text-white"
                                        placeholder="https://example.com"
                                        value={formData.websiteUrl}
                                        onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Company Entity (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full h-14 px-6 bg-white/5 border-2 border-white/10 rounded-2xl font-bold outline-none focus:border-brand-primary transition-all text-white"
                                    placeholder="e.g. My Company LLC"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Governing Country/State</label>
                                    <input
                                        type="text"
                                        className="w-full h-14 px-6 bg-white/5 border-2 border-white/10 rounded-2xl font-bold outline-none focus:border-brand-primary transition-all text-white"
                                        placeholder="e.g. United Kingdom"
                                        value={formData.country}
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Minimum Age Requirement</label>
                                    <select
                                        className="w-full h-14 px-6 bg-white/5 border-2 border-white/10 rounded-2xl font-bold outline-none focus:border-brand-primary transition-all text-white appearance-none cursor-pointer"
                                        value={formData.ageRequirement}
                                        onChange={(e) => setFormData({...formData, ageRequirement: e.target.value})}
                                    >
                                        <option value="13" className="bg-zinc-900 text-white">13+ Years</option>
                                        <option value="16" className="bg-zinc-900 text-white">16+ Years</option>
                                        <option value="18" className="bg-zinc-900 text-white">18+ Years</option>
                                        <option value="none" className="bg-zinc-900 text-white">No Requirement</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={generateTerms}
                                disabled={!formData.websiteName || !formData.websiteUrl}
                                className="w-full py-6 mt-4 rounded-3xl bg-brand-primary text-white font-black uppercase tracking-[0.4em] hover:bg-white hover:text-zinc-950 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(242,125,12,0.3)]"
                            >
                                <Scale size={20} />
                                Draft Agreement
                            </button>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {generated ? (
                        <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
                            <div className="flex items-center justify-between px-6">
                                <div className="flex items-center gap-3">
                                    <Shield size={18} className="text-brand-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Legal Document Ready</span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCopy}
                                        className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-all hover:scale-110 active:scale-90"
                                    >
                                        {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 font-mono text-sm leading-relaxed overflow-auto h-[35rem] whitespace-pre-wrap text-zinc-600 dark:text-zinc-400 shadow-inner">
                                {generated}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-950 rounded-[4rem] border-4 border-dashed border-zinc-100 dark:border-zinc-900 gap-8 grayscale opacity-20">
                             <div className="relative">
                                <FileText size={100} strokeWidth={1} />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
                                    <div className="w-24 h-1 bg-zinc-400 rounded-full" />
                                </div>
                             </div>
                             <div className="text-center space-y-2">
                                <h4 className="text-2xl font-black tracking-tight text-zinc-400 italic">No Active Contract</h4>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Drafting logic idle</p>
                             </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-white dark:bg-zinc-800 shadow-xl border border-zinc-100 dark:border-zinc-700">
                         <Globe className="text-brand-primary" size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black tracking-tight mb-1 italic">Global Compatibility</h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Standardized for international digital services</p>
                    </div>
                </div>
                <div className="flex gap-4">
                     <div className="px-6 py-4 bg-zinc-950 text-white rounded-2xl flex flex-col items-center min-w-[120px]">
                        <span className="text-2xl font-black">2026</span>
                        <span className="text-[9px] font-black uppercase opacity-60">Verified</span>
                     </div>
                </div>
            </div>
        </div>
    );
}
