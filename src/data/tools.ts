import { ToolDefinition } from '@/types/tool';

export const tools: ToolDefinition[] = [
    // Image Tools
    // File & Image Tools
    {
        id: 'png-to-jpg',
        title: 'PNG to JPG Converter',
        description: 'Convert PNG images to JPG format online for free.',
        longDescription: 'Our PNG to JPG converter allows you to quickly transform your PNG files into high-quality JPEG images. This tool is perfect for reducing file sizes while maintaining visual clarity. It supports batch conversion and ensures your privacy by processing everything in your browser—no registration required.',
        category: 'image',
        slug: 'png-to-jpg',
        icon: 'Image',
        keywords: ['png to jpg', 'convert png to jpeg', 'image converter', 'png to jpg converter online', 'free png to jpg'],
        faqs: [
            {
                question: 'Is it free to use?',
                answer: 'Yes, our PNG to JPG converter is 100% free with no hidden costs or limits.'
            },
            {
                question: 'Does it reduce image quality?',
                answer: 'You can choose the quality level, but our default setting maintains a high balance between quality and file size.'
            },
            {
                question: 'Are my files safe?',
                answer: 'Yes, your files never leave your device. All processing happens locally in your browser for maximum security.'
            }
        ],
        usageExample: 'Upload your PNG file, select quality, and click Convert.',
        relatedToolIds: ['jpg-to-png', 'webp-to-jpg', 'compress-image'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'jpg-to-png',
        title: 'JPG to PNG Converter',
        description: 'Convert JPG images to PNG format online for free.',
        longDescription: 'Easily transform your JPEG images into high-quality PNG files. PNG is the preferred format for images that require transparency or lossless compression. No sign-up needed, works entirely in your browser.',
        category: 'image',
        slug: 'jpg-to-png',
        icon: 'Image',
        keywords: ['jpg to png', 'convert jpeg to png', 'image converter', 'jpg to png converter online', 'free jpg to png'],
        faqs: [
            {
                question: 'Why convert JPG to PNG?',
                answer: 'PNG supports transparency and uses lossless compression, making it better for logos, icons, and text-heavy images.'
            },
            {
                question: 'Is there a file size limit?',
                answer: 'Our tool handles most common image sizes efficiently right in your browser.'
            }
        ],
        usageExample: 'Select your JPG files and click the convert button to get your PNGs.',
        relatedToolIds: ['png-to-jpg', 'webp-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'image-to-pdf',
        title: 'Image to PDF Converter',
        description: 'Convert multiple images into a single PDF document.',
        longDescription: 'Combine multiple image files (JPG, PNG, WebP) into one professional PDF document. Ideal for creating portfolios, digital documents from scans, or sending multiple photos in one file. Free, fast, and secure.',
        category: 'image',
        slug: 'image-to-pdf',
        icon: 'FileText',
        keywords: ['image to pdf', 'convert photo to pdf', 'combine images to pdf', 'jpg to pdf online', 'png to pdf free'],
        faqs: [
            {
                question: 'Can I reorder the images?',
                answer: 'Yes, you can drag and drop your uploaded images to arrange them in the exact order you want them to appear in the PDF.'
            },
            {
                question: 'How many images can I combine?',
                answer: 'You can combine up to 50 images into a single PDF document for optimal performance.'
            }
        ],
        usageExample: 'Upload your images, arrange them, and click "Generate PDF".',
        relatedToolIds: ['pdf-to-jpg', 'screenshot-to-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'pdf-to-jpg',
        title: 'PDF to JPG Converter',
        description: 'Extract pages from a PDF and save them as JPG images.',
        longDescription: 'Our PDF to JPG converter extracts each page of your PDF document and transforms them into separate high-quality JPG images. Perfect for sharing specific pages of a document as images without any software installation.',
        category: 'image',
        slug: 'pdf-to-jpg',
        icon: 'FileOutput',
        keywords: ['pdf to jpg', 'extract pdf pages', 'pdf to image online', 'convert pdf to jpeg free'],
        faqs: [
            {
                question: 'Does it preserve the resolution?',
                answer: 'Yes, we extract images at the highest resolution possible based on the source PDF.'
            },
            {
                question: 'Can I choose which pages to convert?',
                answer: 'You can convert all pages or specify a range of pages to extract.'
            }
        ],
        usageExample: 'Select your PDF file and download the extracted images as a ZIP archive.',
        relatedToolIds: ['image-to-pdf', 'compress-image'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'compress-image',
        title: 'Compress Image',
        description: 'Reduce image file size without losing quality.',
        longDescription: 'Optimize your images for the web by reducing file sizes without noticeable loss in quality. This helps your website load faster, improves SEO, and saves storage space. Completely free and runs in-browser.',
        category: 'image',
        slug: 'compress-image',
        icon: 'Minimize2',
        keywords: ['image compressor', 'optimize image', 'reduce image size', 'online image compression', 'free image optimizer'],
        faqs: [
            {
                question: 'Will my image look blurry?',
                answer: 'Our advanced algorithm targets unnecessary metadata and uses smart compression to keep your images sharp.'
            },
            {
                question: 'What formats are supported?',
                answer: 'Yes, you can compress JPG, PNG, and WebP images.'
            }
        ],
        usageExample: 'Upload your images, choose the compression level, and download the results.',
        relatedToolIds: ['resize-image', 'png-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'resize-image',
        title: 'Resize Image',
        description: 'Change image dimensions (width and height) online.',
        longDescription: 'Resize your images to specific pixel dimensions or scale them by percentage. Perfect for meeting social media requirements, email attachments, or web design specifications. No upload to server required.',
        category: 'image',
        slug: 'resize-image',
        icon: 'Maximize',
        keywords: ['resize image online', 'change image dimensions', 'image resizer free', 'bulk image resize'],
        faqs: [
            {
                question: 'How do I maintain aspect ratio?',
                answer: 'Simply keep the "Lock Aspect Ratio" option checked, and the height/width will adjust automatically to prevent stretching.'
            }
        ],
        usageExample: 'Enter the new width or height and click Resize.',
        relatedToolIds: ['crop-image', 'compress-image'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'crop-image',
        title: 'Crop Image',
        description: 'Crop your images to focus on what matters.',
        longDescription: 'Easily crop your images to specific aspect ratios or custom dimensions. Use our intuitive interface to select the perfect frame for your photos, profile pictures, and banners.',
        category: 'image',
        slug: 'crop-image',
        icon: 'Crop',
        keywords: ['crop image online', 'image cropper free', 'photo editor', 'trim image'],
        faqs: [
            {
                question: 'Are there standard social media presets?',
                answer: 'Yes, we include presets for Instagram squares, Facebook covers, Twitter headers, and YouTube thumbnails.'
            }
        ],
        usageExample: 'Select the area you want to keep and download the cropped image.',
        relatedToolIds: ['resize-image', 'image-watermark'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'webp-to-jpg',
        title: 'Convert WebP to JPG',
        description: 'Convert WebP images to JPG format for better compatibility.',
        longDescription: 'Transform modern WebP images into universally compatible JPG files. This ensures your images can be viewed on any device, used in legacy software, or printed easily.',
        category: 'image',
        slug: 'webp-to-jpg',
        icon: 'RefreshCw',
        keywords: ['webp to jpg', 'convert webp to jpeg', 'webp converter online', 'free webp to jpg'],
        faqs: [
            {
                question: 'Why convert from WebP?',
                answer: 'WebP is excellent for web speed, but JPG remains the most widely supported format for offline viewing and editing.'
            }
        ],
        usageExample: 'Drag your WebP file into the box and get a JPG instantly.',
        relatedToolIds: ['heic-to-jpg', 'png-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'heic-to-jpg',
        title: 'Convert HEIC to JPG',
        description: 'Convert iPhone HEIC photos to JPG format easily.',
        longDescription: 'Convert high-efficiency HEIC photos from your iPhone or iPad to the standard JPEG format. Fast, free, and works entirely in your browser—no file size limits.',
        category: 'image',
        slug: 'heic-to-jpg',
        icon: 'Smartphone',
        keywords: ['heic to jpg', 'convert heic to jpeg', 'iphone photo converter', 'apple photo to jpg online'],
        faqs: [
            {
                question: 'Does this handle batch conversion?',
                answer: 'Yes, you can upload and convert multiple HEIC files at once and download them as a ZIP.'
            }
        ],
        usageExample: 'Upload your .HEIC files and download them as .JPG files.',
        relatedToolIds: ['webp-to-jpg', 'png-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'background-remover',
        title: 'Background Remover',
        description: 'Remove background from images automatically using AI.',
        longDescription: 'Remove backgrounds from your images instantly with professional results. Our AI technology handles complex edges like hair, fur, and shadows without manual masking.',
        category: 'image',
        slug: 'background-remover',
        icon: 'Eraser',
        keywords: ['remove background from image', 'transparent background maker', 'ai background removal free', 'bg remover online'],
        faqs: [
            {
                question: 'Is this tool automatic?',
                answer: 'Yes! Simply upload your photo and our AI will isolate the subject and create a transparent PNG automatically.'
            }
        ],
        usageExample: 'Upload a product photo or portrait and watch the background disappear.',
        relatedToolIds: ['crop-image', 'image-watermark'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'image-watermark',
        title: 'Image Watermark Tool',
        description: 'Add text or logo watermarks to your images.',
        longDescription: 'Protect your creative work by adding a custom watermark. Add branding logos, copyright text, or contact info to your images before sharing them on social media.',
        category: 'image',
        slug: 'image-watermark',
        icon: 'Stamp',
        keywords: ['watermark image online', 'add logo to photo free', 'protect photos', 'copyright watermarker'],
        faqs: [
            {
                question: 'Can I customize the watermark?',
                answer: 'Yes, you can adjust the opacity, size, rotation, and position. We also support repeating tiled watermarks.'
            }
        ],
        usageExample: 'Add your logo, place it in the corner, and download your watermarked image.',
        relatedToolIds: ['resize-image', 'background-remover'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'screenshot-to-pdf',
        title: 'Screenshot to PDF',
        description: 'Turn your screenshots into clean PDF documents.',
        longDescription: 'Convert website captures, app screenshots, or desktop captures into high-quality PDF files. Perfect for archiving, documentation, reports, or legal evidence.',
        category: 'image',
        slug: 'screenshot-to-pdf',
        icon: 'Monitor',
        keywords: ['screenshot to pdf', 'convert screen capture to pdf', 'images to pdf online', 'free screenshot converter'],
        faqs: [
            {
                question: 'Will the text remain sharp?',
                answer: 'Yes, our conversion process ensures that text in your screenshots remains clear and readable for printing or viewing.'
            }
        ],
        usageExample: 'Upload your screenshots and get a PDF document ready for sharing.',
        relatedToolIds: ['image-to-pdf', 'pdf-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    // PDF Tools
    {
        id: 'merge-pdf',
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one document.',
        longDescription: 'Merge PDF documents into a single file easily. Arrange your documents in the sequence you prefer. It is fast, free, and secure as all processing happens locally in your browser.',
        category: 'pdf',
        slug: 'merge-pdf',
        icon: 'Combine',
        keywords: ['merge pdf', 'combine pdf online', 'pdf joiner free', 'concatenate pdf'],
        faqs: [
            {
                question: 'Is there a limit on the number of files I can merge?',
                answer: 'You can merge up to 50 PDF files at once for optimal performance.'
            },
            {
                question: 'Can I reorder files after uploading?',
                answer: 'Yes, our interface allows you to drag and drop files to set the perfect order.'
            }
        ],
        usageExample: 'Upload your PDF files, arrange them, and click "Merge PDF".',
        relatedToolIds: ['split-pdf', 'compress-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'split-pdf',
        title: 'Split PDF',
        description: 'Extract pages from your PDF or save each page as a separate PDF.',
        longDescription: 'Split a PDF document into multiple files by page ranges or extract all pages into individual PDF documents. Perfect for isolating specific sections of large reports.',
        category: 'pdf',
        slug: 'split-pdf',
        icon: 'Scissors',
        keywords: ['split pdf', 'extract pdf pages', 'separate pdf files', 'divide pdf online'],
        faqs: [
            {
                question: 'Can I extract non-consecutive pages?',
                answer: 'Yes, you can specify individual page numbers or ranges (e.g., 1, 3, 5-10).'
            }
        ],
        usageExample: 'Select your PDF, choose the pages to extract, and download the results.',
        relatedToolIds: ['merge-pdf', 'pdf-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'compress-pdf',
        title: 'Compress PDF',
        description: 'Reduce the file size of your PDF without losing quality.',
        longDescription: 'Optimize your PDF documents for email attachments and web sharing. Our compression tool reduces file size while maintaining text and image clarity.',
        category: 'pdf',
        slug: 'compress-pdf',
        icon: 'Minimize2',
        keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf online', 'optimize pdf for email'],
        faqs: [
            {
                question: 'Will the quality of my PDF decrease?',
                answer: 'We use smart compression that balances file size reduction with visual quality.'
            }
        ],
        usageExample: 'Upload your PDF and choose your preferred compression level.',
        relatedToolIds: ['merge-pdf', 'unlock-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'rotate-pdf',
        title: 'Rotate PDF',
        description: 'Rotate PDF pages permanently online for free.',
        longDescription: 'Easily fix the orientation of your PDF pages. Rotate specific pages or the entire document to the left, right, or 180 degrees.',
        category: 'pdf',
        slug: 'rotate-pdf',
        icon: 'RotateCw',
        keywords: ['rotate pdf', 'fix pdf orientation', 'flip pdf pages', 'rotate pdf online free'],
        faqs: [
            {
                question: 'Can I rotate just one page?',
                answer: 'Yes, you can select individual pages to rotate or apply rotation to all pages at once.'
            }
        ],
        usageExample: 'Select the pages you want to rotate and use the rotation buttons.',
        relatedToolIds: ['merge-pdf', 'split-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'pdf-to-word',
        title: 'PDF to Word Converter',
        description: 'Convert PDF files to editable Word documents (DOCX).',
        longDescription: 'Transform your PDF documents into Microsoft Word files so you can edit the content easily. We preserve the original layout and formatting as much as possible.',
        category: 'pdf',
        slug: 'pdf-to-word',
        icon: 'FileText',
        keywords: ['pdf to word', 'convert pdf to docx', 'editable pdf to word', 'online pdf converter'],
        faqs: [
            {
                question: 'Is the converted Word file editable?',
                answer: 'Yes, the output is a standard .docx file that you can edit in Word, Google Docs, or LibreOffice.'
            }
        ],
        usageExample: 'Upload your PDF and wait for the conversion to finish.',
        relatedToolIds: ['word-to-pdf', 'pdf-to-jpg'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'word-to-pdf',
        title: 'Word to PDF Converter',
        description: 'Convert Microsoft Word documents to PDF format.',
        longDescription: 'Create professional PDF documents from your Word files (.doc, .docx). Ensure your formatting stays exactly as intended across all devices.',
        category: 'pdf',
        slug: 'word-to-pdf',
        icon: 'FileCode',
        keywords: ['word to pdf', 'convert docx to pdf', 'doc to pdf online', 'microsoft word to pdf'],
        faqs: [
            {
                question: 'Will my fonts be preserved?',
                answer: 'Yes, we embed fonts to ensure your PDF looks exactly like your Word document.'
            }
        ],
        usageExample: 'Select your Word file and download your new PDF.',
        relatedToolIds: ['pdf-to-word', 'excel-to-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'excel-to-pdf',
        title: 'Excel to PDF Converter',
        description: 'Convert Excel spreadsheets to PDF documents.',
        longDescription: 'Transform your Excel workbooks (.xls, .xlsx) into portable PDF files. Perfect for sharing reports, invoices, and data summaries securely.',
        category: 'pdf',
        slug: 'excel-to-pdf',
        icon: 'Table',
        keywords: ['excel to pdf', 'convert xlsx to pdf', 'spreadsheet to pdf', 'convert excel online'],
        faqs: [
            {
                question: 'Can I convert specific sheets?',
                answer: 'You can choose to convert the entire workbook or just the active spreadsheet.'
            }
        ],
        usageExample: 'Upload your Excel file and download the PDF version.',
        relatedToolIds: ['word-to-pdf', 'powerpoint-to-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'powerpoint-to-pdf',
        title: 'PowerPoint to PDF Converter',
        description: 'Convert PowerPoint presentations to PDF format.',
        longDescription: 'Turn your PPT and PPTX slides into high-quality PDF documents. Ideal for sharing presentations without worrying about compatibility or layout shifts.',
        category: 'pdf',
        slug: 'powerpoint-to-pdf',
        icon: 'Presentation',
        keywords: ['powerpoint to pdf', 'convert ppt to pdf', 'ppt to pdf online free', 'slides to pdf'],
        faqs: [
            {
                question: 'Does it include speaker notes?',
                answer: 'You can choose to include or exclude speaker notes in your final PDF.'
            }
        ],
        usageExample: 'Upload your presentation slides and get a PDF in seconds.',
        relatedToolIds: ['word-to-pdf', 'excel-to-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'add-watermark-to-pdf',
        title: 'Add Watermark to PDF',
        description: 'Add text or image watermarks to your PDF documents.',
        longDescription: 'Protect your professional documents by adding a custom watermark. Add "Draft," "Confidential," or your company logo to every page of your PDF.',
        category: 'pdf',
        slug: 'add-watermark-to-pdf',
        icon: 'Stamp',
        keywords: ['add watermark to pdf', 'pdf watermarker online', 'copyright pdf', 'protect documents'],
        faqs: [
            {
                question: 'Can I customize the watermark position?',
                answer: 'Yes, you can place your watermark in any corner, center, or tile it across the page.'
            }
        ],
        usageExample: 'Upload your PDF, design your watermark, and download the protected file.',
        relatedToolIds: ['protect-pdf', 'unlock-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'unlock-pdf',
        title: 'Unlock PDF',
        description: 'Remove passwords and restrictions from PDF files.',
        longDescription: 'If you have a password-protected PDF and want to remove the security, our tool can help you unlock it so you can edit and share it freely.',
        category: 'pdf',
        slug: 'unlock-pdf',
        icon: 'LockOpen',
        keywords: ['unlock pdf', 'remove pdf password', 'pdf password remover online', 'decrypt pdf'],
        faqs: [
            {
                question: 'Do I need to know the password?',
                answer: 'For legal reasons, you must know the password to remove it from the document.'
            }
        ],
        usageExample: 'Upload your protected PDF, enter the password, and download the unlocked version.',
        relatedToolIds: ['protect-pdf', 'compress-pdf'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'protect-pdf',
        title: 'Protect PDF',
        description: 'Encrypt your PDF with a strong password.',
        longDescription: 'Add an extra layer of security to your sensitive documents. Our tool allows you to set owner and user passwords to control viewing and editing.',
        category: 'pdf',
        slug: 'protect-pdf',
        icon: 'Lock',
        keywords: ['protect pdf', 'password protect pdf online', 'encrypt pdf document', 'secure pdf'],
        faqs: [
            {
                question: 'What kind of encryption is used?',
                answer: 'We use industry-standard AES-256 bit encryption to ensure maximum security for your files.'
            }
        ],
        usageExample: 'Upload your PDF, set a password, and download the encrypted file.',
        relatedToolIds: ['unlock-pdf', 'add-watermark-to-pdf'],
        lastUpdated: '2026-03-08'
    },
    // Text Tools
    {
        id: 'word-counter',
        title: 'Word Counter',
        description: 'Count words, characters, and sentences in your text.',
        longDescription: 'A comprehensive text analysis tool that provides real-time statistics including word count, character count (with and without spaces), sentence count, and estimated reading time. Perfect for writers and SEO specialists.',
        category: 'text',
        slug: 'word-counter',
        icon: 'Hash',
        keywords: ['word counter', 'character counter', 'text analyzer', 'count words online', 'reading time calculator'],
        faqs: [
            {
                question: 'Does it count spaces as characters?',
                answer: 'Yes, it provides both "Character Count (with spaces)" and "Character Count (without spaces)" for precise statistics.'
            }
        ],
        usageExample: 'Paste your content into the editor and view the statistics update instantly.',
        relatedToolIds: ['case-converter', 'remove-duplicate-lines'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'character-counter',
        title: 'Character Counter',
        description: 'Check character limits for social media and metadata.',
        longDescription: 'Ensure your text fits within strict character limits for Twitter, LinkedIn, Meta descriptions, and Google titles. Get instant visual feedback as you type.',
        category: 'text',
        slug: 'character-counter',
        icon: 'TextCursor',
        keywords: ['character counter', 'social media post limit', 'metadata length checker', 'char count online'],
        faqs: [
            {
                question: 'What are the major social media limits?',
                answer: 'Twitter is 280 characters, LinkedIn posts are 3,000, and Google Meta descriptions should be under 160 characters.'
            }
        ],
        usageExample: 'Type or paste your text and select a target platform to see if you are within the limit.',
        relatedToolIds: ['word-counter', 'case-converter'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'case-converter',
        title: 'Case Converter',
        description: 'Change text case between upper, lower, title, and sentence case.',
        longDescription: 'Accidentally left Caps Lock on? Use our case converter to transform text into UPPERCASE, lowercase, sentence case, or Title Case instantly.',
        category: 'text',
        slug: 'case-converter',
        icon: 'Type',
        keywords: ['case converter', 'uppercase to lowercase', 'title case generator', 'sentence case tool'],
        faqs: [
            {
                question: 'Does it handle punctuation correctly?',
                answer: 'Yes, our sentence case tool intelligently identifies sentence endings to capitalize the next word correctly.'
            }
        ],
        usageExample: 'Paste your text, choose the desired case format, and copy the result.',
        relatedToolIds: ['word-counter', 'sort-text-lines'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'remove-duplicate-lines',
        title: 'Remove Duplicate Lines',
        description: 'Clean up your lists and text by removing recurring lines.',
        longDescription: 'Quickly remove redundant entries from your lists, logs, or datasets. This tool identifies identical lines and keeps only the first occurrence, keeping your data clean.',
        category: 'text',
        slug: 'remove-duplicate-lines',
        icon: 'ListFilter',
        keywords: ['remove duplicates', 'unique lines only', 'clean list online', 'deduplication tool'],
        faqs: [
            {
                question: 'Can it handle case-sensitive duplicates?',
                answer: 'Yes, you can toggle between case-sensitive and case-insensitive matching.'
            }
        ],
        usageExample: 'Paste your list and click "Remove Duplicates" to get a unique set of lines.',
        relatedToolIds: ['sort-text-lines', 'word-counter'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'sort-text-lines',
        title: 'Sort Text Lines',
        description: 'Arrange your list items alphabetically or numerically.',
        longDescription: 'Organize your data effortlessly. Sort text lines in ascending (A-Z) or descending (Z-A) order. Support for numeric sorting and reversing the entire list.',
        category: 'text',
        slug: 'sort-text-lines',
        icon: 'SortAsc',
        keywords: ['sort list online', 'alphabetical sorter', 'numerical sort', 'reverse list'],
        faqs: [
            {
                question: 'Does it support natural sorting?',
                answer: 'Yes, it correctly identifies numbers within strings to sort them logically (e.g., 2 comes before 10).'
            }
        ],
        usageExample: 'Input your list, choose your sorting method, and instantly see the ordered result.',
        relatedToolIds: ['remove-duplicate-lines', 'case-converter'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'text-diff-checker',
        title: 'Text Diff Checker',
        description: 'Compare two pieces of text and find differences.',
        longDescription: 'A side-by-side comparison tool that highlights additions, deletions, and changes between two versions of text. Ideal for code reviews and document tracking.',
        category: 'text',
        slug: 'text-diff-checker',
        icon: 'FileDiff',
        keywords: ['text diff', 'compare text', 'find differences online', 'side by side compare'],
        faqs: [
            {
                question: 'Can it compare line by line?',
                answer: 'Yes, it provides both line-level and character-level diffing for precise comparison.'
            }
        ],
        usageExample: 'Paste the original text in the left box and the modified text in the right box.',
        relatedToolIds: ['word-counter', 'remove-duplicate-lines'],
        lastUpdated: '2026-03-08'
    },

    // Developer Tools
    {
        id: 'json-formatter',
        title: 'JSON Formatter',
        description: 'Beautify and format your JSON data for better readability.',
        longDescription: 'Validate and format your minified JSON data into a human-readable format. Our tool handles deep nesting, arrays, and large objects with ease. 100% browser-side processing ensures your data stays private.',
        category: 'developer',
        slug: 'json-formatter',
        icon: 'Braces',
        keywords: ['json formatter', 'beautify json', 'json pretty print', 'online json formatter', 'format json'],
        faqs: [
            {
                question: 'Can it handle large JSON files?',
                answer: 'Yes, our formatter is optimized for performance and can handle significant amounts of data directly in your browser.'
            },
            {
                question: 'Is my data secure?',
                answer: 'Absolutely. All processing happens locally in your browser. Your JSON data is never sent to any server.'
            }
        ],
        usageExample: 'Paste your raw JSON text and click "Format" to get a clean, indented version.',
        relatedToolIds: ['json-validator', 'base64-encode-decode'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'json-validator',
        title: 'JSON Validator',
        description: 'Verify and validate your JSON data against standards.',
        longDescription: 'Ensure your JSON data is syntactically correct. Our validator provides detailed error messages and line numbers if your JSON is invalid, making debugging a breeze.',
        category: 'developer',
        slug: 'json-validator',
        icon: 'ShieldCheck',
        keywords: ['json validator', 'validate json online', 'check json syntax', 'free json checker'],
        faqs: [
            {
                question: 'What happens if my JSON is invalid?',
                answer: 'The tool will highlight exactly where the error is and provide a descriptive error message to help you fix it.'
            }
        ],
        usageExample: 'Paste your JSON and click "Validate". If there are errors, they will be highlighted immediately.',
        relatedToolIds: ['json-formatter', 'jwt-decoder'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'base64-encode-decode',
        title: 'Base64 Encoder / Decoder',
        description: 'Encode or decode text and files to and from Base64 format.',
        longDescription: 'Convert plain text or binary data to Base64 format and vice versa. Essential for handling data in environments that only support text-based transport, like data URIs or email attachments.',
        category: 'developer',
        slug: 'base64-encode-decode',
        icon: 'Binary',
        keywords: ['base64 encode', 'base64 decode', 'base64 converter online', 'text to base64'],
        faqs: [
            {
                question: 'What is Base64 encoding used for?',
                answer: 'It is commonly used to embed image data in HTML/CSS or to transmit binary data over systems that only handle ASCII text.'
            }
        ],
        usageExample: 'Select "Encode" or "Decode", enter your content, and get the result instantly.',
        relatedToolIds: ['url-encoder-decoder', 'json-formatter'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'url-encoder-decoder',
        title: 'URL Encoder / Decoder',
        description: 'Safely encode or decode URLs for web use.',
        longDescription: 'Ensure your URLs are cross-browser compatible by encoding special characters. This tool is perfect for preparing query parameters or decoding complex tracking URLs.',
        category: 'developer',
        slug: 'url-encoder-decoder',
        icon: 'Link',
        keywords: ['url encode', 'url decode', 'percent encoding', 'online url converter', 'url escape'],
        faqs: [
            {
                question: 'Why do I need to encode URLs?',
                answer: 'URLs can only contain a limited set of ASCII characters. Encoding converts special characters like spaces, "&", and "?" into a format that is safe for browsers.'
            }
        ],
        usageExample: 'Paste your URL or text string and click Encode or Decode to transform it.',
        relatedToolIds: ['base64-encode-decode', 'regex-tester'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'regex-tester',
        title: 'Regex Tester',
        description: 'Test and debug your regular expressions in real-time.',
        longDescription: 'Write, test, and debug your Regex patterns against sample text. Includes support for multiple flavors and provides helpful explanations of your patterns.',
        category: 'developer',
        slug: 'regex-tester',
        icon: 'SearchCode',
        keywords: ['regex tester', 'regular expression debugger', 'regex online', 'test regex pattern'],
        faqs: [
            {
                question: 'Does it support different Regex flags?',
                answer: 'Yes, you can toggle flags like global (g), case-insensitive (i), and multiline (m).'
            }
        ],
        usageExample: 'Enter your pattern and the test string to see matches highlighted in real-time.',
        relatedToolIds: ['js-minifier', 'url-encoder-decoder'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'timestamp-converter',
        title: 'Timestamp Converter',
        description: 'Convert Unix timestamps to human-readable dates.',
        longDescription: 'Easily convert between Unix timestamps (seconds or milliseconds) and human-readable dates across different timezones. A must-have tool for developers working with databases and APIs.',
        category: 'developer',
        slug: 'timestamp-converter',
        icon: 'Clock',
        keywords: ['timestamp converter', 'unix time converter', 'epoch to date', 'online timestamp tool'],
        faqs: [
            {
                question: 'What is a Unix timestamp?',
                answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (the Unix Epoch).'
            }
        ],
        usageExample: 'Enter a timestamp or a date string to see the conversion in various formats.',
        relatedToolIds: ['json-formatter', 'url-encoder-decoder'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'html-minifier',
        title: 'HTML Minifier',
        description: 'Compress your HTML code for faster website loading.',
        longDescription: 'Optimize your website performance by removing unnecessary whitespace, comments, and line breaks from your HTML. This reduces file size and improves page load speed.',
        category: 'developer',
        slug: 'html-minifier',
        icon: 'Code',
        keywords: ['html minifier', 'compress html', 'minify html online', 'html optimizer'],
        faqs: [
            {
                question: 'Will minifying break my code?',
                answer: 'Our minifier is safe and only removes non-functional whitespace and comments. Always test your site after optimization.'
            }
        ],
        usageExample: 'Paste your HTML and click Minify to get the compressed version.',
        relatedToolIds: ['css-minifier', 'js-minifier'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'css-minifier',
        title: 'CSS Minifier',
        description: 'Optimize and compress your CSS stylesheets.',
        longDescription: 'Reduce the size of your CSS files by removing comments, extra spaces, and newlines. Smaller CSS files lead to faster rendering and better user experience.',
        category: 'developer',
        slug: 'css-minifier',
        icon: 'FileCode',
        keywords: ['css minifier', 'compress css online', 'minify css', 'css optimizer'],
        faqs: [
            {
                question: 'Does it support CSS3?',
                answer: 'Yes, it supports all modern CSS features including variables and grid layouts.'
            }
        ],
        usageExample: 'Input your CSS code and copy the minified output to your production project.',
        relatedToolIds: ['html-minifier', 'js-minifier'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'js-minifier',
        title: 'JS Minifier',
        description: 'Minify and compress your JavaScript code.',
        longDescription: 'Make your JavaScript files smaller and faster. Our minifier removes unnecessary characters and shortens variable names (optional) to significantly reduce bundle size.',
        category: 'developer',
        slug: 'js-minifier',
        icon: 'Terminal',
        keywords: ['js minifier', 'minify javascript online', 'compress js', 'uglify javascript'],
        faqs: [
            {
                question: 'Can I choose the minification level?',
                answer: 'Yes, you can choose between basic whitespace removal or advanced obfuscation.'
            }
        ],
        usageExample: 'Paste your script and get a production-ready minified JS file.',
        relatedToolIds: ['html-minifier', 'css-minifier'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        description: 'Decode and inspect JSON Web Tokens (JWT) instantly.',
        longDescription: 'Easily view the header, payload, and signature of any JSON Web Token. This tool is essential for debugging authentication issues and verifying token claims.',
        category: 'developer',
        slug: 'jwt-decoder',
        icon: 'Key',
        keywords: ['jwt decoder', 'inspect jwt', 'json web token viewer', 'decode jwt tokens online'],
        faqs: [
            {
                question: 'Is my token safe?',
                answer: 'Yes, tokens are decoded entirely in your browser. Sensitive information is never sent to our servers.'
            },
            {
                question: 'Can it verify the signature?',
                answer: 'This tool is for viewing content. To verify a signature, you should use your application backend with a secret key.'
            }
        ],
        usageExample: 'Paste your JWT string to see the header and payload data formatted clearly.',
        relatedToolIds: ['json-formatter', 'json-validator'],
        lastUpdated: '2026-03-08'
    },
    // Calculators
    {
        id: 'age-calculator',
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days.',
        longDescription: 'Find out exactly how old you are down to the day. This tool calculates your age based on your date of birth and provides details on your next birthday, total weeks, and total days lived.',
        category: 'calculators',
        slug: 'age-calculator',
        icon: 'CalendarDays',
        keywords: ['age calculator', 'calculate age', 'how old am i', 'date of birth calculator', 'chronological age'],
        faqs: [
            {
                question: 'Can it calculate age for a future date?',
                answer: 'Yes, you can select any "current" date to see how old you will be at that time.'
            },
            {
                question: 'Does it account for leap years?',
                answer: 'Yes, our algorithm precisely accounts for leap years and different month lengths.'
            }
        ],
        usageExample: 'Enter your date of birth and click "Calculate Age" to see the result.',
        relatedToolIds: ['date-difference-calculator', 'time-duration-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Solve common percentage problems easily.',
        longDescription: 'A versatile tool for calculating percentage of a value, percentage change (increase/decrease), and what percentage one number is of another. Perfect for finance, shopping, and data analysis.',
        category: 'calculators',
        slug: 'percentage-calculator',
        icon: 'Percent',
        keywords: ['percentage calculator', 'calculate percent', 'percent change', 'discount calculator', 'math calculator'],
        faqs: [
            {
                question: 'What types of percentage problems can it solve?',
                answer: 'It can find a percentage of a number, calculate percentage increase/decrease, and determine the percentage ratio between two numbers.'
            }
        ],
        usageExample: 'Select the type of calculation, enter your numbers, and get the percentage result.',
        relatedToolIds: ['discount-calculator', 'loan-emi-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'loan-emi-calculator',
        title: 'Loan EMI Calculator',
        description: 'Calculate monthly installments for any type of loan.',
        longDescription: 'Plan your finances with our Equated Monthly Installment (EMI) calculator. Ideal for home loans, car loans, and personal loans. Get a detailed breakdown of total interest and total payment.',
        category: 'calculators',
        slug: 'loan-emi-calculator',
        icon: 'CreditCard',
        keywords: ['emi calculator', 'loan calculator', 'monthly installment', 'home loan emi', 'car loan calculator'],
        faqs: [
            {
                question: 'What information do I need?',
                answer: 'You need the loan amount, the annual interest rate, and the loan tenure (term length).'
            }
        ],
        usageExample: 'Enter the principal amount, interest rate, and months/years to see your monthly payment.',
        relatedToolIds: ['percentage-calculator', 'discount-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'gpa-calculator',
        title: 'GPA Calculator',
        description: 'Calculate your college or high school GPA easily.',
        longDescription: 'Keep track of your academic performance. Enter your course grades and credits to calculate your semester or cumulative Grade Point Average (GPA) in real-time.',
        category: 'calculators',
        slug: 'gpa-calculator',
        icon: 'GraduationCap',
        keywords: ['gpa calculator', 'calculate gpa', 'grade point average', 'college gpa tool', 'semester gpa'],
        faqs: [
            {
                question: 'Does it support weighted GPA?',
                answer: 'Yes, you can assign credit weights to each course for an accurate weighted average.'
            }
        ],
        usageExample: 'Add your courses, select the grade, enter credits, and view your GPA instantly.',
        relatedToolIds: ['age-calculator', 'percentage-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'bmi-calculator',
        title: 'BMI Calculator',
        description: 'Check your Body Mass Index (BMI) and health status.',
        longDescription: 'A simple tool to help you understand your body weight relative to your height. It provides your BMI score and categorizes it (Underweight, Normal, Overweight, or Obese) based on WHO standards.',
        category: 'calculators',
        slug: 'bmi-calculator',
        icon: 'Activity',
        keywords: ['bmi calculator', 'body mass index', 'health calculator', 'ideal weight', 'weight checker'],
        faqs: [
            {
                question: 'Is BMI accurate for everyone?',
                answer: 'BMI is a general screening tool. It may not be accurate for athletes with high muscle mass or elderly individuals.'
            }
        ],
        usageExample: 'Enter your weight and height in metric or imperial units to get your BMI score.',
        relatedToolIds: ['age-calculator', 'percentage-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'date-difference-calculator',
        title: 'Date Difference Calculator',
        description: 'Count the number of days, weeks, or months between two dates.',
        longDescription: 'Calculate the precise duration between any two dates. Useful for project planning, countdowns, or finding out total time elapsed between historical events.',
        category: 'calculators',
        slug: 'date-difference-calculator',
        icon: 'Calendar',
        keywords: ['days between dates', 'date difference', 'time duration', 'date counter', 'countdown calculator'],
        faqs: [
            {
                question: 'Can I include or exclude the end date?',
                answer: 'Yes, you can toggle an option to include the final day in your total count.'
            }
        ],
        usageExample: 'Select the start and end dates to see the duration in multiple units.',
        relatedToolIds: ['age-calculator', 'time-duration-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'discount-calculator',
        title: 'Discount Calculator',
        description: 'Calculate the final price after a discount or sale.',
        longDescription: 'Perfect for shopping! Find out how much you save and what the final price is after applying one or more discounts. It even handles sales tax and additional coupons.',
        category: 'calculators',
        slug: 'discount-calculator',
        icon: 'Tag',
        keywords: ['discount calculator', 'sale price calculator', 'savings calculator', 'percent off', 'shopping tool'],
        faqs: [
            {
                question: 'Can it handle multiple discounts?',
                answer: 'Yes, you can apply stackable discounts to see the compounding effect on the final price.'
            }
        ],
        usageExample: 'Enter the original price and the discount percentage to see your savings.',
        relatedToolIds: ['percentage-calculator', 'loan-emi-calculator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'time-duration-calculator',
        title: 'Time Duration Calculator',
        description: 'Calculate elapsed time in hours, minutes, and seconds.',
        longDescription: 'Find the total duration between two points in time. Excellent for tracking work hours, sports timing, or calculating flight durations.',
        category: 'calculators',
        slug: 'time-duration-calculator',
        icon: 'Timer',
        keywords: ['time duration', 'elapsed time', 'hours calculator', 'time interval', 'work hours tracker'],
        faqs: [
            {
                question: 'Does it support 24-hour format?',
                answer: 'Yes, our tool supports both 12-hour (AM/PM) and 24-hour time formats.'
            }
        ],
        usageExample: 'Enter the start time and end time to get the total duration.',
        relatedToolIds: ['date-difference-calculator', 'age-calculator'],
        lastUpdated: '2026-03-08'
    },
    // Generators
    {
        id: 'qr-code-generator',
        title: 'QR Code Generator',
        description: 'Create custom QR codes for URLs, text, and more.',
        longDescription: 'Generate high-quality QR codes instantly. Perfect for marketing materials, business cards, and sharing links. Customize the color, size, and error correction level of your QR code.',
        category: 'generators',
        slug: 'qr-code-generator',
        icon: 'QrCode',
        keywords: ['qr code generator', 'create qr code free', 'custom qr code', 'generate qr code online', 'barcode generator'],
        faqs: [
            {
                question: 'Can I change the QR code color?',
                answer: 'Yes, you can choose custom foreground and background colors for your QR codes.'
            },
            {
                question: 'What formats can I download?',
                answer: 'You can download your QR codes as PNG, SVG, or JPG files.'
            }
        ],
        usageExample: 'Enter your URL or text, customize the appearance, and download your QR code.',
        relatedToolIds: ['barcode-generator', 'slug-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'barcode-generator',
        title: 'Barcode Generator',
        description: 'Generate various types of barcodes for products and inventory.',
        longDescription: 'Create professional barcodes including EAN, UPC, Code 128, and more. Ideal for inventory management, retail products, and internal tracking systems.',
        category: 'generators',
        slug: 'barcode-generator',
        icon: 'Barcode',
        keywords: ['barcode generator', 'create barcode online', 'code 128 generator', 'upc generator', 'free barcode maker'],
        faqs: [
            {
                question: 'Which barcode formats are supported?',
                answer: 'We support major formats like Code 128, EAN-13, EAN-8, UPC-A, and Code 39.'
            }
        ],
        usageExample: 'Enter the value, select the barcode type, and generate your barcode image.',
        relatedToolIds: ['qr-code-generator', 'uuid-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'uuid-generator',
        title: 'UUID Generator',
        description: 'Generate random and unique UUIDs (v4).',
        longDescription: 'Create universally unique identifiers (UUIDs) for your databases, software development, and testing. Our generator provides secure, random v4 UUIDs effortlessly.',
        category: 'generators',
        slug: 'uuid-generator',
        icon: 'Fingerprint',
        keywords: ['uuid generator', 'generate guid', 'unique identifier generator', 'random uuid', 'online uuid maker'],
        faqs: [
            {
                question: 'Are these UUIDs really unique?',
                answer: 'UUID v4 provides such a vast number of possibilities that the chance of a collision is practically zero.'
            }
        ],
        usageExample: 'Click "Generate" to get a new batch of unique UUIDs.',
        relatedToolIds: ['password-generator', 'slug-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'slug-generator',
        title: 'Slug Generator',
        description: 'Convert titles into SEO-friendly URL slugs.',
        longDescription: 'Transform any text or title into an optimized, URL-safe slug. Perfect for developers and content creators who need clean, human-readable URLs for their websites.',
        category: 'generators',
        slug: 'slug-generator',
        icon: 'Link2',
        keywords: ['slug generator', 'url slug maker', 'seo friendly url', 'title to slug converter'],
        faqs: [
            {
                question: 'Does it remove special characters?',
                answer: 'Yes, it automatically removes non-ASCII characters and replaces spaces with hyphens for clean URLs.'
            }
        ],
        usageExample: 'Type your title and copy the generated slug for your article or page.',
        relatedToolIds: ['qr-code-generator', 'uuid-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'fake-data-generator',
        title: 'Fake Data Generator',
        description: 'Generate dummy data for testing and development.',
        longDescription: 'Create realistic fake data including names, emails, phone numbers, and addresses. Essential for developers who need to populate mock databases or test application features.',
        category: 'generators',
        slug: 'fake-data-generator',
        icon: 'Database',
        keywords: ['fake data generator', 'dummy data', 'mock data maker', 'test data generator', 'random identity generator'],
        faqs: [
            {
                question: 'Is the data realistic?',
                answer: 'Yes, we use advanced patterns to generate data that looks and feels like real user information.'
            }
        ],
        usageExample: 'Select the fields you need and generate a list of mock data in various formats like JSON or CSV.',
        relatedToolIds: ['username-generator', 'random-text-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'password-generator',
        title: 'Strong Password Generator',
        description: 'Create secure and strong random passwords.',
        longDescription: 'Generate cryptographically secure passwords that are impossible to guess. Customize length and include uppercase letters, numbers, and special symbols for maximum security. 100% browser-side generation.',
        category: 'generators',
        slug: 'password-generator',
        icon: 'Lock',
        keywords: ['password generator', 'secure password', 'strong password maker', 'random password', 'online password tool'],
        faqs: [
            {
                question: 'Are the passwords saved?',
                answer: 'No, passwords are generated locally in your browser and are never transmitted or stored anywhere.'
            }
        ],
        usageExample: 'Select your preferred length and security options, then copy your new password.',
        relatedToolIds: ['uuid-generator', 'username-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'username-generator',
        title: 'Username Generator',
        description: 'Generate creative and unique usernames for social platforms.',
        longDescription: 'Find the perfect username for gaming, social media, or professional profiles. Choose from various styles including cool, professional, or random combinations.',
        category: 'generators',
        slug: 'username-generator',
        icon: 'UserCircle',
        keywords: ['username generator', 'gamertag maker', 'cool usernames', 'random username', 'social media handle generator'],
        faqs: [
            {
                question: 'Can I check availability?',
                answer: 'Our tool generates suggestions. You will need to check availability on the specific platform you wish to use.'
            }
        ],
        usageExample: 'Enter a keyword or click "Random" to get a list of creative username ideas.',
        relatedToolIds: ['fake-data-generator', 'password-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'random-text-generator',
        title: 'Random Text Generator',
        description: 'Generate random strings, sentences, or paragraphs.',
        longDescription: 'Create unpredictable text data for testing, development, or creative writing. Customize length, complexity, and character sets to suit your needs.',
        category: 'generators',
        slug: 'random-text-generator',
        icon: 'Shuffle',
        keywords: ['random text', 'text generator', 'dummy text', 'random sentence generator'],
        faqs: [
            {
                question: 'Can I include special characters?',
                answer: 'Yes, you can customize exactly which character sets (A-Z, 0-9, symbols) are used.'
            }
        ],
        usageExample: 'Choose the type of text you need, set the parameters, and click Generate.',
        relatedToolIds: ['lorem-ipsum-generator', 'password-generator'],
        lastUpdated: '2026-03-08'
    },
    {
        id: 'lorem-ipsum-generator',
        title: 'Lorem Ipsum Generator',
        description: 'Generate placeholder layout text for your designs.',
        longDescription: 'The standard industry tool for designers. Generate classic Lorem Ipsum placeholder text in various lengths (words, sentences, or paragraphs) to visualize layouts.',
        category: 'generators',
        slug: 'lorem-ipsum-generator',
        icon: 'Pilcrow',
        keywords: ['lorem ipsum', 'placeholder text', 'dummy text generator', 'filler text'],
        faqs: [
            {
                question: 'What is Lorem Ipsum?',
                answer: 'Lorem Ipsum is a pseudo-Latin placeholder text used to emphasize the layout and design over the actual content.'
            }
        ],
        usageExample: 'Select the number of paragraphs you need and click Generate.',
        relatedToolIds: ['random-text-generator', 'word-counter'],
        lastUpdated: '2026-03-08'
    },
];
