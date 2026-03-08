import { z } from 'zod';

// Reusable file schema generator for image transformations
export const createImageFileSchema = (maxSizeMB: number, allowedTypes: string[]) => {
    return z.object({
        file: z.custom<File>((v) => v instanceof File, {
            message: 'A file is required',
        })
            .refine((file) => file.size <= maxSizeMB * 1024 * 1024, `Max file size is ${maxSizeMB}MB.`)
            .refine((file) => allowedTypes.includes(file.type), `Only ${allowedTypes.join(', ')} formats are supported.`),
    });
};
