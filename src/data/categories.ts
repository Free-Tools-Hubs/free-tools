import { CategoryDefinition } from '@/types/tool';

export const categories: CategoryDefinition[] = [
    {
        id: 'image',
        title: 'File & Image Tools',
        description: 'Convert, compress, resize images and manage PDF files.',
        icon: 'FileImage',
    },
    {
        id: 'pdf',
        title: 'PDF Tools',
        description: 'Merge, split, compress, and convert PDF files online.',
        icon: 'FileText',
    },
    {
        id: 'text',
        title: 'Text Tools',
        description: 'Word counters, case converters, and text generators.',
        icon: 'Type',
    },
    {
        id: 'developer',
        title: 'Developer Tools',
        description: 'JSON formatters, validators, encoders, and code minifiers.',
        icon: 'Code',
    },
    {
        id: 'calculators',
        title: 'Calculators',
        description: 'Age, percentage, EMI, and financial calculators.',
        icon: 'Calculator',
    },
    {
        id: 'generators',
        title: 'Generators',
        description: 'QR codes, passwords, UUIDs, and dummy data generators.',
        icon: 'Zap',
    },
    {
        id: 'ai',
        title: 'AI Helper Tools',
        description: 'AI prompt formatters and text generators.',
        icon: 'BotIcon',
    },
    {
        id: 'social',
        title: 'Social Media Tools',
        description: 'Title and tag generators for creators.',
        icon: 'Share2Icon',
    },
    {
        id: 'discovery',
        title: 'Smart Discovery Hubs',
        description: 'Global weather, currency exchange, and dictionary tools.',
        icon: 'Globe',
    },
    {
        id: 'business',
        title: 'Business & Legal Tools',
        description: 'Generate professional privacy policies and terms of service.',
        icon: 'Briefcase',
    },
];
