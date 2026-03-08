import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
    type: 'header' | 'sidebar' | 'content' | 'footer' | 'sticky-mobile';
    className?: string;
}

export function AdPlaceholder({ type, className }: AdPlaceholderProps) {
    const dimensions = {
        header: 'w-full h-[90px] max-w-[728px]',
        sidebar: 'w-full h-[600px] max-w-[300px]',
        content: 'w-full h-[250px] max-w-[336px]',
        footer: 'w-full h-[90px] max-w-[970px]',
        'sticky-mobile': 'w-full h-[50px] fixed bottom-0 left-0 md:hidden',
    };

    return (
        <div
            className={cn(
                'mx-auto bg-surface-100 dark:bg-surface-800 border-2 border-dashed border-surface-200 dark:border-surface-700 flex items-center justify-center relative overflow-hidden group',
                dimensions[type],
                className
            )}
        >
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="text-center z-10 px-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Advertisement</p>
                <p className="text-xs text-muted-foreground/50">Placeholder for {type} ad unit</p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-surface-300 dark:border-surface-600" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-surface-300 dark:border-surface-600" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-surface-300 dark:border-surface-600" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-surface-300 dark:border-surface-600" />
        </div>
    );
}
