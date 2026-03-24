import Link from 'next/link';
import { Command, Github, Twitter, Mail } from 'lucide-react';
import { categories } from '@/data/categories';

export function Footer() {
    return (
        <footer className="bg-surface-50 dark:bg-surface-950 border-t pt-20 pb-10 px-4 md:px-8 text-foreground">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Command size={24} />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-tight">
                            FreeTools<span className="text-brand-primary">Hub</span>
                        </span>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        The ultimate hub for high-performance online tools. 100% free, secure, and privacy-focused toolsets for developers and creators.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://x.com/Talnovaofficial" className="w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                            <Twitter size={18} />
                        </Link>
                        <Link href="https://github.com/kavicastelo/" className="w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                            <Github size={18} />
                        </Link>
                        <Link href="mailto:info@talnova.io" className="w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                            <Mail size={18} />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-outfit font-bold mb-6 text-lg">Categories</h3>
                    <ul className="grid grid-cols-1 gap-3">
                        {categories.slice(0, 5).map((cat) => (
                            <li key={cat.id}>
                                <Link href={`/tools/${cat.id}`} className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">
                                    {cat.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-outfit font-bold mb-6 text-lg">Popular Tools</h3>
                    <ul className="grid grid-cols-1 gap-3">
                        <li><Link href="/tools/image/png-to-jpg" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">PNG to JPG</Link></li>
                        <li><Link href="/tools/developer/json-formatter" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">JSON Formatter</Link></li>
                        <li><Link href="/tools/text/word-counter" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Word Counter</Link></li>
                        <li><Link href="/tools/generators/password-generator" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Password Generator</Link></li>
                        <li><Link href="/tools/pdf/merge-pdf" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Merge PDF</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-outfit font-bold mb-6 text-lg">Platform</h3>
                    <ul className="grid grid-cols-1 gap-3">
                        <li><Link href="/about" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Disclaimer</Link></li>
                        <li><Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors">Sitemap</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-outfit font-bold mb-6 text-lg">Hubs</h3>
                    <ul className="grid grid-cols-1 gap-3">
                        <li><Link href="/define" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors italic">English Dictionary</Link></li>
                        <li><Link href="/city" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors italic">City Weather Hub</Link></li>
                        <li><Link href="/country" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors italic">Country Facts Guide</Link></li>
                        <li><Link href="/colors" className="text-sm text-muted-foreground hover:text-brand-primary transition-colors italic">Color Value Explorer</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-surface-200 dark:border-surface-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} FreeToolsHubs. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <span>Privacy Focused</span>
                    <span>No Data Collection</span>
                    <span>High Performance</span>
                </div>
            </div>
        </footer>
    );
}
