"use client";

import { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface Course {
    id: string;
    name: string;
    credits: number;
    grade: string;
}

const GRADE_POINTS: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
};

export default function GpaCalculatorTool() {
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
        { id: '2', name: 'Course 2', credits: 3, grade: 'B+' },
        { id: '3', name: 'Course 3', credits: 4, grade: 'A-' }
    ]);

    const addCourse = () => {
        setCourses([...courses, { id: Math.random().toString(), name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }]);
    };

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: string, field: keyof Course, value: string | number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const calculateGpa = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(c => {
            const points = GRADE_POINTS[c.grade];
            if (points !== undefined && c.credits > 0) {
                totalPoints += points * c.credits;
                totalCredits += c.credits;
            }
        });

        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    };

    const gpa = calculateGpa();

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <Calculator className="w-5 h-5 text-brand-primary" />
                            GPA Calculator
                        </h2>
                        <button
                            onClick={addCourse}
                            className="px-4 py-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Course
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">
                            <span>Course Name</span>
                            <span>Credits</span>
                            <span>Grade</span>
                            <span className="w-8"></span>
                        </div>

                        {courses.map((course, idx) => (
                            <div key={course.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center bg-muted/30 p-4 md:p-2 rounded-lg border border-border md:border-transparent">
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    className="w-full text-sm font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary"
                                    placeholder={`Course ${idx + 1}`}
                                />
                                <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value) || 0)}
                                    className="w-full text-sm font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary text-center"
                                    placeholder="Credits"
                                />
                                <select
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                    className="w-full text-sm font-bold bg-background border border-border rounded-lg p-3 outline-brand-primary text-center cursor-pointer appearance-none"
                                >
                                    {Object.keys(GRADE_POINTS).map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        disabled={courses.length <= 1}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full xl:w-80 shrink-0">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center justify-center gap-4 sticky top-6 text-center animate-in fade-in slide-in-from-right-4">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Cumulative GPA</span>
                        <div className="relative text-7xl font-black text-brand-primary py-4">
                            {gpa}
                        </div>
                        <div className="w-full mt-4 flex justify-between px-4 py-3 bg-muted rounded-lg border border-border text-sm font-semibold">
                            <span className="text-muted-foreground">Total Credits</span>
                            <span className="text-foreground">{courses.reduce((sum, c) => sum + c.credits, 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
