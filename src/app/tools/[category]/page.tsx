import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    return categories.map((cat) => ({
        category: cat.id,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = categories.find((c) => c.id === categoryId);

    if (!category) return { title: 'Category Not Found' };

    return {
        title: `${category.title} | FreeToolsHub`,
        description: category.description,
        keywords: `${category.title}, ${category.icon}`,
        openGraph: {
            title: `${category.title} | FreeToolsHub`,
            description: category.description,
            type: 'website',
            url: `https://free-tools-steel.vercel.app/tools/${categoryId}`,
            siteName: 'Free Tools',
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/tools/${categoryId}.png`,
                    width: 1200,
                    height: 630,
                    alt: `${category.title} | FreeToolsHub`,
                },
            ],
        },
        twitter: {
            title: `${category.title} | FreeToolsHub`,
            description: category.description,
            card: 'summary_large_image',
            images: [
                {
                    url: `https://free-tools-steel.vercel.app/tools/${categoryId}.png`,
                    width: 1200,
                    height: 630,
                    alt: `${category.title} | FreeToolsHub`,
                },
            ],
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categoryId } = await params;
    const category = categories.find((c) => c.id === categoryId);

    if (!category) notFound();

    const categoryTools = tools.filter((t) => t.category === categoryId);
    const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Zap;

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/tools" className="hover:text-brand-primary transition-colors">Tools</Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground">{category.title}</span>
                </nav>

                <section className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            <Icon size={24} />
                        </div>
                        <h1 className="font-outfit text-4xl font-black tracking-tight">{category.title}</h1>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed font-medium">
                        {category.description} Explore our collection of high-performance {category.title.toLowerCase()} designed to speed up your workflow.
                    </p>
                </section>

                <AdPlaceholder type="header" className="mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {categoryTools.map((tool) => {
                        const ToolIcon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
                        return (
                            <Link
                                key={tool.id}
                                href={tool.customPath || `/tools/${tool.category}/${tool.slug}`}
                                className="glass-card p-8 group hover:translate-y-[-4px]"
                            >
                                <div className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6 group-hover:text-brand-primary transition-colors">
                                    <ToolIcon size={20} />
                                </div>
                                <h2 className="font-bold text-xl mb-3">{tool.title}</h2>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                                    {tool.description}
                                </p>
                                <div className="flex items-center gap-2 text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Open Tool <ArrowRight size={16} />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* SEO Content Section */}
                <section className="glass-card p-10 md:p-16">
                    <h2 className="font-outfit text-3xl font-black mb-8 italic">About our {category.title}</h2>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                        <p>
                            FreeToolsHub provides professional-grade {category.title.toLowerCase()} that are 100% free to use.
                            Whether you are a developer, designer, or creator, our utilities are built to be fast, secure, and privacy-focused.
                        </p>
                        <p>
                            Most of our {category.title.toLowerCase()} process your data locally in your browser. This means your sensitive files
                            and information never leave your device, providing an extra layer of security compared to traditional online tools.
                        </p>
                        <h3 className="text-foreground font-bold text-xl">Key Benefits:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Speed:</strong> Powered by Next.js and global CDNs for sub-second performance.</li>
                            <li><strong>Privacy:</strong> Local browser-side processing for most tools.</li>
                            <li><strong>Ease of Use:</strong> Clean, distraction-free interface optimized for all devices.</li>
                            <li><strong>No Cost:</strong> No hidden subscriptions, no registration required.</li>
                        </ul>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
