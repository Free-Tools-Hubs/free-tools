'use client';

import { generateCityWeatherArticle } from '@/lib/seo-generator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import Link from 'next/link';
import { ChevronRight, Cloud, Thermometer, Wind, Droplets, Sun, Compass, HelpCircle } from 'lucide-react';

interface WeatherTemplateProps {
    city: string;
    description: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export function CityWeatherTemplate({ city, description, temp, feelsLike, humidity, windSpeed, country, sunrise, sunset }: WeatherTemplateProps) {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
            <Header />

            <main className="flex-grow pt-28 md:pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/tools" className="hover:text-brand-primary transition-colors">Tools</Link>
                    <ChevronRight size={12} />
                    <span className="capitalize">City Guides</span>
                    <ChevronRight size={12} />
                    <span className="text-foreground capitalize">{city}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Weather Hero Card */}
                        <section className="glass-card p-8 md:p-12 relative overflow-hidden text-foreground">
                            <div className="absolute top-0 right-0 w-64 h-64 premium-gradient opacity-10 blur-3xl -mr-32 -mt-32" />

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                <div>
                                    <div className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs mb-3">
                                        <Compass size={14} /> LIVE WEATHER IN {country}
                                    </div>
                                    <h1 className="font-outfit text-4xl md:text-6xl font-black capitalize tracking-tight mb-2">
                                        {city}
                                    </h1>
                                    <p className="text-muted-foreground font-medium text-lg capitalize italic">
                                        {description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 bg-surface-100 dark:bg-surface-900 border p-6 rounded-3xl shadow-inner">
                                    <div className="text-center">
                                        <div className="text-5xl font-black tracking-tighter text-brand-primary">
                                            {Math.round(temp)}°C
                                        </div>
                                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                            Currently
                                        </div>
                                    </div>
                                    <div className="w-px h-12 bg-surface-200 dark:bg-surface-800 mx-2" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-muted-foreground">
                                            {Math.round(feelsLike)}°
                                        </div>
                                        <div className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-1">
                                            Feels Like
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-surface-50 dark:bg-surface-900/50 border rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Thermometer className="text-orange-500" size={20} />
                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-60">Temperature</div>
                                    <div className="font-black">{temp}°C</div>
                                </div>
                                <div className="bg-surface-50 dark:bg-surface-900/50 border rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Droplets className="text-blue-500" size={20} />
                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-60">Humidity</div>
                                    <div className="font-black">{humidity}%</div>
                                </div>
                                <div className="bg-surface-50 dark:bg-surface-900/50 border rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Wind className="text-cyan-500" size={20} />
                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-60">Wind Speed</div>
                                    <div className="font-black">{windSpeed} m/s</div>
                                </div>
                                <div className="bg-surface-50 dark:bg-surface-900/50 border rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Sun className="text-yellow-500" size={20} />
                                    <div className="text-xs font-bold text-muted-foreground uppercase opacity-60">Clouds</div>
                                    <div className="font-black">{description}</div>
                                </div>
                            </div>
                        </section>

                        {/* Ad Placeholder */}
                        <AdPlaceholder type="content" />

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="glass-card p-8">
                                <h3 className="font-outfit font-bold text-xl mb-6 italic flex items-center gap-2">
                                    <Sun size={20} className="text-yellow-500" /> Daylight Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 border rounded-xl bg-surface-50 dark:bg-surface-900/30">
                                        <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Sunrise</span>
                                        <span className="font-black text-brand-primary">{formatTime(sunrise)}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 border rounded-xl bg-surface-50 dark:bg-surface-900/30">
                                        <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Sunset</span>
                                        <span className="font-black text-orange-500">{formatTime(sunset)}</span>
                                    </div>
                                </div>
                            </section>

                            <section className="glass-card p-8">
                                <h3 className="font-outfit font-bold text-xl mb-6 italic flex items-center gap-2">
                                    <Cloud size={20} className="text-blue-500" /> Travel Quick Tip
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    Planning a trip to <strong className="text-foreground">{city}</strong>? Currently, it's {temp > 25 ? 'quite warm' : temp < 10 ? 'chilly' : 'mild'}.
                                    {humidity > 70 ? ' Expect some humidity.' : ' The air is relatively dry.'}
                                </p>
                                <Link href={`/time-in/${city.toLowerCase()}`} className="text-xs font-black text-brand-primary hover:underline underline-offset-4 flex items-center gap-1">
                                    CHECK LOCAL TIME <ChevronRight size={12} />
                                </Link>
                            </section>
                        </div>

                        {/* Complete Guide SEO Article */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-6 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                    <Cloud size={18} />
                                </div>
                                The Complete Guide to {city} Weather
                            </h2>
                            <div className="space-y-4">
                                {generateCityWeatherArticle(city, country, temp, feelsLike, description, humidity, windSpeed).map((paragraph: string, idx: number) => (
                                    <p key={idx} className="text-muted-foreground leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>

                        {/* FAQ SEO Snippet */}
                        <section className="glass-card p-8 md:p-12">
                            <h2 className="font-outfit text-2xl font-bold mb-8 italic flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <HelpCircle size={18} />
                                </div>
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-black mb-2">What is the weather in {city} right now?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Currently, it is {description} in {city} with a temperature of {Math.round(temp)}°C. The humidity is {humidity}% and winds are blowing at {windSpeed} m/s.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-black mb-2">When is the best time to visit {city}?</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The best time to visit {city} ({country}) depends on your preference for climate, but the current mild conditions of {Math.round(temp)}°C offer a great insight into {city}'s typical atmosphere.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-8">
                        <AdPlaceholder type="sidebar" />
                        <div className="glass-card p-8">
                            <h3 className="font-outfit font-bold text-xl mb-6 italic">Popular Cities</h3>
                            <div className="space-y-3">
                                <Link href="/city/london" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex justify-between items-center group">
                                    <span>London, UK</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/city/new-york" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex justify-between items-center group">
                                    <span>New York, USA</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/city/tokyo" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex justify-between items-center group">
                                    <span>Tokyo, Japan</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <Link href="/city/paris" className="block p-4 rounded-xl border bg-surface-50 dark:bg-surface-900/50 hover:border-brand-primary transition-all text-sm font-bold flex justify-between items-center group">
                                    <span>Paris, France</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
