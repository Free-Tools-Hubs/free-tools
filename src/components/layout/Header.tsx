'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Moon, Sun, Menu, X, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchModal } from './SearchModal';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!mounted) return null;

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
                    isScrolled ? 'py-3 glass border-b' : 'py-5 bg-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Command size={24} />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-tight hidden sm:block">
                            FreeTools<span className="text-brand-primary">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/tools" className="text-sm font-medium hover:text-brand-primary transition-colors">
                            Explore Tools
                        </Link>
                        <Link href="/tools/image" className="text-sm font-medium hover:text-brand-primary transition-colors">
                            File & Image
                        </Link>
                        <Link href="/tools/pdf" className="text-sm font-medium hover:text-brand-primary transition-colors">
                            PDF
                        </Link>
                        <Link href="/tools/developer" className="text-sm font-medium hover:text-brand-primary transition-colors">
                            Dev
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Search Bar (Desktop) */}
                        <div
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 border cursor-pointer hover:border-brand-primary/50 transition-all group lg:min-w-[200px]"
                        >
                            <Search size={16} className="text-muted-foreground group-hover:text-brand-primary" />
                            <span className="text-xs text-muted-foreground">Search tools...</span>
                            <kbd className="hidden lg:flex ml-auto items-center gap-1 px-1.5 py-0.5 rounded border bg-background text-[10px] text-muted-foreground">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 glass border-b p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                        <Link href="/tools" className="text-lg font-medium py-2">All Tools</Link>
                        <Link href="/tools/image" className="text-lg font-medium py-2">File & Image Tools</Link>
                        <Link href="/tools/pdf" className="text-lg font-medium py-2">PDF Tools</Link>
                        <Link href="/tools/developer" className="text-lg font-medium py-2">Developer Tools</Link>
                        <div
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsSearchOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border"
                        >
                            <Search size={18} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Search tools...</span>
                        </div>
                    </div>
                )}
            </header>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
