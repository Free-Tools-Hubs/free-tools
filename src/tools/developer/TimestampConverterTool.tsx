"use client";

import { useState, useEffect } from 'react';
import { Copy, Clock, Calendar, ArrowRightLeft } from 'lucide-react';

export default function TimestampConverterTool() {
    const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
    const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
    const [dateStr, setDateStr] = useState<string>('');

    const [humanDate, setHumanDate] = useState<string>('');
    const [isLive, setIsLive] = useState(true);

    useEffect(() => {
        if (!isLive) return;
        const interval = setInterval(() => {
            setTimestamp(Math.floor(Date.now() / 1000).toString());
        }, 1000);
        return () => clearInterval(interval);
    }, [isLive]);

    useEffect(() => {
        try {
            const ts = parseInt(timestamp);
            if (isNaN(ts)) throw new Error('Invalid');
            const date = new Date(unit === 'seconds' ? ts * 1000 : ts);
            setDateStr(date.toISOString().slice(0, 19)); // For datetime-local input

            const formatted = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'full',
                timeStyle: 'long',
            }).format(date);

            setHumanDate(formatted);
        } catch (e) {
            setHumanDate('Invalid Date');
        }
    }, [timestamp, unit]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLive(false);
        const val = e.target.value;
        setDateStr(val);
        const newDate = new Date(val);
        const newTs = Math.floor(newDate.getTime() / (unit === 'seconds' ? 1000 : 1));
        setTimestamp(newTs.toString());
    };

    const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLive(false);
        setTimestamp(e.target.value);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Clock className="w-6 h-6 text-brand-primary" />
                        Unix Epoch Converter
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setIsLive(!isLive); if (!isLive) setTimestamp(Math.floor(Date.now() / 1000).toString()); }}
                            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${isLive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'}`}
                        >
                            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-brand-primary'}`}></span>
                            {isLive ? 'Stop Live Clock' : 'Start Live Clock'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                    {/* Timestamp Side */}
                    <div className="flex flex-col gap-4 bg-muted/50 p-6 rounded-xl border border-border">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            <Clock className="w-4 h-4 text-brand-primary" /> Unix Timestamp
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={timestamp}
                                onChange={handleTimestampChange}
                                className="w-full text-2xl font-black font-mono bg-background border border-border rounded-lg p-3 outline-brand-primary"
                            />
                        </div>
                        <div className="flex gap-2 text-sm font-semibold">
                            <button
                                onClick={() => { setUnit('seconds'); setTimestamp(Math.floor(Date.now() / 1000).toString()); }}
                                className={`flex-1 py-1.5 rounded border transition-colors ${unit === 'seconds' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-background hover:bg-muted'}`}
                            >
                                Seconds (s)
                            </button>
                            <button
                                onClick={() => { setUnit('milliseconds'); setTimestamp(Date.now().toString()); }}
                                className={`flex-1 py-1.5 rounded border transition-colors ${unit === 'milliseconds' ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-background hover:bg-muted'}`}
                            >
                                Millis (ms)
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 md:my-0">
                        <div className="p-3 bg-brand-primary text-white rounded-full shadow-lg md:rotate-0 rotate-90">
                            <ArrowRightLeft className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Human Date Side */}
                    <div className="flex flex-col gap-4 bg-muted/50 p-6 rounded-xl border border-border">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            <Calendar className="w-4 h-4 text-brand-primary" /> Human Readable Date
                        </label>
                        <input
                            type="datetime-local"
                            value={dateStr}
                            onChange={handleDateChange}
                            step="1"
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary h-[60px]"
                        />
                        <div className="text-sm font-bold text-muted-foreground pt-1.5 text-center px-2 py-1.5 bg-background rounded border border-border h-[34px] overflow-hidden truncate">
                            {humanDate}
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 mt-4">
                    <h3 className="font-bold border-b border-border pb-2 text-lg">Code Snippets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                        <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
                            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">JavaScript / TypeScript</span>
                            <code>
                                <span className="text-brand-primary">Math</span>.floor(<span className="text-brand-primary">Date</span>.now() / <span className="text-orange-500">1000</span>)
                            </code>
                        </div>
                        <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
                            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Python</span>
                            <code>
                                <span className="text-purple-500">import</span> time<br />
                                <span className="text-brand-primary">int</span>(time.time())
                            </code>
                        </div>
                        <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
                            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">PHP</span>
                            <code>
                                time()
                            </code>
                        </div>
                        <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
                            <span className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Go</span>
                            <code>
                                time.Now().Unix()
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
