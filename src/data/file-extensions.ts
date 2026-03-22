export interface FileExtension {
    ext: string;
    name: string;
    description: string;
    category: 'document' | 'image' | 'audio' | 'video' | 'code' | 'archive' | 'system' | 'database';
    software: string[];
    mimeType: string;
    howToOpen: string;
}

export const fileExtensions: FileExtension[] = [
    {
        ext: 'docx',
        name: 'Microsoft Word Open XML Document',
        description: 'The default file format for Microsoft Word. It uses XML and ZIP compression to keep file sizes small.',
        category: 'document',
        software: ['Microsoft Word', 'Google Docs', 'LibreOffice Writer', 'Pages (Mac)'],
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        howToOpen: 'The best way to open a DOCX file is using Microsoft Word, but you can also upload it to Google Docs or use free alternatives like LibreOffice.'
    },
    {
        ext: 'jpg',
        name: 'JPEG Image',
        description: 'A popular image format used for digital photography and online images because it offers a great balance between file size and image quality.',
        category: 'image',
        software: ['Windows Photo Viewer', 'Adobe Photoshop', 'Apple Photos', 'Any web browser'],
        mimeType: 'image/jpeg',
        howToOpen: 'Double-click the file to open it in your system\'s default photo viewer. Most web browsers and image editors also support this format.'
    },
    {
        ext: 'png',
        name: 'Portable Network Graphics',
        description: 'A raster graphics file format that supports lossless data compression. PNG was developed as an improved, non-patented replacement for GIF.',
        category: 'image',
        software: ['Adobe Photoshop', 'GIMP', 'Windows Paint', 'Any web browser'],
        mimeType: 'image/png',
        howToOpen: 'PNG files can be opened by virtually all image viewing and editing software.'
    },
    {
        ext: 'mp4',
        name: 'MPEG-4 Part 14 Video File',
        description: 'A digital multimedia container format most commonly used to store video and audio, but it can also be used to store other data such as subtitles and still images.',
        category: 'video',
        software: ['VLC Media Player', 'Windows Media Player', 'QuickTime Player', 'YouTube'],
        mimeType: 'video/mp4',
        howToOpen: 'Use a media player like VLC or Windows Media Player. Most modern smartphones and web browsers natively support MP4 playback.'
    },
    {
        ext: 'mp3',
        name: 'MP3 Audio File',
        description: 'A coding format for digital audio. It is the most common audio format used for music storage and playback on digital devices.',
        category: 'audio',
        software: ['iTunes', 'VLC Media Player', 'Windows Media Player', 'Spotify'],
        mimeType: 'audio/mpeg',
        howToOpen: 'Simply double-click the file to play it in your default music player. MP3 is compatible with almost all audio-playing devices.'
    },
    {
        ext: 'zip',
        name: 'Zipped (Compressed) Archive',
        description: 'A file format that supports lossless data compression. A ZIP file may contain one or more files or directories that may have been compressed.',
        category: 'archive',
        software: ['WinZip', '7-Zip', 'WinRAR', 'Native Windows Explorer', 'Archive Utility (Mac)'],
        mimeType: 'application/zip',
        howToOpen: 'On Windows, right-click the file and select "Extract All". On macOS, double-click the file to unzip the contents automatically.'
    },
    {
        ext: 'py',
        name: 'Python Script',
        description: 'A script file containing code written in Python, a high-level programming language known for its readability and versatility.',
        category: 'code',
        software: ['VS Code', 'PyCharm', 'Sublime Text', 'Python Interpreter'],
        mimeType: 'text/x-python',
        howToOpen: 'You can open this file with any text editor to view the code. To run the script, you must have Python installed and use the command line (e.g., "python filename.py").'
    },
    {
        ext: 'js',
        name: 'JavaScript File',
        description: 'A text file containing JavaScript code, which is used to create interactive and dynamic content on websites.',
        category: 'code',
        software: ['VS Code', 'Sublime Text', 'Notepad++', 'Web Browsers'],
        mimeType: 'application/javascript',
        howToOpen: 'Open with a text editor like VS Code to edit or view. JavaScript files are typically executed by web browsers as part of a webpage.'
    },
    {
        ext: 'csv',
        name: 'Comma Separated Values File',
        description: 'A plain text file that contains a list of data. These files are often used for exchanging data between different applications.',
        category: 'database',
        software: ['Microsoft Excel', 'Google Sheets', 'Notepad', 'CSV editors'],
        mimeType: 'text/csv',
        howToOpen: 'While you can open CSVs in a text editor, they are best viewed using spreadsheet software like Excel or Google Sheets, which will automatically format the data into columns.'
    },
    {
        ext: 'xlsx',
        name: 'Microsoft Excel Open XML Spreadsheet',
        description: 'The standard spreadsheet format used by Microsoft Excel. Like DOCX, it is based on XML and ZIP compression.',
        category: 'database',
        software: ['Microsoft Excel', 'Google Sheets', 'LibreOffice Calc'],
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        howToOpen: 'Use Microsoft Excel for the best experience, or import it into Google Sheets or LibreOffice Calc.'
    },
    {
        ext: 'json',
        name: 'JSON File',
        description: 'JavaScript Object Notation is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate.',
        category: 'code',
        software: ['VS Code', 'Online JSON Viewers', 'Notepad++', 'Any browser'],
        mimeType: 'application/json',
        howToOpen: 'Open with a text editor to see the data structure. Developers often use online formatters to make large JSON files more readable.'
    },
    {
        ext: 'exe',
        name: 'Windows Executable file',
        description: 'A file containing a program that can be run on the Microsoft Windows operating system.',
        category: 'system',
        software: ['Microsoft Windows OS'],
        mimeType: 'application/x-msdownload',
        howToOpen: 'Simply double-click on Windows to start the installer or program. Note: Executables can be dangerous; only run files from trusted sources.'
    },
    {
        ext: 'dmg',
        name: 'macOS Disk Image',
        description: 'A file format used by macOS for software installers and compressed folders.',
        category: 'system',
        software: ['Apple Disk Utility', 'macOS Finder'],
        mimeType: 'application/x-apple-diskimage',
        howToOpen: 'On a Mac, double-click the file to "mount" it as a drive, then drag the application into your Applications folder.'
    },
    {
        ext: 'gif',
        name: 'Graphics Interchange Format',
        description: 'The GIF file extension, short for Graphics Interchange Format, is one of the most iconic and widely recognized image formats on the internet since its creation by CompuServe in 1987. Originally designed for efficient transmission of color images over slow dial-up connections, GIF quickly became the go-to format for web animations, memes, reaction images, and simple looping graphics that dominate social media platforms like X (Twitter), Instagram, Facebook, and messaging apps such as WhatsApp and Discord. Unlike JPEG, which uses lossy compression, GIF employs lossless LZW compression to preserve every single pixel detail while supporting up to 256 colors and transparency. This makes it perfect for logos, icons, banners, and short video-like clips without the heavy file sizes of true video formats. However, the 256-color limitation means GIF is not suitable for high-resolution photographs or complex artwork — for those, PNG or JPEG are better choices. In modern web development, GIF files are still heavily used in email signatures, website loaders, and marketing banners because they load instantly in all browsers without plugins. With the rise of tools like Photoshop, GIMP, and online converters such as EZGIF, creating custom animated GIFs has never been easier, turning this decades-old format into an evergreen staple of digital culture and online marketing campaigns.',
        category: 'image',
        software: ['Adobe Photoshop', 'GIMP', 'Windows Photos', 'Apple Preview', 'EZGIF', 'Any web browser'],
        mimeType: 'image/gif',
        howToOpen: 'Opening a GIF file is incredibly straightforward and works across virtually every device and platform. On Windows, simply double-click the file and it will play automatically in the built-in Photos app or Windows Photo Viewer. On macOS, use Preview or QuickTime Player — both natively support animation playback. For mobile devices, any gallery app on Android or iOS will display and loop the GIF instantly. Web browsers (Chrome, Firefox, Edge, Safari) are the most common way people interact with GIFs: just drag the file into a new tab or view it embedded on websites. If you need to edit frames, optimize size, or convert GIF to MP4, free online tools like EZGIF.com allow instant processing without installing software. For professional editing, Adobe Photoshop offers the most advanced timeline controls to add, remove, or speed up frames. Always scan GIF files from unknown sources with antivirus software, as animated images can occasionally hide malicious scripts in rare cases.'
    },
    {
        ext: 'bmp',
        name: 'Bitmap Image File',
        description: 'The BMP file extension stands for Bitmap and represents one of the oldest and simplest raster image formats developed by Microsoft specifically for the Windows operating system in the early 1990s. BMP files store uncompressed pixel data, which means they deliver perfect image quality with zero loss but come at the cost of significantly larger file sizes compared to modern compressed formats like PNG or JPEG. This makes BMP ideal for screenshots, icons, wallpapers, and any scenario where absolute pixel fidelity is required — such as in graphic design software, medical imaging archives, or legacy Windows applications. BMP supports color depths from 1-bit monochrome all the way up to 32-bit true color with alpha transparency in newer variants. Because the format is so straightforward and has no patents or licensing issues, it remains a standard in many desktop publishing workflows and is still the default export option in Microsoft Paint and other basic image editors. While BMP is rarely used on the web today due to its bulky nature (which slows down page loading), it continues to thrive in enterprise environments, game development asset pipelines, and printer drivers. If you work with old software or need raw pixel manipulation without any compression artifacts, BMP is still an excellent choice even in 2026.',
        category: 'image',
        software: ['Microsoft Paint', 'Adobe Photoshop', 'GIMP', 'IrfanView', 'Windows Photos'],
        mimeType: 'image/bmp',
        howToOpen: 'BMP files are natively supported on every Windows computer — simply double-click and they open instantly in the Photos app or classic Paint program. On macOS, use Preview or Pixelmator for seamless viewing and basic editing. Linux users can rely on the default image viewer in GNOME or KDE. For cross-platform editing, free tools like GIMP and IrfanView offer full support including batch conversion to PNG or JPEG for smaller file sizes. Web browsers can also display BMP files when you drag them into a tab, although they are not recommended for websites. If you receive a large BMP file via email or USB, always use antivirus software before opening it, as uncompressed formats can sometimes contain hidden data. Professional designers often convert BMP to more efficient formats using online tools like Convertio or CloudConvert to save storage space while preserving quality.'
    },
    {
        ext: 'doc',
        name: 'Microsoft Word Document',
        description: 'The DOC file extension is the classic binary document format used by Microsoft Word from the 1990s through 2007 and remains one of the most widely circulated file types in business, education, and government environments worldwide. Unlike the modern DOCX format, DOC stores all text formatting, images, tables, charts, and even macros in a proprietary binary structure that allows for rich, professional documents with track changes, comments, and advanced styling. This format powered millions of resumes, contracts, reports, and academic papers before the switch to XML-based DOCX. Even today, countless legacy archives, old hard drives, and email attachments still contain DOC files that must be opened and edited. The biggest advantage of DOC is its near-universal compatibility — virtually every word processor on earth can handle it, including LibreOffice, Google Docs, and WPS Office. However, DOC files can be larger than DOCX and are more prone to corruption over long-term storage. They also support VBA macros, which makes them powerful for automation but also a common vector for malware if opened from untrusted sources. For anyone dealing with older corporate documents or needing maximum backward compatibility, understanding how to safely open and convert DOC files is an essential digital skill in 2026.',
        category: 'document',
        software: ['Microsoft Word', 'LibreOffice Writer', 'Google Docs', 'WPS Office', 'Apple Pages'],
        mimeType: 'application/msword',
        howToOpen: 'The most reliable way to open a DOC file is with the latest version of Microsoft Word, which provides 100% fidelity for formatting and macros. If you don’t have Word, upload the file directly to Google Docs (free) or use the completely free LibreOffice suite — both preserve layout almost perfectly. On macOS, Apple Pages can import DOC files with good results. Mobile users can open DOC attachments in the Microsoft Word app for Android/iOS or Google Docs mobile. For batch conversion of many old DOC files to DOCX or PDF, tools like Adobe Acrobat or online converters (Smallpdf, ILovePDF) work wonders. Always enable macro security settings before opening any DOC file from unknown senders to prevent potential viruses. If the file appears corrupted, try the “Open and Repair” feature inside Microsoft Word for quick recovery.'
    },
    {
        ext: 'odt',
        name: 'OpenDocument Text Document',
        description: 'The ODT file extension belongs to the OpenDocument Text format, an open-standard, XML-based document type developed by the OASIS consortium and officially supported by the European Union and many governments as a vendor-neutral alternative to Microsoft’s proprietary formats. ODT files contain text, images, tables, styles, and metadata in a ZIP-compressed package that is fully transparent and editable by any compliant software. This makes ODT the preferred choice for long-term archiving, collaborative writing, and environments that prioritize freedom from vendor lock-in. Unlike DOC or DOCX, ODT works perfectly across Windows, macOS, Linux, and even mobile devices without compatibility issues. It supports advanced features such as tracked changes, comments, embedded spreadsheets, and mathematical formulas. Because it is 100% open source and royalty-free, ODT has become the standard format in schools, universities, and public institutions worldwide. The format is also future-proof — you can open an ODT file created in 2005 with the latest LibreOffice version in 2026 with zero formatting loss. For users who frequently share documents across different operating systems or want maximum control over their data, ODT is the smartest and most professional choice available today.',
        category: 'document',
        software: ['LibreOffice Writer', 'Apache OpenOffice', 'Microsoft Word (via import)', 'Google Docs', 'OnlyOffice'],
        mimeType: 'application/vnd.oasis.opendocument.text',
        howToOpen: 'The native and best way to open ODT files is with LibreOffice Writer — it’s completely free, open-source, and provides pixel-perfect rendering. Simply download LibreOffice from the official website and double-click any ODT file. Microsoft Word 2010 and newer versions can open ODT directly with excellent results. Google Docs also supports ODT upload and editing through its web interface or mobile apps. On macOS, you can use TextEdit or the free OnlyOffice suite. For quick viewing without installing software, many online ODT viewers exist. If you need to convert ODT to PDF for sharing, LibreOffice has a one-click export option that preserves all formatting, hyperlinks, and bookmarks perfectly. ODT files are extremely safe and rarely carry malware because of their open XML structure.'
    },
    {
        ext: 'avi',
        name: 'Audio Video Interleave',
        description: 'The AVI file extension, short for Audio Video Interleave, is a classic multimedia container format introduced by Microsoft in 1992 that can hold both video and audio streams in a single file. AVI became the de facto standard for video sharing in the early days of the internet and Windows because it was simple, widely supported, and allowed high-quality recordings from camcorders and screen-capture software. Although it has been largely superseded by more efficient formats like MP4, AVI is still heavily used in professional video editing, legacy archives, security camera footage, and older video games. AVI supports virtually any codec (DivX, Xvid, uncompressed, etc.) and can deliver lossless video when needed. Its biggest advantage is rock-solid compatibility across decades of software and hardware. Many older TV broadcasters and corporate training libraries still distribute content exclusively in AVI. For anyone working with vintage video tapes, old camcorder files, or needing maximum editing flexibility without re-encoding, AVI remains a reliable and powerful choice even in the modern streaming era.',
        category: 'video',
        software: ['VLC Media Player', 'Windows Media Player', 'Adobe Premiere Pro', 'DaVinci Resolve', 'QuickTime (with codec)'],
        mimeType: 'video/x-msvideo',
        howToOpen: 'The easiest and most reliable way to open any AVI file is with VLC Media Player — it plays every variant of AVI instantly on Windows, Mac, Linux, and mobile devices. Windows 10/11 users can also use the built-in Movies & TV app after installing the necessary codecs from the Microsoft Store. For professional editing, import AVI files directly into Adobe Premiere Pro or the free DaVinci Resolve. On macOS, use QuickTime Player after installing Perian or VLC. If an AVI file refuses to play, it usually means the specific codec is missing — VLC automatically downloads and installs the correct codec in most cases. For long-term preservation, many users convert old AVI files to MP4 using HandBrake while keeping the original AVI as a backup.'
    },
    {
        ext: 'rar',
        name: 'RAR Archive',
        description: 'The RAR file extension stands for Roshal Archive and is a proprietary compressed archive format created by Eugene Roshal that offers significantly better compression ratios than ZIP while supporting advanced features like password protection, error recovery, and multi-volume splitting. RAR files are widely used for distributing large software packages, game mods, high-resolution photo collections, and movie backups because they can shrink files by 30–50% more than ZIP in many cases. RAR archives also support solid compression, which analyzes all files together for maximum efficiency. The format has become a standard in the file-sharing and torrent community, with almost every download site offering RAR archives. WinRAR, the official software, has been continuously updated for over 25 years and remains one of the most trusted tools on Windows. Modern alternatives like 7-Zip and PeaZip can also extract RAR files for free. For users who regularly download large files or need to securely compress sensitive documents with strong AES-256 encryption, RAR is still the professional choice in 2026.',
        category: 'archive',
        software: ['WinRAR', '7-Zip', 'PeaZip', 'RAR for Android', 'The Unarchiver (Mac)'],
        mimeType: 'application/x-rar-compressed',
        howToOpen: 'On Windows, install the official WinRAR software and simply double-click any .rar file to open or extract it. The free and open-source 7-Zip also handles RAR files perfectly and is recommended for users who prefer no paid software. On macOS, The Unarchiver or Keka can extract RAR archives with one click. Android users can use the RAR app from the Play Store. To extract password-protected RAR files, you will need the correct password — never download cracked software to bypass this. For multi-part RAR sets (part1.rar, part2.rar, etc.), place all parts in the same folder before extracting. Always scan RAR files from the internet with updated antivirus software before opening, as archives can contain malware.'
    },
    {
        ext: 'apk',
        name: 'Android Package Kit',
        description: 'The APK file extension is the official package format for Android applications, used by Google Play and every Android device since the platform’s launch in 2008. An APK is essentially a compressed ZIP archive containing all the code, resources, assets, and manifest files needed to install and run an app on phones, tablets, smart TVs, and even Android-based car systems. Developers compile their apps into APK format for distribution, and users download APKs directly from websites or sideloading when Google Play is unavailable. APK files support advanced features like split APKs, instant apps, and dynamic feature modules, making them incredibly efficient for modern mobile development. In 2026, with billions of Android devices worldwide, APK remains the universal standard for app distribution. Security-conscious users can inspect APK contents to verify permissions before installation. For developers, understanding APK structure is essential for creating custom ROMs, modding games, or publishing apps outside the Play Store. Whether you are downloading a niche utility app or backing up your favorite games, APK files give you complete control over your Android experience.',
        category: 'system',
        software: ['Android OS (native)', 'Google Play Store', 'APKMirror', 'BlueStacks Emulator', 'Android Studio'],
        mimeType: 'application/vnd.android.package-archive',
        howToOpen: 'On any Android phone or tablet, simply tap an APK file in your downloads folder and the system will prompt you to install it (enable “Install unknown apps” in settings first). For PC users, install the free BlueStacks or LDPlayer emulator, then drag the APK into the emulator window to install and run the app instantly. Developers use Android Studio to open, inspect, and debug APK files professionally. Always download APK files only from trusted sources like APKMirror or the official developer website to avoid malware. Before installing, you can scan the APK with VirusTotal or use built-in Android security features. To extract and view the contents of an APK (which is just a ZIP), rename the extension to .zip and open with 7-Zip or WinRAR. Never install APK files from random websites unless you have verified their authenticity.'
    },
    {
        ext: 'webp',
        name: 'WebP Image Format',
        description: 'WebP is a modern image format developed by Google in 2010 as a more efficient alternative to JPEG, PNG, and GIF. It supports both lossy and lossless compression, transparency (alpha channel), and animation — making it ideal for web images, e-commerce product photos, memes, banners, and responsive websites. In 2026, WebP has become the dominant web image format thanks to native support in all major browsers (Chrome, Firefox, Edge, Safari since 2021+), reducing bandwidth by 25–35% compared to JPEG while maintaining or improving visual quality. Photographers and web developers love WebP for faster page loads, better SEO rankings from Core Web Vitals, and smaller file sizes without noticeable quality loss. Tools like Photoshop, GIMP, and online converters make creation easy. Drawbacks include slightly slower encoding than JPEG on older hardware and occasional compatibility issues with very old software or email clients. For anyone optimizing websites, blogs, or online stores in 2026, converting images to WebP is a must-do step for performance and user experience.',
        category: 'image',
        software: ['Google Chrome', 'Mozilla Firefox', 'Microsoft Edge', 'Adobe Photoshop', 'GIMP', 'Any modern browser'],
        mimeType: 'image/webp',
        howToOpen: 'WebP files open natively in all current web browsers — just drag into a tab or view on any site using them. On Windows, use Photos app (after updates) or Paint; on macOS, Preview supports WebP since recent versions. For editing, Adobe Photoshop (with plugin or native in 2021+) or free GIMP works perfectly. Convert WebP to PNG/JPG using online tools like Squoosh.app or CloudConvert if needed for legacy apps. Mobile devices handle WebP seamlessly in galleries and browsers.'
    },
    {
        ext: 'svg',
        name: 'Scalable Vector Graphics',
        description: 'SVG (Scalable Vector Graphics) is an XML-based vector image format standardized by W3C since 2001, perfect for logos, icons, illustrations, diagrams, charts, and responsive web design elements that need to scale infinitely without pixelation. Unlike raster formats (JPG, PNG), SVG uses mathematical paths, shapes, and text — resulting in tiny file sizes, crisp edges at any zoom level, and easy CSS/JS manipulation for animations, interactivity, and dark mode/color changes. In 2026, SVG dominates web icons (Font Awesome, Material Icons), infographics, data visualizations (D3.js), and UI components in frameworks like React and Tailwind. Search engines love SVG for accessibility (text is selectable) and performance. Editors like Inkscape, Adobe Illustrator, and VS Code make creation straightforward. Limitations include poor support for complex photos (use raster for those) and larger files for very detailed artwork. For designers, marketers, and developers building modern sites, SVG is essential for sharp, lightweight, and future-proof graphics.',
        category: 'image',
        software: ['Adobe Illustrator', 'Inkscape', 'Figma', 'VS Code', 'Any modern web browser'],
        mimeType: 'image/svg+xml',
        howToOpen: 'SVG files open directly in any modern browser as interactive vector images. Double-click on desktop to view in default browser. For editing, use free Inkscape (full-featured vector editor) or premium Adobe Illustrator. VS Code with extensions previews and edits SVG code live. On mobile, browsers render SVG perfectly; apps like Vectornator work for iOS editing. Optimize large SVGs with SVGO tool or online compressors for web use.'
    },
    {
        ext: 'heic',
        name: 'High Efficiency Image Container',
        description: 'HEIC (High Efficiency Image Container) is Apple’s modern image format introduced with iOS 11 in 2017, based on HEIF (High Efficiency Image Format) using HEVC compression. It delivers dramatically smaller file sizes (often 50% less than JPEG) with equal or better quality, supports live photos, burst shots, transparency, and 16-bit color depth — making it the default for iPhone/iPad photos in 2026. Android adopted HEIC/HEIF support around 2020–2022, and Windows/macOS handle it natively now. Photographers and casual users benefit from massive storage savings on devices and iCloud without quality compromise. HEIC excels for portraits, HDR images, and high-res smartphone photography. Downsides: occasional compatibility issues with older Windows versions or non-Apple software (though converters are everywhere). For anyone in the Apple ecosystem or sharing photos across platforms, understanding HEIC conversion to JPG/PNG is key for universal sharing while keeping originals for archiving.',
        category: 'image',
        software: ['Apple Photos', 'Preview (Mac)', 'Windows Photos (with HEIF extension)', 'GIMP', 'Photoshop'],
        mimeType: 'image/heic',
        howToOpen: 'On iPhone/iPad/macOS, HEIC opens natively in Photos or Preview. Windows users need the free HEIF Image Extensions from Microsoft Store for Photos app support. Convert to JPG using built-in Preview export or online tools like heic.to. Android supports viewing in most galleries post-Android 9; editing in Snapseed or Lightroom. For batch conversion, use iMazing or Automator on Mac.'
    },
    {
        ext: 'avif',
        name: 'AV1 Image File Format',
        description: 'AVIF is an open, royalty-free image format based on the AV1 video codec, released around 2019–2020 by the Alliance for Open Media. It offers superior compression to WebP and JPEG — up to 50% smaller files at similar quality — with support for HDR, wide color gamut, transparency, and animation. In 2026, AVIF is rapidly gaining adoption for web images (supported in Chrome, Firefox, Edge; Safari since 2021+), especially on bandwidth-sensitive sites, streaming thumbnails, and next-gen photography. It excels for high-res photos, game assets, and e-commerce visuals where every kilobyte counts for faster loading and better SEO. Tools like libavif, Photoshop plugins, and Squoosh make encoding accessible. Main limitation: slower encoding/decoding than JPEG on low-end devices, but hardware acceleration is improving fast. For forward-thinking web developers and photographers in 2026, AVIF represents the future of efficient, high-quality web imagery.',
        category: 'image',
        software: ['Google Chrome', 'Firefox', 'Edge', 'GIMP (with plugin)', 'Squoosh.app'],
        mimeType: 'image/avif',
        howToOpen: 'AVIF opens natively in supported browsers (Chrome 85+, Firefox 93+, Edge 121+, Safari 16.4+). Drag to tab for instant view. On desktop, use GIMP or IrfanView with plugins. Convert AVIF to PNG/JPG via CloudConvert or Squoosh for legacy compatibility. Mobile support is excellent in recent Android/iOS browsers and galleries.'
    },
    {
        ext: 'tiff',
        name: 'Tagged Image File Format',
        description: 'TIFF (Tagged Image File Format) is a flexible, industry-standard raster format from 1986, widely used in professional photography, scanning, publishing, medical imaging, and archiving because it supports lossless compression, multiple layers, high bit depths (up to 32-bit), CMYK color, and metadata tags. TIFF preserves every detail without degradation, making it ideal for master archives, print production, OCR documents, and satellite imagery. In 2026, TIFF remains the gold standard for photographers exporting from RAW, publishers needing press-ready files, and institutions requiring long-term preservation. Variants like GeoTIFF add geospatial data. Drawbacks: large file sizes compared to JPEG/WebP and slower web loading (rarely used online). Software like Photoshop, GIMP, and IrfanView handle TIFF flawlessly. For anyone in creative professions or needing archival-grade images, TIFF ensures maximum fidelity and future-proofing.',
        category: 'image',
        software: ['Adobe Photoshop', 'GIMP', 'IrfanView', 'Apple Preview', 'Windows Photos'],
        mimeType: 'image/tiff',
        howToOpen: 'TIFF files open in most image viewers: Windows Photos, macOS Preview, or IrfanView (free and fast). Photoshop and GIMP offer full editing. For multi-page TIFFs (scans), use dedicated viewers like Windows Fax Viewer or online tools. Convert to PDF for sharing if needed.'
    },
    {
        ext: 'psd',
        name: 'Photoshop Document',
        description: 'PSD is Adobe Photoshop’s native layered file format, storing images with editable layers, masks, adjustment layers, text, smart objects, paths, and metadata. Since the 1990s, PSD has been the industry standard for graphic designers, digital artists, photographers, and UI/UX teams working on complex compositions, mockups, posters, app designs, and photo retouching. In 2026, PSD remains essential despite competition from formats like Affinity Photo or GIMP’s XCF — because of seamless collaboration in creative workflows, non-destructive editing, and huge plugin ecosystem. Files can grow large with many layers, but smart objects help manage complexity. For anyone in creative industries, saving as PSD preserves editability long-term before exporting to JPG/PNG for final use.',
        category: 'image',
        software: ['Adobe Photoshop', 'Affinity Photo', 'GIMP (partial support)', 'Photopea (online)'],
        mimeType: 'image/vnd.adobe.photoshop',
        howToOpen: 'Open PSD natively in Adobe Photoshop for full editing. Free alternatives: Photopea.com (browser-based, excellent compatibility), GIMP (imports layers but may lose some features). Affinity Photo opens PSD well. Always keep backups — PSD corruption is rare but possible with very large files.'
    },
    {
        ext: 'raw',
        name: 'RAW Image File (various camera manufacturers)',
        description: 'RAW files (often .CR2, .NEF, .ARW, etc., but grouped as .raw) contain unprocessed sensor data from digital cameras, offering maximum dynamic range, color depth (12–16 bit), and editing flexibility. Unlike JPEG, RAW is lossless and allows white balance, exposure, noise reduction, and sharpening adjustments post-capture without quality loss — making it indispensable for professional photographers, astrophotography, product photography, and fine art prints in 2026. Each camera brand has its variant (.CR3 for Canon, .NEF for Nikon, .ARW for Sony), but Adobe Camera Raw and Lightroom unify them. Storage demands are high, but the latitude for recovery (underexposed shadows, blown highlights) is unmatched. For hobbyists moving beyond phone photos, shooting RAW unlocks true creative control.',
        category: 'image',
        software: ['Adobe Lightroom', 'Adobe Photoshop', 'Capture One', 'Darktable (free)', 'DxO PhotoLab'],
        mimeType: 'image/x-raw',  // generic; actual varies (image/x-canon-cr2 etc.)
        howToOpen: 'Use Adobe Lightroom/Photoshop (Camera Raw plugin) for best results. Free options: Darktable or RawTherapee handle most RAW formats excellently. Camera manufacturer software (Canon DPP, Nikon Capture NX-D) offers native processing. Convert to DNG for universal archiving.'
    },
    {
        ext: 'eps',
        name: 'Encapsulated PostScript',
        description: 'EPS (Encapsulated PostScript) is a vector format from Adobe in the 1980s, used for logos, illustrations, clipart, and print graphics because it embeds PostScript code for precise printing on any resolution device. EPS supports both vector paths and embedded raster previews, making it compatible with older design software, printers, and publishers. In 2026, EPS is still common in legacy workflows, signage, vinyl cutting, and stock graphics libraries, though SVG has largely replaced it for web/digital use. Advantages include device-independent color and scalability; disadvantages are large files and poor modern web support. Designers often use EPS for Illustrator exports to InDesign or third-party printers.',
        category: 'image',
        software: ['Adobe Illustrator', 'CorelDRAW', 'Inkscape', 'Ghostscript'],
        mimeType: 'application/postscript',
        howToOpen: 'Open EPS in Adobe Illustrator or CorelDRAW for editing. Inkscape imports EPS well. For viewing only, use Ghostview or online converters to PDF. Convert EPS to SVG/PDF for modern use.'
    },
    {
        ext: 'ai',
        name: 'Adobe Illustrator File',
        description: 'AI is Adobe Illustrator’s proprietary vector format for storing artwork with layers, paths, gradients, effects, symbols, and typography. Since the 1980s, AI has been the go-to for professional logo design, icons, typography, illustrations, packaging, and print materials due to its advanced tools and PDF compatibility. In 2026, AI files remain central in creative agencies despite open alternatives like SVG — because of non-destructive editing, precision, and integration with Photoshop/InDesign. Files are compact and editable indefinitely. For freelancers and studios, saving master copies as AI ensures future-proof edits before exporting to client formats.',
        category: 'image',
        software: ['Adobe Illustrator', 'Affinity Designer (import)', 'Inkscape (limited)'],
        mimeType: 'application/illustrator',
        howToOpen: 'Native opening in Adobe Illustrator. Affinity Designer imports AI files reliably. Convert to PDF/SVG for broader compatibility using Illustrator export or online tools.'
    },
    {
        ext: 'aac',
        name: 'Advanced Audio Coding',
        description: 'AAC (Advanced Audio Coding) is a lossy audio format developed as the successor to MP3 by MPEG in 1997, offering better sound quality at similar or lower bitrates. AAC is the standard for iTunes/Apple Music, YouTube, Nintendo Switch, PlayStation, and most streaming services in 2026 because it delivers richer highs, clearer mids, and less artifacting than MP3 at 128–256 kbps. It supports up to 48 channels, HE-AAC for low-bitrate streaming, and DRM variants. Audiophiles prefer AAC over older MP3 rips for music libraries. Drawback: less universal than MP3 on very old hardware. For anyone building music collections or streaming, AAC provides the best balance of quality and file size in the modern era.',
        category: 'audio',
        software: ['iTunes', 'Apple Music', 'VLC', 'foobar2000', 'Winamp'],
        mimeType: 'audio/aac',
        howToOpen: 'AAC plays natively in iTunes/Apple Music, VLC (universal), Windows Media Player (with codecs), and most mobile music apps. Convert to MP3 if needed using iTunes or online tools.'
    },
    {
        ext: 'flac',
        name: 'Free Lossless Audio Codec',
        description: 'FLAC is an open-source, lossless audio format from Xiph.Org since 2001, compressing CD-quality (16-bit/44.1kHz) and hi-res audio (24-bit/192kHz+) without any quality loss — perfect for audiophiles, music archivists, and studio masters. FLAC reduces file sizes by 40–60% compared to WAV while preserving bit-perfect originals, supports metadata tags, album art, and error detection. In 2026, FLAC dominates high-fidelity downloads (Bandcamp, Qobuz, HDtracks) and local libraries for Plex/Jellyfin servers. Players like foobar2000, VLC, and Tidal support it natively. Unlike lossy formats, FLAC lets you re-encode or convert forever without degradation — ideal for long-term music preservation.',
        category: 'audio',
        software: ['VLC Media Player', 'foobar2000', 'Audacity', 'MusicBee', 'Plex'],
        mimeType: 'audio/flac',
        howToOpen: 'FLAC plays in VLC, foobar2000, or Windows Media Player (with codec). Rip CDs to FLAC using Exact Audio Copy for perfect archives. Edit metadata with Mp3tag.'
    },
    {
        ext: 'ogg',
        name: 'Ogg Vorbis Audio',
        description: 'Ogg is a free, open container format often paired with Vorbis audio codec (lossy) or Opus (modern low-latency), offering patent-free, high-quality sound as an MP3 alternative since 2000. Ogg Vorbis provides excellent quality at 128–192 kbps; Opus excels at very low bitrates (6–510 kbps) for voice, music, and streaming. In 2026, Ogg/Opus powers WebRTC calls, Discord voice, Spotify backups, and indie game soundtracks because of royalty-free licensing and superior efficiency. Drawback: less hardware support than AAC/MP3 on old devices. For open-source enthusiasts and developers, Ogg remains a principled, high-performance choice.',
        category: 'audio',
        software: ['VLC', 'foobar2000', 'Audacity', 'Winamp'],
        mimeType: 'audio/ogg',
        howToOpen: 'Open Ogg files in VLC or foobar2000 for playback. Record/edit in Audacity (native export). Convert to MP3/AAC if compatibility needed.'
    },
    {
        ext: 'm4a',
        name: 'MPEG-4 Audio (Apple Lossless or AAC)',
        description: 'M4A is Apple’s container for AAC (lossy) or ALAC (Apple Lossless Audio Codec) audio, the default for iTunes/Apple Music purchases and ripped CDs since 2000s. M4A with AAC offers better quality than MP3 at same bitrate; ALAC provides lossless compression like FLAC but in Apple ecosystem. In 2026, M4A is ubiquitous on iOS/macOS devices, supporting metadata, chapters, and gapless playback for albums. It’s ideal for music libraries synced across Apple devices. Android and Windows support M4A well now. For cross-platform use, many convert M4A to FLAC for lossless archiving.',
        category: 'audio',
        software: ['iTunes', 'Apple Music', 'VLC', 'foobar2000'],
        mimeType: 'audio/mp4',
        howToOpen: 'M4A opens in iTunes/Apple Music natively. VLC plays it universally. Convert ALAC M4A to FLAC using iTunes or XLD on Mac for open archiving.'
    },
    {
        ext: 'wma',
        name: 'Windows Media Audio',
        description: 'WMA (Windows Media Audio) is Microsoft’s lossy/lossless format from late 1990s, once popular for Windows Media Player libraries and DRM-protected music (pre-Apple dominance). WMA offers good quality at low bitrates and lossless variant (WMA Lossless). In 2026, WMA is legacy but still found in old Windows installs, car stereos, and some streaming archives. Modern players support it, but most users convert to MP3/FLAC/AAC for compatibility. Useful for niche archival of early 2000s digital music collections.',
        category: 'audio',
        software: ['Windows Media Player', 'VLC', 'foobar2000'],
        mimeType: 'audio/x-ms-wma',
        howToOpen: 'Play WMA in Windows Media Player or VLC. Convert to MP3 using fre:ac or online tools for broader use.'
    },
    {
        ext: 'wav',
        name: 'Waveform Audio File Format',
        description: 'WAV is the standard uncompressed PCM audio format from Microsoft/IBM in 1991, delivering bit-perfect CD-quality or studio master audio without any compression artifacts. WAV is used for professional recording, editing, sampling, sound effects libraries, and archiving because it preserves every sample exactly — ideal for DAWs, game audio, podcasts, and mastering before final export. In 2026, WAV remains essential despite large sizes; Broadcast Wave variant adds metadata. For musicians and sound designers, WAV is the safe, universal choice for interchange between software like Audacity, Reaper, Pro Tools.',
        category: 'audio',
        software: ['Audacity', 'Adobe Audition', 'VLC', 'Reaper'],
        mimeType: 'audio/wav',
        howToOpen: 'WAV plays in VLC, Windows Media Player, QuickTime. Edit in Audacity (free) or any DAW. Convert to FLAC for compressed archiving without loss.'
    },
    {
        ext: 'mkv',
        name: 'Matroska Video Container',
        description: 'MKV (Matroska Video) is an open, flexible container format since 2002, supporting virtually any video/audio codec (H.264, H.265/HEVC, AV1, VP9), multiple subtitle tracks, chapters, attachments, and menus — making it popular for high-quality movie rips, anime, 4K HDR content, and home media servers in 2026. MKV excels at preserving Blu-ray quality with extras in small packages via efficient codecs like x265. Plex, Jellyfin, and Kodi love MKV for streaming. Drawback: less universal playback on old smart TVs (use VLC). For enthusiasts collecting media libraries, MKV offers unmatched flexibility and future-proofing.',
        category: 'video',
        software: ['VLC Media Player', 'MPC-HC', 'Plex', 'Kodi'],
        mimeType: 'video/x-matroska',
        howToOpen: 'MKV plays perfectly in VLC on any platform. Use MKVToolNix for editing tracks/subtitles. Remux to MP4 if device compatibility needed.'
    },
    {
        ext: 'mov',
        name: 'QuickTime Movie',
        description: 'MOV is Apple’s QuickTime container format since 1990s, commonly used for high-quality video from iPhones, DSLRs, drones, and Final Cut Pro because it supports ProRes, H.264, HEVC, and alpha channels. In 2026, MOV remains standard in professional editing workflows (Final Cut, DaVinci Resolve) for color grading, VFX, and archiving masters. It offers excellent metadata and codec flexibility. Cross-platform support improved via VLC. For Mac/iOS users shooting video, MOV delivers top fidelity before export to MP4 for sharing.',
        category: 'video',
        software: ['QuickTime Player', 'VLC', 'Final Cut Pro', 'DaVinci Resolve'],
        mimeType: 'video/quicktime',
        howToOpen: 'MOV opens natively in QuickTime on Mac. VLC plays MOV universally. Convert to MP4 using HandBrake for broader compatibility.'
    },
    {
        ext: 'wmv',
        name: 'Windows Media Video',
        description: 'WMV is Microsoft’s video format from early 2000s, used for Windows Movie Maker projects, downloaded clips, and early streaming because of good compression and DRM support. In 2026, WMV is legacy but still appears in old corporate training videos, webcam recordings, and Windows backups. Quality is decent for its era but inferior to modern H.265/AV1. VLC plays WMV flawlessly. Convert to MP4 for modern use and archiving.',
        category: 'video',
        software: ['Windows Media Player', 'VLC', 'MPC-HC'],
        mimeType: 'video/x-ms-wmv',
        howToOpen: 'Play WMV in VLC or Windows Media Player. Convert to MP4 using HandBrake or online tools.'
    },
    {
        ext: 'flv',
        name: 'Flash Video',
        description: 'FLV was Adobe Flash’s video container dominant in 2000s for YouTube, streaming sites, and web video before HTML5. In 2026, FLV is obsolete (Flash died 2020), but old archives, tutorials, and game cutscenes still exist in FLV. VLC plays legacy FLV files. Convert to MP4 immediately for preservation as players dwindle.',
        category: 'video',
        software: ['VLC Media Player', 'Adobe Flash Player (legacy)'],
        mimeType: 'video/x-flv',
        howToOpen: 'Use VLC to play old FLV files. Convert to MP4 using FFmpeg or HandBrake for future-proof viewing.'
    },
    {
        ext: '3gp',
        name: '3GPP Mobile Video',
        description: '3GP is an older mobile video format from early 2000s for feature phones and early smartphones, using low-bitrate H.263/MPEG-4 for MMS and small storage. In 2026, 3GP appears in old phone backups and recovered footage. Quality is low by modern standards but nostalgic. VLC supports playback. Convert to MP4 for modern devices.',
        category: 'video',
        software: ['VLC', 'QuickTime (legacy)'],
        mimeType: 'video/3gpp',
        howToOpen: 'Play 3GP in VLC. Convert using HandBrake or online converters.'
    },
    {
        ext: 'webm',
        name: 'WebM Video',
        description: 'WebM is Google’s open, royalty-free video format (VP8/VP9/AV1 codecs in Matroska container) optimized for web since 2010. WebM delivers excellent quality at low bitrates, perfect for YouTube, HTML5 video, and bandwidth-sensitive streaming in 2026. Supports alpha channel and animation. Browsers play WebM natively. Ideal for web devs avoiding licensing fees of H.264.',
        category: 'video',
        software: ['VLC', 'Chrome/Firefox/Edge', 'FFmpeg'],
        mimeType: 'video/webm',
        howToOpen: 'WebM plays in modern browsers and VLC. Edit/remux with MKVToolNix.'
    },
    {
        ext: '7z',
        name: '7-Zip Compressed Archive',
        description: '7Z is the format of 7-Zip (open-source since 2000), offering superior compression ratios (often 30–70% better than ZIP) with AES-256 encryption, solid archiving, and multi-volume support. In 2026, 7Z is popular for software distribution, backups, large file sharing, and torrents because it saves significant space/storage costs. 7-Zip is free and fast. Drawback: slower compression than ZIP on low-end hardware. For power users archiving photos, videos, or games, 7Z maximizes efficiency.',
        category: 'archive',
        software: ['7-Zip', 'PeaZip', 'WinRAR (read support)'],
        mimeType: 'application/x-7z-compressed',
        howToOpen: 'Use 7-Zip (free) to open/extract. Right-click "Extract Here" on Windows. PeaZip is cross-platform alternative.'
    },
    {
        ext: 'tar.gz',
        name: 'Tarball (Gzipped Tar Archive)',
        description: 'TAR.GZ (or .tgz) combines Unix tar archiving with gzip compression, standard for Linux/macOS software distribution, source code bundles, backups, and data sets since 1990s. In 2026, tar.gz remains essential for open-source packages (npm, Python, etc.), server backups, and scientific data. It preserves permissions, symbolic links, and directory structures perfectly. Use tar command or 7-Zip to handle. Great for cross-platform archiving without proprietary lock-in.',
        category: 'archive',
        software: ['7-Zip', 'WinRAR', 'Terminal (tar -xzf)'],
        mimeType: 'application/gzip',
        howToOpen: 'Extract with 7-Zip or command line: tar -xzf file.tar.gz. PeaZip also supports.'
    },
    {
        ext: 'iso',
        name: 'Disk Image File (ISO 9660)',
        description: 'ISO is a disk image format replicating CD/DVD/Blu-ray exactly, including file system and boot sectors. Used for OS installs (Windows, Linux distros), game backups, software archives, and virtual machines since 1988 standard. In 2026, ISO remains primary for downloading Ubuntu, Windows ISOs, retro games, and burning bootable USBs. Mount as virtual drive or burn with Rufus. Essential for system admins and gamers preserving physical media.',
        category: 'archive',
        software: ['Windows Explorer (mount)', 'Daemon Tools', 'PowerISO', 'Rufus'],
        mimeType: 'application/x-iso9660-image',
        howToOpen: 'Double-click to mount in Windows 10/11. Use Daemon Tools or Virtual CloneDrive for older systems. Extract contents with 7-Zip.'
    },
    {
        ext: 'bz2',
        name: 'Bzip2 Compressed File',
        description: 'BZ2 uses bzip2 compression (better ratios than gzip for text/logs) often with tar as .tar.bz2. Common in Linux for source tarballs and large text compression. In 2026, still used in some archives for maximum size reduction on compressible data. Slower than gzip but worth it for big logs or datasets. 7-Zip handles BZ2 natively.',
        category: 'archive',
        software: ['7-Zip', 'WinRAR', 'bunzip2 command'],
        mimeType: 'application/x-bzip2',
        howToOpen: 'Extract with 7-Zip or tar -xjf file.tar.bz2.'
    },
    {
        ext: 'jar',
        name: 'Java Archive',
        description: 'JAR is a ZIP-based package for Java classes, resources, manifests, and metadata — the standard for Java apps, libraries, Minecraft mods, and Android before APK dominance. In 2026, JAR remains core for Java desktop apps, servers (Spring Boot), and modding communities. Executable JARs run with java -jar. Secure signing prevents tampering. For developers, understanding JAR structure aids debugging and packaging.',
        category: 'archive',
        software: ['Java Runtime', '7-Zip (extract)', 'IntelliJ IDEA'],
        mimeType: 'application/java-archive',
        howToOpen: 'Run executable JAR with Java installed. Extract contents like ZIP using 7-Zip.'
    },
    {
        ext: 'html',
        name: 'HyperText Markup Language',
        description: 'HTML is the core language of the web since 1991, defining structure, semantics, and content (headings, paragraphs, links, forms) for browsers to render. In 2026, HTML5 powers every website, PWAs, email templates, and static sites with canvas, video, and accessibility features. Lightweight, human-readable, and SEO-friendly. Developers edit HTML in VS Code; browsers execute it live. Mastering HTML remains foundational for web careers.',
        category: 'code',
        software: ['VS Code', 'Notepad++', 'Any browser'],
        mimeType: 'text/html',
        howToOpen: 'Double-click to open in default browser. Edit in any text/code editor.'
    },
    {
        ext: 'css',
        name: 'Cascading Style Sheets',
        description: 'CSS files style HTML with layouts (Flexbox/Grid), colors, animations, responsive design, and variables. Since 1996, CSS has evolved to CSS3+ with Houdini and container queries in 2026. Essential for beautiful, accessible, performant websites. Tailwind/Bootstrap use CSS heavily. Edit in VS Code with live preview extensions.',
        category: 'code',
        software: ['VS Code', 'Sublime Text', 'Browser DevTools'],
        mimeType: 'text/css',
        howToOpen: 'Link to HTML and open in browser. Edit in code editors.'
    },
    {
        ext: 'java',
        name: 'Java Source Code',
        description: 'JAVA files contain source code for Java programs — object-oriented, platform-independent language powering Android apps, enterprise servers, Minecraft, and big data (Hadoop). In 2026, Java 21+ brings records, pattern matching, virtual threads. Compiled to bytecode (.class). Edit in IntelliJ IDEA or VS Code.',
        category: 'code',
        software: ['IntelliJ IDEA', 'Eclipse', 'VS Code'],
        mimeType: 'text/x-java-source',
        howToOpen: 'Open in IDE to edit/compile. View as text.'
    },
    {
        ext: 'cpp',
        name: 'C++ Source Code',
        description: 'CPP (or .cc, .cxx) files hold C++ code — high-performance language for games (Unreal), systems software, browsers, finance, and embedded. In 2026, C++23 adds modules, ranges. Compiled to executables. Edit in Visual Studio, CLion.',
        category: 'code',
        software: ['Visual Studio', 'CLion', 'VS Code'],
        mimeType: 'text/x-c++src',
        howToOpen: 'Edit in IDEs. Compile with g++/clang.'
    },
    {
        ext: 'cs',
        name: 'C# Source Code',
        description: 'CS files are for C# — Microsoft’s modern language for .NET apps, Unity games, Windows software, Azure. In 2026, C# 12+ improves productivity. Compiled to IL. Edit in Visual Studio or Rider.',
        category: 'code',
        software: ['Visual Studio', 'Rider', 'VS Code'],
        mimeType: 'text/x-csharp',
        howToOpen: 'Open in Visual Studio for IntelliSense and debugging.'
    },
    {
        ext: 'php',
        name: 'PHP Hypertext Preprocessor',
        description: 'PHP powers ~70% of websites (WordPress, Laravel, Drupal) for server-side scripting, databases, forms. In 2026, PHP 8.3+ adds JIT, attributes. Easy to learn, vast ecosystem. Edit in VS Code or PhpStorm.',
        category: 'code',
        software: ['VS Code', 'PhpStorm', 'Sublime Text'],
        mimeType: 'application/x-httpd-php',
        howToOpen: 'Edit in code editor; run on server or XAMPP locally.'
    },
    {
        ext: 'sql',
        name: 'Structured Query Language Script',
        description: 'SQL files contain database queries (SELECT, INSERT, CREATE) for MySQL, PostgreSQL, SQLite. Used for schema migrations, reports, backups. In 2026, essential for data analysis, web backends. Edit in DBeaver or VS Code.',
        category: 'database',
        software: ['DBeaver', 'MySQL Workbench', 'pgAdmin', 'VS Code'],
        mimeType: 'application/sql',
        howToOpen: 'Open in DB tools or text editor; execute in database client.'
    },
    {
        ext: 'accdb',
        name: 'Microsoft Access Database',
        description: 'ACCDB is modern Access format since 2007, storing tables, queries, forms, reports, VBA for small business databases, inventory, CRM. In 2026, still used in offices despite cloud shift. Supports larger sizes than MDB.',
        category: 'database',
        software: ['Microsoft Access', 'LibreOffice Base'],
        mimeType: 'application/msaccess',
        howToOpen: 'Open in Microsoft Access. Convert to SQL if migrating.'
    },
    {
        ext: 'mdb',
        name: 'Legacy Microsoft Access Database',
        description: 'MDB is older Access format (Jet engine), common in legacy apps and 90s/2000s files. In 2026, still encountered in archives. Convert to ACCDB or SQL for modern use.',
        category: 'database',
        software: ['Microsoft Access', 'MDB Viewer Plus'],
        mimeType: 'application/x-msaccess',
        howToOpen: 'Open in Access (read-only in newer versions without legacy support).'
    },
    {
        ext: 'bat',
        name: 'Windows Batch File',
        description: 'BAT files contain DOS commands for automation, scripts, installers on Windows. Simple but powerful for tasks like backups, restarts. In 2026, still used in IT, though PowerShell preferred.',
        category: 'system',
        software: ['Notepad', 'VS Code'],
        mimeType: 'application/x-bat',
        howToOpen: 'Double-click to run; edit in text editor. Caution: malicious potential.'
    },
    {
        ext: 'sh',
        name: 'Unix Shell Script',
        description: 'SH/BASH scripts automate tasks on Linux/macOS (installs, backups, cron jobs). In 2026, essential for DevOps, servers, Raspberry Pi. Edit in VS Code or vim.',
        category: 'system',
        software: ['Terminal', 'VS Code'],
        mimeType: 'application/x-sh',
        howToOpen: 'Run with bash script.sh; edit in any text editor.'
    },
    {
        ext: 'dll',
        name: 'Dynamic Link Library',
        description: 'DLL files contain reusable code/functions for Windows apps. In 2026, core to software (games, drivers, plugins). Missing DLL errors common — reinstall or scan for malware.',
        category: 'system',
        software: ['Windows OS'],
        mimeType: 'application/x-msdownload',
        howToOpen: 'Loaded by programs; do not run directly. Inspect with Dependency Walker.'
    },
    {
        ext: 'msi',
        name: 'Windows Installer Package',
        description: 'MSI is Microsoft’s installer format for software deployment, with repair/uninstall logic. In 2026, standard for enterprise apps, drivers. Run to install; extract with 7-Zip if needed.',
        category: 'system',
        software: ['Windows Installer'],
        mimeType: 'application/x-msi',
        howToOpen: 'Double-click to install. Extract contents with 7-Zip.'
    },
    {
        ext: 'pdf',
        name: 'Portable Document Format',
        description: 'PDF is Adobe’s universal document format since 1993, preserving layout, fonts, images across devices for contracts, ebooks, invoices, research papers. In 2026, PDF/A for archiving, PDF/UA for accessibility. Edit with Acrobat or free tools like LibreOffice Draw.',
        category: 'document',
        software: ['Adobe Acrobat', 'Chrome', 'Edge', 'Foxit Reader'],
        mimeType: 'application/pdf',
        howToOpen: 'Open in browser or Acrobat Reader. Fill forms, sign digitally.'
    },
    {
        ext: 'rtf',
        name: 'Rich Text Format',
        description: 'RTF is Microsoft’s cross-platform text format (1987) supporting bold, italics, tables, images — more formatted than TXT but simpler than DOCX. In 2026, used for compatibility across WordPad, TextEdit, emails.',
        category: 'document',
        software: ['WordPad', 'Microsoft Word', 'LibreOffice'],
        mimeType: 'application/rtf',
        howToOpen: 'Open in WordPad (Windows) or TextEdit (Mac). Convert to DOCX if needed.'
    },
    {
        ext: 'pages',
        name: 'Apple Pages Document',
        description: 'PAGES is Apple’s word processor format for macOS/iOS, with beautiful templates, collaboration, export to PDF/Word. In 2026, popular in education, creative writing. Open in Pages or export for cross-platform.',
        category: 'document',
        software: ['Apple Pages', 'iCloud'],
        mimeType: 'application/vnd.apple.pages',
        howToOpen: 'Open in Pages app. Export to PDF/DOCX for sharing.'
    },
    {
        ext: 'pptx',
        name: 'PowerPoint Open XML Presentation',
        description: 'PPTX is Microsoft’s modern slideshow format with slides, animations, transitions, embedded media. In 2026, standard for business, education, conferences. Edit in PowerPoint or Google Slides.',
        category: 'document',
        software: ['Microsoft PowerPoint', 'Google Slides', 'LibreOffice Impress'],
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        howToOpen: 'Open in PowerPoint. Upload to Google Slides for free editing.'
    },
    {
        ext: 'key',
        name: 'Apple Keynote Presentation',
        description: 'KEY is Apple’s presentation format with cinematic transitions, themes, collaboration. In 2026, favored for Mac/iOS users in creative fields. Export to PPTX/PDF for Windows sharing.',
        category: 'document',
        software: ['Apple Keynote'],
        mimeType: 'application/vnd.apple.keynote',
        howToOpen: 'Open in Keynote. Export to PPTX for cross-platform.'
    },
    {
        ext: 'ods',
        name: 'OpenDocument Spreadsheet',
        description: 'ODS is open-standard spreadsheet format (LibreOffice Calc default), supporting formulas, charts, macros. In 2026, used for vendor-neutral data work, government docs. Compatible with Excel via import/export.',
        category: 'database',
        software: ['LibreOffice Calc', 'OpenOffice Calc'],
        mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
        howToOpen: 'Open in LibreOffice Calc. Import to Excel/Google Sheets.'
    },
    {
        ext: 'numbers',
        name: 'Apple Numbers Spreadsheet',
        description: 'NUMBERS is Apple’s spreadsheet app format with canvas-style layout, charts, formulas. In 2026, great for visual reports on Mac/iOS. Export to XLSX for sharing.',
        category: 'database',
        software: ['Apple Numbers'],
        mimeType: 'application/vnd.apple.numbers',
        howToOpen: 'Open in Numbers app. Export to Excel format.'
    },
    {
        ext: 'epub',
        name: 'Electronic Publication (eBook)',
        description: 'EPUB is open eBook standard since 2007, reflowable text, images, TOC for readers like Kindle alternatives, Apple Books, Google Play. In 2026, EPUB3 adds multimedia, accessibility. Ideal for novels, textbooks.',
        category: 'document',
        software: ['Calibre', 'Apple Books', 'Adobe Digital Editions'],
        mimeType: 'application/epub+zip',
        howToOpen: 'Open in Calibre (free manager/reader) or dedicated e-readers.'
    },
    {
        ext: 'mobi',
        name: 'Mobipocket eBook',
        description: 'MOBI/AZW is Amazon’s legacy Kindle format (pre-KF8), still used for older ebooks. In 2026, convert to AZW3/EPUB for modern Kindles. Calibre handles conversion seamlessly.',
        category: 'document',
        software: ['Calibre', 'Kindle app'],
        mimeType: 'application/x-mobipocket-ebook',
        howToOpen: 'Send to Kindle or use Calibre viewer.'
    },
    {
        ext: 'azw3',
        name: 'Amazon Kindle Format 8',
        description: 'AZW3 (KF8) is modern Kindle format with better typography, HTML5 support. In 2026, standard for Amazon ebooks. Calibre converts EPUB to AZW3 for sideloading.',
        category: 'document',
        software: ['Kindle app', 'Calibre'],
        mimeType: 'application/vnd.amazon.ebook',
        howToOpen: 'Open on Kindle devices/apps or Calibre.'
    },
    {
        ext: 'txt',
        name: 'Plain Text File',
        description: 'TXT is the simplest, most universal format — pure ASCII/UTF-8 text with no formatting. In 2026, used for logs, configs, notes, scripts. Opens everywhere, future-proof, tiny size.',
        category: 'document',
        software: ['Notepad', 'TextEdit', 'VS Code'],
        mimeType: 'text/plain',
        howToOpen: 'Open in any text editor on any OS.'
    },
    {
        ext: 'log',
        name: 'Log File',
        description: 'LOG files record events, errors, system activity for debugging (web servers, apps, Windows Event Viewer). In 2026, crucial for IT troubleshooting. View with Notepad++ for large files.',
        category: 'document',
        software: ['Notepad++', 'VS Code', 'LogExpert'],
        mimeType: 'text/plain',
        howToOpen: 'Open in text editor. Use tail command on Linux for live view.'
    },
    {
        ext: 'ini',
        name: 'Initialization Configuration File',
        description: 'INI files store settings in key=value pairs for apps, games, Windows configs. Simple, human-editable. In 2026, still common despite JSON/YAML preference in new software.',
        category: 'code',
        software: ['Notepad', 'VS Code'],
        mimeType: 'text/plain',
        howToOpen: 'Edit in any text editor. Backup before changes.'
    },
    {
        ext: 'xml',
        name: 'Extensible Markup Language',
        description: 'XML is structured, tagged data format for configs, RSS, Office files, Android manifests. In 2026, used in web services (SOAP), sitemaps, SVG. Validate with schemas.',
        category: 'code',
        software: ['VS Code', 'Notepad++', 'XML Notepad'],
        mimeType: 'application/xml',
        howToOpen: 'Open in browser (formatted) or code editor.'
    },
    {
        ext: 'yaml',
        name: 'YAML Ain\'t Markup Language',
        description: 'YAML is human-readable data serialization (configs for Docker, Kubernetes, GitHub Actions). In 2026, preferred over JSON for readability in DevOps. Indentation-sensitive.',
        category: 'code',
        software: ['VS Code', 'Online YAML validators'],
        mimeType: 'text/yaml',
        howToOpen: 'Edit in VS Code with YAML extension for linting.'
    },
    {
        ext: 'toml',
        name: 'Tom\'s Obvious Minimal Language',
        description: 'TOML is minimal config format (used in Rust Cargo, Hugo). Clean, type-safe alternative to INI/YAML. In 2026, growing in modern projects for simplicity.',
        category: 'code',
        software: ['VS Code'],
        mimeType: 'application/toml',
        howToOpen: 'Open in text editor with TOML syntax highlighting.'
    },
    {
        ext: 'go',
        name: 'Go Source Code',
        description: 'GO files are for Go (Golang) — efficient, concurrent language from Google for servers, tools, cloud (Kubernetes, Docker). In 2026, hugely popular for backend/microservices.',
        category: 'code',
        software: ['VS Code', 'GoLand'],
        mimeType: 'text/x-go',
        howToOpen: 'Edit in VS Code with Go extension.'
    },
    {
        ext: 'rs',
        name: 'Rust Source Code',
        description: 'RS files contain Rust code — safe, fast systems language for CLI, web (WASM), embedded. In 2026, exploding in popularity for performance-critical software without GC.',
        category: 'code',
        software: ['VS Code', 'IntelliJ Rust'],
        mimeType: 'text/x-rustsrc',
        howToOpen: 'Edit in VS Code with rust-analyzer.'
    },
    {
        ext: 'ts',
        name: 'TypeScript File',
        description: 'TS adds types to JavaScript for large-scale web/apps (React, Angular, Node). In 2026, TypeScript dominates frontend/backend development for reliability.',
        category: 'code',
        software: ['VS Code'],
        mimeType: 'application/typescript',
        howToOpen: 'Edit in VS Code; compiles to JS.'
    },
    {
        ext: 'vue',
        name: 'Vue.js Single File Component',
        description: 'VUE files combine HTML/CSS/JS for Vue components. In 2026, Vue remains popular for progressive, performant UIs.',
        category: 'code',
        software: ['VS Code', 'Volar extension'],
        mimeType: 'text/vue',
        howToOpen: 'Edit in VS Code with Vue support.'
    },
    {
        ext: 'swift',
        name: 'Swift Source Code',
        description: 'SWIFT is Apple’s modern language for iOS/macOS/watchOS apps since 2014. Safe, fast, open-source. In 2026, dominant for Apple ecosystem development.',
        category: 'code',
        software: ['Xcode', 'VS Code'],
        mimeType: 'text/x-swift',
        howToOpen: 'Open in Xcode for full features.'
    },
    {
        ext: 'kt',
        name: 'Kotlin Source Code',
        description: 'KT files are for Kotlin — concise, null-safe JVM/Android language. In 2026, official for Android dev, interoperable with Java.',
        category: 'code',
        software: ['Android Studio', 'IntelliJ IDEA'],
        mimeType: 'text/x-kotlin',
        howToOpen: 'Edit in Android Studio.'
    },
    {
        ext: 'dart',
        name: 'Dart Source Code',
        description: 'DART powers Flutter for cross-platform mobile/web/desktop apps. In 2026, Flutter’s hot reload and widgets make it favorite for startups.',
        category: 'code',
        software: ['VS Code', 'Android Studio'],
        mimeType: 'text/x-dart',
        howToOpen: 'Edit in VS Code with Flutter SDK.'
    },
    {
        ext: 'ps1',
        name: 'PowerShell Script',
        description: 'PS1 files are PowerShell scripts for advanced Windows automation, cloud (Azure), sysadmin tasks. In 2026, PowerShell 7+ is cross-platform.',
        category: 'system',
        software: ['PowerShell ISE', 'VS Code'],
        mimeType: 'text/plain',
        howToOpen: 'Run with powershell.exe -File script.ps1; edit in VS Code.'
    },
    {
        ext: 'cmd',
        name: 'Windows Command Script',
        description: 'CMD files are batch scripts similar to BAT but for cmd.exe. Used for simple Windows tasks.',
        category: 'system',
        software: ['Notepad'],
        mimeType: 'application/x-cmd',
        howToOpen: 'Double-click to run; edit in Notepad.'
    },
    {
        ext: 'reg',
        name: 'Windows Registry File',
        description: 'REG files import/export registry keys for tweaks, fixes. Caution: can harm system if wrong.',
        category: 'system',
        software: ['Notepad'],
        mimeType: 'text/plain',
        howToOpen: 'Double-click to merge; edit as text first.'
    },
    {
        ext: 'deb',
        name: 'Debian Package',
        description: 'DEB is Linux package format for Ubuntu/Debian software installs. In 2026, common for apps, drivers.',
        category: 'system',
        software: ['dpkg', 'GDebi'],
        mimeType: 'application/vnd.debian.binary-package',
        howToOpen: 'Install with sudo dpkg -i file.deb or GDebi GUI.'
    },
    {
        ext: 'rpm',
        name: 'Red Hat Package Manager',
        description: 'RPM for Fedora, CentOS, SUSE software packages. Similar to DEB but different ecosystem.',
        category: 'system',
        software: ['rpm command', 'DNF/YUM'],
        mimeType: 'application/x-rpm',
        howToOpen: 'Install with sudo rpm -i file.rpm.'
    },
    {
        ext: 'app',
        name: 'macOS Application Bundle',
        description: 'APP is macOS app package (folder disguised as file) containing executable, resources.',
        category: 'system',
        software: ['macOS Finder'],
        mimeType: 'application/x-apple-application',
        howToOpen: 'Double-click to launch; right-click Show Package Contents to inspect.'
    },
    {
        ext: 'dylib',
        name: 'macOS Dynamic Library',
        description: 'DYLIB are shared libraries for macOS apps, similar to DLL on Windows.',
        category: 'system',
        software: ['macOS'],
        mimeType: 'application/x-mach-binary',
        howToOpen: 'Loaded by apps; inspect with otool.'
    },
    {
        ext: 'sqlite',
        name: 'SQLite Database File',
        description: 'SQLITE is lightweight, serverless database embedded in apps, browsers, phones. In 2026, powers countless mobile/desktop apps.',
        category: 'database',
        software: ['DB Browser for SQLite', 'DBeaver'],
        mimeType: 'application/x-sqlite3',
        howToOpen: 'Open in DB Browser for SQLite for GUI management.'
    },
    {
        ext: 'db',
        name: 'Generic Database File',
        description: 'DB often used for SQLite or other small databases in apps/games.',
        category: 'database',
        software: ['DB Browser for SQLite'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Try opening in SQLite tools.'
    },
    {
        ext: 'jsonl',
        name: 'JSON Lines File',
        description: 'JSONL (newline-delimited JSON) for big data, logs, ML datasets — one JSON object per line. Easier streaming than large JSON.',
        category: 'database',
        software: ['VS Code', 'jq tool'],
        mimeType: 'application/jsonl',
        howToOpen: 'Open in text editor; process with jq.'
    },
    {
        ext: 'parquet',
        name: 'Apache Parquet File',
        description: 'PARQUET is columnar storage for big data (Spark, Pandas), efficient compression/querying. In 2026, standard in data lakes.',
        category: 'database',
        software: ['Pandas', 'Dask'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Read with Python libraries (pyarrow).'
    },
    {
        ext: 'hdf5',
        name: 'Hierarchical Data Format version 5',
        description: 'HDF5 for large scientific datasets (arrays, metadata) in physics, biology, ML. Supports compression, chunking.',
        category: 'database',
        software: ['HDFView', 'Python h5py'],
        mimeType: 'application/x-hdf5',
        howToOpen: 'Open in HDFView or Python.'
    },
    {
        ext: 'bak',
        name: 'Backup File',
        description: 'BAK is generic backup extension (configs, databases, documents). Rename to original to restore.',
        category: 'archive',
        software: ['Depends on original'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Rename extension to original and open.'
    },
    {
        ext: 'old',
        name: 'Old/Archived Version File',
        description: 'OLD often appended to replaced files (config.old). Useful for rollback.',
        category: 'system',
        software: ['Text editor or original app'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Rename or open based on original type.'
    },
    {
        ext: 'tmp',
        name: 'Temporary File',
        description: 'TMP files created during operations (installs, edits). Usually safe to delete after process ends.',
        category: 'system',
        software: ['N/A'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Depends; often deleted automatically.'
    },
    {
        ext: 'crdownload',
        name: 'Chrome Partial Download',
        description: 'CRDOWNLOAD is Chrome’s temp extension during downloads. Renames to real extension when complete.',
        category: 'system',
        software: ['Google Chrome'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Wait for download finish or resume.'
    },
    {
        ext: 'part',
        name: 'Partial Download File',
        description: 'PART used by download managers (Firefox, IDM) for incomplete files. Continues on resume.',
        category: 'system',
        software: ['Browser/Download manager'],
        mimeType: 'application/octet-stream',
        howToOpen: 'Resume download; rename after completion.'
    }
];
