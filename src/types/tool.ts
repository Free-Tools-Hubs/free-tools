export type ToolCategory =
    | 'image'
    | 'pdf'
    | 'text'
    | 'developer'
    | 'calculators'
    | 'generators'
    | 'ai'
    | 'social';

export interface FAQ {
    question: string;
    answer: string;
}

export interface ToolDefinition {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: ToolCategory;
    slug: string;
    icon: string; // Lucide icon name or emoji
    keywords: string[];
    faqs: FAQ[];
    usageExample: string;
    relatedToolIds: string[];
    lastUpdated: string;
}

export interface ToolComponentProps {
    tool: ToolDefinition;
}

export interface CategoryDefinition {
    id: ToolCategory;
    title: string;
    description: string;
    icon: string;
}
