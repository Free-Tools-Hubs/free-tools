import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle, FileWarning } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
    onFilesAccepted: (files: File[]) => void;
    maxFiles?: number;
    accept?: Record<string, string[]>;
    maxSizeMB?: number;
}

export default function FileUploader({
    onFilesAccepted,
    maxFiles = 1,
    accept,
    maxSizeMB = 5,
}: FileUploaderProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onFilesAccepted(acceptedFiles);
        },
        [onFilesAccepted]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        onDrop,
        maxFiles,
        accept,
        maxSize: maxSizeMB * 1024 * 1024,
    });

    const rootProps = getRootProps();

    return (
        <div className="w-full">
            <motion.div
                {...(rootProps as Omit<typeof rootProps, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative overflow-hidden cursor-pointer w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 transition-colors ${isDragActive
                    ? 'border-brand-primary bg-brand-primary/5'
                    : isDragReject || fileRejections.length > 0
                        ? 'border-red-500 bg-red-500/5'
                        : 'border-border/50 hover:border-brand-primary/50 hover:bg-muted/50 dark:hover:bg-muted/10'
                    }`}
            >
                <input {...getInputProps()} />

                <div className="p-4 rounded-full bg-background border border-border shadow-sm">
                    {isDragReject || fileRejections.length > 0 ? (
                        <FileWarning className="w-8 h-8 text-red-500" />
                    ) : isDragActive ? (
                        <CheckCircle className="w-8 h-8 text-brand-primary animate-pulse" />
                    ) : (
                        <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    )}
                </div>

                <div className="text-center">
                    <p className="text-lg font-semibold lg:text-xl">
                        {isDragActive
                            ? 'Drop your files here...'
                            : isDragReject
                                ? 'Files not supported'
                                : 'Click or drag files to upload'}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                        Up to {maxFiles} file{maxFiles > 1 ? 's' : ''} allowed (Max{' '}
                        {maxSizeMB}MB each)
                    </p>
                </div>

                {fileRejections.length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/10 text-red-500 rounded-lg text-sm w-full max-w-md">
                        <p className="font-semibold mb-1">Errors:</p>
                        <ul className="list-disc list-inside">
                            {fileRejections.map(({ file, errors }) => (
                                <li key={file.name}>
                                    {file.name}: {errors[0].message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
