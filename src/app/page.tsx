import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold mb-6 animate-bounce">
              <Sparkles size={14} />
              <span>100+ Professional Tools. Forever Free.</span>
            </div>
            <h1 className="font-outfit text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Power Your Workflow with <br />
              <span className="premium-gradient bg-clip-text text-transparent italic">Smart Micro Tools</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              A high-performance hub of free online tools for image processing, development, PDF management, and more. No registration, No watermarks, just speed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tools"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Browse All Tools <ArrowRight size={20} />
              </Link>
              <div className="flex items-center gap-4 px-6 py-4 glass rounded-2xl border">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-200 dark:bg-surface-800 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full premium-gradient opacity-50" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold">Used by 50k+ creators</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placeholder Header */}
        <div className="mb-20 px-4">
          <AdPlaceholder type="header" />
        </div>

        {/* Feature Highlights */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Edge Performance", desc: "Built with Next.js for sub-second load times and global distribution." },
            { icon: Shield, title: "Privacy First", desc: "Most tools process data locally in your browser. Your files never touch our servers." },
            { icon: Sparkles, title: "100% Free", desc: "No subscriptions, no hidden limits. Just professional tools at your fingertips." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 flex flex-col items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                <feature.icon size={28} />
              </div>
              <h3 className="font-outfit text-2xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Categories Grid */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-outfit text-4xl font-black mb-4">Explore toolkits</h2>
              <p className="text-muted-foreground font-medium">Browse our tools categorized by industry needs.</p>
            </div>
            <Link href="/tools" className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all tools <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Zap;
              return (
                <Link
                  key={cat.id}
                  href={`/tools/${cat.id}`}
                  className="glass-card p-8 group flex flex-col items-start gap-6 hover:translate-y-[-5px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-muted-foreground group-hover:text-brand-primary transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-xl mb-2">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="bg-surface-50 dark:bg-surface-950 py-32 px-4 md:px-8 border-y">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-outfit text-4xl font-black mb-4">Trending right now</h2>
            <p className="text-muted-foreground font-medium">The most used utilities this week.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.slice(0, 8).map((tool) => {
              const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
              return (
                <Link
                  key={tool.id}
                  href={tool.customPath || `/tools/${tool.category}/${tool.slug}`}
                  className="flex items-center gap-6 p-6 rounded-2xl border bg-background hover:border-brand-primary hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold mb-1">{tool.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
