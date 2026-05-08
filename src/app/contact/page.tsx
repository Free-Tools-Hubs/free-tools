import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Mail, MessageSquare, Send, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us - Get in Touch | FreeToolsHubs',
    description: 'Have a question, feedback, or a feature request? Reach out to the FreeToolsHubs team. We are always happy to help and improve our toolsets.',
    alternates: {
        canonical: '/contact'
    },
    robots: {
        index: false,
        follow: true
    }
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tight">
                        Let's <span className="premium-gradient bg-clip-text text-transparent italic">Connect</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Whether you've found a bug, have a suggestion for a new tool, or just want to say hi, we'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                <p className="text-sm text-muted-foreground">support@FreeToolsHubs.com</p>
                                <p className="text-sm text-muted-foreground">hello@FreeToolsHubs.com</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Feedback</h3>
                                <p className="text-sm text-muted-foreground">We usually respond within 24-48 hours on business days.</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                                <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p className="text-sm text-muted-foreground">Sat - Sun: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Placeholder */}
                    <div className="md:col-span-2 glass-card p-8 md:p-10">
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-transparent focus:border-brand-primary focus:ring-0 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-transparent focus:border-brand-primary focus:ring-0 transition-all outline-none"
                                />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-sm font-bold">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Tool Suggestion / Bug Report / Other"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-transparent focus:border-brand-primary focus:ring-0 transition-all outline-none"
                                />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-sm font-bold">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-transparent focus:border-brand-primary focus:ring-0 transition-all outline-none resize-none"
                                ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <button
                                    type="button"
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg"
                                >
                                    <Send size={18} /> Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
