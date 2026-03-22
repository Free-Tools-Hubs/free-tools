'use client';

import { useState } from 'react';
import { ShieldCheck, Copy, Check, FileText, Settings, Download, Globe, Mail } from 'lucide-react';

export default function PrivacyPolicyGeneratorTool() {
    const [formData, setFormData] = useState({
        websiteName: '',
        websiteUrl: '',
        email: '',
        country: '',
        collectsCookies: true,
        collectsEmail: true,
        showsAds: true,
    });
    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePolicy = () => {
        if (!formData.websiteName || !formData.websiteUrl) return;

        const date = new Date().toLocaleDateString();
        const policy = `
# Privacy Policy for ${formData.websiteName}

Last Updated: ${date}

At ${formData.websiteName}, accessible from ${formData.websiteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${formData.websiteName} and how we use it.

## 1. Information we collect
${formData.collectsEmail ? `- Email addresses (when provided by the user)\n` : ''}${formData.collectsCookies ? `- Cookie data to improve user experience\n` : ''}- Log files (IP addresses, browser type, ISP, etc.)

## 2. How we use your information
We use the information we collect in various ways, including to:
- Provide, operate, and maintain our website
- Improve, personalize, and expand our website
- Understand and analyze how you use our website
- Develop new products, services, features, and functionality
${formData.showsAds ? `- Serve relevant advertisements to you via partners like Google AdSense\n` : ''}
## 3. Log Files
${formData.websiteName} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. 

## 4. Cookies and Web Beacons
${formData.collectsCookies ? `Like any other website, ${formData.websiteName} uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.` : `${formData.websiteName} does not use tracking cookies.`}

## 5. Contact Us
If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at ${formData.email || 'our support email'}.
        `;

        setGenerated(policy.trim());
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
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 shadow-2xl space-y-8">
                         <div className="flex items-center gap-4 mb-4">
                            <ShieldCheck className="text-brand-primary" size={24} />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Compliance Form</h3>
                         </div>

                         <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Website Name</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                                        <input
                                            type="text"
                                            className="w-full h-14 pl-12 pr-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-brand-primary transition-all"
                                            value={formData.websiteName}
                                            onChange={(e) => setFormData({...formData, websiteName: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Website URL</label>
                                    <input
                                        type="text"
                                        className="w-full h-14 px-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-brand-primary transition-all"
                                        placeholder="https://example.com"
                                        value={formData.websiteUrl}
                                        onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Contact Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                                    <input
                                        type="email"
                                        className="w-full h-14 pl-12 pr-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-brand-primary transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 rounded-lg border-2 border-zinc-200 checked:bg-brand-primary transition-all"
                                        checked={formData.collectsEmail}
                                        onChange={(e) => setFormData({...formData, collectsEmail: e.target.checked})}
                                    />
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">Do you collect user emails?</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 rounded-lg border-2 border-zinc-200 checked:bg-brand-primary transition-all"
                                        checked={formData.showsAds}
                                        onChange={(e) => setFormData({...formData, showsAds: e.target.checked})}
                                    />
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">Do you show Google Adsense ads?</span>
                                </label>
                            </div>

                            <button
                                onClick={generatePolicy}
                                disabled={!formData.websiteName || !formData.websiteUrl}
                                className="w-full py-6 rounded-3xl bg-zinc-950 text-white font-black uppercase tracking-[0.3em] hover:bg-brand-primary transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 shadow-xl"
                            >
                                <Settings size={20} />
                                Generate Policy
                            </button>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {generated ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center gap-2">
                                    <FileText className="text-zinc-400" size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Policy Markdown</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="px-6 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-black uppercase tracking-widest hover:text-brand-primary transition-all"
                                >
                                    {copied ? <Check size={14} className="inline mr-2 text-emerald-500" /> : <Copy size={14} className="inline mr-2" />}
                                    {copied ? 'Copied' : 'Copy Text'}
                                </button>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 font-mono text-sm leading-relaxed overflow-auto h-[32rem] whitespace-pre-wrap text-zinc-500 dark:text-zinc-300">
                                {generated}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-[4rem] border-4 border-dashed border-zinc-100 dark:border-zinc-800 gap-6 grayscale opacity-40">
                             <ShieldCheck size={80} strokeWidth={1} />
                             <p className="font-black uppercase tracking-[0.4em] text-xs text-center border-b-4 border-zinc-200 pb-4">Compliance Center</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-10 bg-zinc-950 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[100px] rounded-full group-hover:bg-brand-primary/20 transition-all duration-1000" />
                <div className="z-10 text-center md:text-left">
                    <h4 className="text-2xl font-black mb-1">Standard Compliance 2026</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">GPDR & CCPA Compliant Templates</p>
                </div>
                <div className="flex gap-4 z-10">
                    <div className="px-8 py-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 flex items-center gap-3">
                        <Download size={20} className="text-brand-primary" />
                        <span className="text-xs font-black uppercase tracking-widest">Instant Doc</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
