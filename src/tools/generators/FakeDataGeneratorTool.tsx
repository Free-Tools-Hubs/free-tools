"use client";

import { useState } from 'react';
import { Database, Download, RefreshCcw, Copy, Check } from 'lucide-react';

const FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com", "mail.com", "company.net"];
const STREETS = ["Main St", "Oak St", "Pine St", "Maple Ave", "Cedar Ln", "Elm St", "Washington Blvd", "Lake St", "Hill Rd", "Park Ave"];
const CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

export default function FakeDataGeneratorTool() {
    const [count, setCount] = useState<number>(10);
    const [format, setFormat] = useState<'JSON' | 'CSV' | 'SQL'>('JSON');
    const [fields, setFields] = useState({
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        date_of_birth: false,
        company: false
    });
    const [dataStr, setDataStr] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const generateDataList = () => {
        const records: any[] = [];
        for (let i = 0; i < Math.min(count, 1000); i++) {
            const record: any = {};
            const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
            const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

            if (fields.id) record.id = i + 1;
            if (fields.name) record.name = `${fn} ${ln}`;
            if (fields.email) record.email = `${fn.toLowerCase()}.${ln.toLowerCase()}@${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}`;
            if (fields.phone) record.phone = `+1 (${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 800) + 200}-${Math.floor(Math.random() * 9000) + 1000}`;
            if (fields.address) record.address = `${Math.floor(Math.random() * 9999) + 1} ${STREETS[Math.floor(Math.random() * STREETS.length)]}, ${CITIES[Math.floor(Math.random() * CITIES.length)]}`;

            if (fields.date_of_birth) {
                const start = new Date(1960, 0, 1).getTime();
                const end = new Date(2005, 0, 1).getTime();
                const date = new Date(start + Math.random() * (end - start));
                record.date_of_birth = date.toISOString().split('T')[0];
            }

            if (fields.company) {
                record.company = `${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]} ${['Inc', 'LLC', 'Group', 'Solutions', 'Co'][Math.floor(Math.random() * 5)]}`;
            }

            records.push(record);
        }
        return records;
    };

    const generateOutput = () => {
        const records = generateDataList();
        if (records.length === 0) {
            setDataStr('');
            return;
        }

        if (format === 'JSON') {
            setDataStr(JSON.stringify(records, null, 2));
        } else if (format === 'CSV') {
            const keys = Object.keys(records[0]);
            const csvRows = [keys.join(',')];
            for (const row of records) {
                const values = keys.map(k => {
                    const val = row[k];
                    // Escape quotes and wrap strings in quotes for CSV
                    if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
                    return val;
                });
                csvRows.push(values.join(','));
            }
            setDataStr(csvRows.join('\n'));
        } else if (format === 'SQL') {
            const keys = Object.keys(records[0]);
            let sql = `CREATE TABLE users (\n`;
            const defs = keys.map(k => `  ${k} ${k === 'id' ? 'INT' : 'VARCHAR(255)'}`);
            sql += defs.join(',\n') + '\n);\n\n';

            const inserts = records.map(row => {
                const vals = keys.map(k => {
                    const val = row[k];
                    if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
                    return val;
                });
                return `INSERT INTO users (${keys.join(', ')}) VALUES (${vals.join(', ')});`;
            });

            setDataStr(sql + inserts.join('\n'));
        }
        setCopied(false);
    };

    const handleCopy = async () => {
        if (!dataStr) return;
        try {
            await navigator.clipboard.writeText(dataStr);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const downloadFile = () => {
        if (!dataStr) return;
        const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const ext = format === 'JSON' ? 'json' : format === 'CSV' ? 'csv' : 'sql';
        link.download = `mock_data.${ext}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const toggleField = (field: keyof typeof fields) => {
        setFields(prev => {
            const next = { ...prev, [field]: !prev[field] };
            return next;
        });
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-8">

                <div className="flex-1 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <Database className="w-5 h-5 text-brand-primary" />
                            Fake Data Generator
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-6 rounded-xl border border-border">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Row Count (Max 1000)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="1000"
                                    value={count}
                                    onChange={(e) => setCount(Number(e.target.value) || 1)}
                                    className="bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Export Format</label>
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value as any)}
                                    className="bg-background border border-border rounded-lg p-3 text-sm font-bold outline-brand-primary cursor-pointer w-full"
                                >
                                    <option value="JSON">JSON Array</option>
                                    <option value="CSV">CSV Format</option>
                                    <option value="SQL">SQL Insert Statements</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-6 border border-border rounded-xl">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Included Fields</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {(Object.keys(fields) as Array<keyof typeof fields>).map((key) => (
                                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={fields[key]}
                                            onChange={() => toggleField(key)}
                                            className="w-4 h-4 text-brand-primary rounded border-border focus:ring-brand-primary accent-brand-primary cursor-pointer"
                                        />
                                        <span className="text-sm font-semibold group-hover:text-brand-primary transition-colors capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={generateOutput}
                            className="w-full py-4 text-base font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <RefreshCcw className="w-5 h-5" /> Generate Mock Data
                        </button>
                    </div>
                </div>

                <div className="w-full xl:w-[500px] shrink-0 flex flex-col gap-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-4 min-h-[500px] sticky top-6 animate-in fade-in slide-in-from-right-4">

                        <div className="flex justify-between items-center px-1">
                            <span className="text-sm font-bold uppercase tracking-widest text-brand-primary border-b border-brand-primary/20 pb-1">
                                Output ({format})
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    disabled={!dataStr}
                                    className="p-2 text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors disabled:opacity-50"
                                    title="Copy Data"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={downloadFile}
                                    disabled={!dataStr}
                                    className="p-2 text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors disabled:opacity-50"
                                    title="Download File"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={dataStr}
                            readOnly
                            placeholder="Click generate to load data..."
                            className="w-full h-full min-h-[400px] p-4 bg-muted/50 border border-border rounded-lg font-mono text-xs leading-relaxed resize-none focus:outline-none scrollbar-custom"
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
