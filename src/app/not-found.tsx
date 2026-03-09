import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home, Search, ArrowLeft, Construction, FileQuestion, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
                <div className="max-w-2xl w-full text-center space-y-8 relative">
                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 premium-gradient opacity-10 blur-3xl -z-10" />

                    <div className="space-y-4">
                        <h1 className="text-9xl font-black font-outfit tracking-tighter text-brand-primary opacity-30">
                            404
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-tight mt-[-2rem]">
                            Lost in the Digital Hub?
                        </h2>
                    </div>

                    <div className="glass-card p-8 md:p-12 space-y-6 border-dashed border-2">
                        <div className="flex justify-center gap-8 text-muted-foreground opacity-30 mb-4">
                            <Construction size={48} strokeWidth={1} />
                            <FileQuestion size={48} strokeWidth={1} />
                            <AlertCircle size={48} strokeWidth={1} />
                        </div>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            The page you are looking for might have been <span className="text-foreground font-bold italic">moved</span>,
                            is <span className="text-foreground font-bold italic">coming soon</span>, or simply
                            <span className="text-foreground font-bold italic"> never existed</span> in this directory.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-brand-primary text-white font-bold hover:shadow-lg hover:shadow-brand-primary/20 transition-all group"
                            >
                                <Home size={18} />
                                <span>Back to Home</span>
                            </Link>
                            <Link
                                href="/tools"
                                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-surface-100 dark:bg-surface-900 border text-foreground font-bold hover:bg-background transition-all group"
                            >
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Explore Tools Hub</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                            <ArrowLeft size={14} />
                            Try one of our 100+ free digital utilities instead
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
