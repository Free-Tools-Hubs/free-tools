"use client";

import { useState } from 'react';
import { Clock, RefreshCcw } from 'lucide-react';

export default function TimeDurationCalculatorTool() {
    const [startTime, setStartTime] = useState<string>('09:00');
    const [endTime, setEndTime] = useState<string>('17:00');

    const calculateDuration = () => {
        if (!startTime || !endTime) return null;

        const start = new Date(`1970-01-01T${startTime}:00`);
        let end = new Date(`1970-01-01T${endTime}:00`);

        // If end time is before start time, assume it crosses midnight
        if (end < start) {
            end = new Date(`1970-01-02T${endTime}:00`);
        }

        const diffMs = end.getTime() - start.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const totalMins = diffHrs * 60 + diffMins;

        return { hours: diffHrs, minutes: diffMins, totalMins };
    };

    const duration = calculateDuration();

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Clock className="w-6 h-6 text-brand-primary" />
                        Time Duration Calculator
                    </h2>
                    <button
                        onClick={() => { setStartTime(''); setEndTime(''); }}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            Start Time
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                            End Time
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full text-lg font-bold bg-background border border-border rounded-lg p-4 outline-brand-primary"
                        />
                    </div>
                </div>

                {duration ? (
                    <div className="flex flex-col gap-8 mt-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex flex-col items-center justify-center text-center gap-2 shadow-sm">
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-primary">Total Duration</span>
                            <span className="text-4xl md:text-5xl font-black text-foreground">
                                {duration.hours}h {duration.minutes}m
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Total Minutes</span>
                                <span className="text-2xl font-black">{duration.totalMins.toLocaleString()} min</span>
                            </div>
                            <div className="p-4 bg-muted border border-border rounded-xl text-center flex flex-col gap-1 shadow-sm">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">Decimal Hours</span>
                                <span className="text-2xl font-black">{(duration.totalMins / 60).toFixed(2)} hrs</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-muted-foreground -mt-2">
                            Note: If the End Time is earlier than the Start Time, the calculator assumes the end time is on the next day.
                        </p>
                    </div>
                ) : (
                    <div className="p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center gap-2 mt-4 text-muted-foreground">
                        <Clock className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Enter both Start and End times above.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
