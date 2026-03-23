"use client";

import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';

// Dynamically import all tools with SSR disabled
const WordCounter = dynamic(() => import('@/tools/text/WordCounter'), { ssr: false });
// Developer Tools
const Base64Tool = dynamic(() => import('@/tools/developer/Base64Tool'), { ssr: false });
const JsonFormatterTool = dynamic(() => import('@/tools/developer/JsonFormatterTool'), { ssr: false });
const JsonValidatorTool = dynamic(() => import('@/tools/developer/JsonValidatorTool'), { ssr: false });
const UrlEncoderDecoderTool = dynamic(() => import('@/tools/developer/UrlEncoderDecoderTool'), { ssr: false });
const RegexTesterTool = dynamic(() => import('@/tools/developer/RegexTesterTool'), { ssr: false });
const TimestampConverterTool = dynamic(() => import('@/tools/developer/TimestampConverterTool'), { ssr: false });
const HtmlMinifierTool = dynamic(() => import('@/tools/developer/HtmlMinifierTool'), { ssr: false });
const CssMinifierTool = dynamic(() => import('@/tools/developer/CssMinifierTool'), { ssr: false });
const JsMinifierTool = dynamic(() => import('@/tools/developer/JsMinifierTool'), { ssr: false });
const JwtDecoderTool = dynamic(() => import('@/tools/developer/JwtDecoderTool'), { ssr: false });

// Text Tools
const CharacterCounterTool = dynamic(() => import('@/tools/text/CharacterCounterTool'), { ssr: false });
const CaseConverterTool = dynamic(() => import('@/tools/text/CaseConverterTool'), { ssr: false });
const RemoveDuplicateLinesTool = dynamic(() => import('@/tools/text/RemoveDuplicateLinesTool'), { ssr: false });
const SortTextLinesTool = dynamic(() => import('@/tools/text/SortTextLinesTool'), { ssr: false });
const TextDiffCheckerTool = dynamic(() => import('@/tools/text/TextDiffCheckerTool'), { ssr: false });
const PngToJpgTool = dynamic(() => import('@/tools/image/PngToJpgTool'), { ssr: false });
const AgeCalculatorTool = dynamic(() => import('@/tools/calculators/AgeCalculatorTool'), { ssr: false });
const PercentageCalculatorTool = dynamic(() => import('@/tools/calculators/PercentageCalculatorTool'), { ssr: false });
const LoanEmiCalculatorTool = dynamic(() => import('@/tools/calculators/LoanEmiCalculatorTool'), { ssr: false });
const BmiCalculatorTool = dynamic(() => import('@/tools/calculators/BmiCalculatorTool'), { ssr: false });
const GpaCalculatorTool = dynamic(() => import('@/tools/calculators/GpaCalculatorTool'), { ssr: false });
const DateDifferenceCalculatorTool = dynamic(() => import('@/tools/calculators/DateDifferenceCalculatorTool'), { ssr: false });
const TimeDurationCalculatorTool = dynamic(() => import('@/tools/calculators/TimeDurationCalculatorTool'), { ssr: false });
const DiscountCalculatorTool = dynamic(() => import('@/tools/calculators/DiscountCalculatorTool'), { ssr: false });
const JpgToPngTool = dynamic(() => import('@/tools/image/JpgToPngTool'), { ssr: false });
const ImageToPdfTool = dynamic(() => import('@/tools/image/ImageToPdfTool'), { ssr: false });
const CompressImageTool = dynamic(() => import('@/tools/image/CompressImageTool'), { ssr: false });
const ResizeImageTool = dynamic(() => import('@/tools/image/ResizeImageTool'), { ssr: false });
const WebpToJpgTool = dynamic(() => import('@/tools/image/WebpToJpgTool'), { ssr: false });
const HeicToJpgTool = dynamic(() => import('@/tools/image/HeicToJpgTool'), { ssr: false });
const CropImageTool = dynamic(() => import('@/tools/image/CropImageTool'), { ssr: false });
const ImageWatermarkTool = dynamic(() => import('@/tools/image/ImageWatermarkTool'), { ssr: false });
const ScreenshotToPdfTool = dynamic(() => import('@/tools/image/ScreenshotToPdfTool'), { ssr: false });
const PdfToJpgTool = dynamic(() => import('@/tools/image/PdfToJpgTool'), { ssr: false });
const BackgroundRemoverTool = dynamic(() => import('@/tools/image/BackgroundRemoverTool'), { ssr: false });
const MergePdfTool = dynamic(() => import('@/tools/pdf/MergePdfTool'), { ssr: false });
const SplitPdfTool = dynamic(() => import('@/tools/pdf/SplitPdfTool'), { ssr: false });
const RotatePdfTool = dynamic(() => import('@/tools/pdf/RotatePdfTool'), { ssr: false });
const CompressPdfTool = dynamic(() => import('@/tools/pdf/CompressPdfTool'), { ssr: false });
const AddWatermarkToPdfTool = dynamic(() => import('@/tools/pdf/AddWatermarkToPdfTool'), { ssr: false });
const UnlockPdfTool = dynamic(() => import('@/tools/pdf/UnlockPdfTool'), { ssr: false });
const ProtectPdfTool = dynamic(() => import('@/tools/pdf/ProtectPdfTool'), { ssr: false });
const PdfToWordTool = dynamic(() => import('@/tools/pdf/PdfToWordTool'), { ssr: false });
const WordToPdfTool = dynamic(() => import('@/tools/pdf/WordToPdfTool'), { ssr: false });
const ExcelToPdfTool = dynamic(() => import('@/tools/pdf/ExcelToPdfTool'), { ssr: false });
const PowerpointToPdfTool = dynamic(() => import('@/tools/pdf/PowerpointToPdfTool'), { ssr: false });

// Generators
const QrCodeGeneratorTool = dynamic(() => import('@/tools/generators/QrCodeGeneratorTool'), { ssr: false });
const BarcodeGeneratorTool = dynamic(() => import('@/tools/generators/BarcodeGeneratorTool'), { ssr: false });
const UuidGeneratorTool = dynamic(() => import('@/tools/generators/UuidGeneratorTool'), { ssr: false });
const SlugGeneratorTool = dynamic(() => import('@/tools/generators/SlugGeneratorTool'), { ssr: false });
const FakeDataGeneratorTool = dynamic(() => import('@/tools/generators/FakeDataGeneratorTool'), { ssr: false });
const PasswordGeneratorTool = dynamic(() => import('@/tools/generators/PasswordGeneratorTool'), { ssr: false });
const UsernameGeneratorTool = dynamic(() => import('@/tools/generators/UsernameGeneratorTool'), { ssr: false });
const RandomTextGeneratorTool = dynamic(() => import('@/tools/generators/RandomTextGeneratorTool'), { ssr: false });
const LoremIpsumGeneratorTool = dynamic(() => import('@/tools/generators/LoremIpsumGeneratorTool'), { ssr: false });

// Data Conversion Tools (Serverless)
const JsonToCsvTool = dynamic(() => import('@/tools/developer/JsonToCsvTool'), { ssr: false });
const CsvToJsonTool = dynamic(() => import('@/tools/developer/CsvToJsonTool'), { ssr: false });
const YamlToJsonTool = dynamic(() => import('@/tools/developer/YamlToJsonTool'), { ssr: false });
const JsonToYamlTool = dynamic(() => import('@/tools/developer/JsonToYamlTool'), { ssr: false });
const MarkdownToHtmlTool = dynamic(() => import('@/tools/text/MarkdownToHtmlTool'), { ssr: false });
const HtmlToMarkdownTool = dynamic(() => import('@/tools/text/HtmlToMarkdownTool'), { ssr: false });

// Additional Conversion Tools
const JsonToXmlTool = dynamic(() => import('@/tools/developer/JsonToXmlTool'), { ssr: false });
const XmlToJsonTool = dynamic(() => import('@/tools/developer/XmlToJsonTool'), { ssr: false });
const ImageToBase64Tool = dynamic(() => import('@/tools/image/ImageToBase64Tool'), { ssr: false });
const Base64ToImageTool = dynamic(() => import('@/tools/image/Base64ToImageTool'), { ssr: false });
const YamlFormatterTool = dynamic(() => import('@/tools/developer/YamlFormatterTool'), { ssr: false });
const HashGeneratorTool = dynamic(() => import('@/tools/developer/HashGeneratorTool'), { ssr: false });
const UrlEncoderTool = dynamic(() => import('@/tools/developer/UrlEncoderTool'), { ssr: false });
const UnicodeExplorerTool = dynamic(() => import('@/tools/text/UnicodeExplorerTool'), { ssr: false });
const ColorHubTool = dynamic(() => import('@/tools/image/ColorHubTool'), { ssr: false });
const FileEncyclopediaTool = dynamic(() => import('@/tools/discovery/FileEncyclopediaTool'), { ssr: false });
const PromptOptimizerTool = dynamic(() => import('@/tools/ai/PromptOptimizerTool'), { ssr: false });
const YoutubeMetadataTool = dynamic(() => import('@/tools/social/YoutubeMetadataTool'), { ssr: false });
const SocialBioGeneratorTool = dynamic(() => import('@/tools/social/SocialBioGeneratorTool'), { ssr: false });
const PrivacyPolicyGeneratorTool = dynamic(() => import('@/tools/business/PrivacyPolicyGeneratorTool'), { ssr: false });
const TermsAndConditionsGeneratorTool = dynamic(() => import('@/tools/business/TermsAndConditionsGeneratorTool'), { ssr: false });

// SEO Tools
const SitemapUrlCounter = dynamic(() => import('@/tools/seo/SitemapUrlCounter'), { ssr: false });
const SitemapToUrlList = dynamic(() => import('@/tools/seo/SitemapToUrlList'), { ssr: false });
const SitemapValidator = dynamic(() => import('@/tools/seo/SitemapValidator'), { ssr: false });
const SitemapFormatter = dynamic(() => import('@/tools/seo/SitemapFormatter'), { ssr: false });
const SitemapGenerator = dynamic(() => import('@/tools/seo/SitemapGenerator'), { ssr: false });
const IndexNowGenerator = dynamic(() => import('@/tools/seo/IndexNowGenerator'), { ssr: false });


interface ToolRendererProps {
    slug: string;
    toolTitle: string;
}

export function ToolRenderer({ slug, toolTitle }: ToolRendererProps) {
    switch (slug) {
        case 'word-counter':
            return <WordCounter />;
        case 'character-counter':
            return <CharacterCounterTool />;
        case 'case-converter':
            return <CaseConverterTool />;
        case 'remove-duplicate-lines':
            return <RemoveDuplicateLinesTool />;
        case 'sort-text-lines':
            return <SortTextLinesTool />;
        case 'text-diff-checker':
            return <TextDiffCheckerTool />;

        // Developer Tools
        case 'base64-encode-decode':
            return <Base64Tool />;
        case 'json-formatter':
            return <JsonFormatterTool />;
        case 'json-validator':
            return <JsonValidatorTool />;
        case 'url-encoder-decoder':
            return <UrlEncoderDecoderTool />;
        case 'regex-tester':
            return <RegexTesterTool />;
        case 'timestamp-converter':
            return <TimestampConverterTool />;
        case 'html-minifier':
            return <HtmlMinifierTool />;
        case 'css-minifier':
            return <CssMinifierTool />;
        case 'js-minifier':
            return <JsMinifierTool />;
        case 'jwt-decoder':
            return <JwtDecoderTool />;

        // Calculators
        case 'age-calculator':
            return <AgeCalculatorTool />;
        case 'percentage-calculator':
            return <PercentageCalculatorTool />;
        case 'loan-emi-calculator':
            return <LoanEmiCalculatorTool />;
        case 'bmi-calculator':
            return <BmiCalculatorTool />;
        case 'gpa-calculator':
            return <GpaCalculatorTool />;
        case 'date-difference-calculator':
            return <DateDifferenceCalculatorTool />;
        case 'time-duration-calculator':
            return <TimeDurationCalculatorTool />;
        case 'discount-calculator':
            return <DiscountCalculatorTool />;

        // Image Tools
        case 'png-to-jpg':
            return <PngToJpgTool />;
        case 'jpg-to-png':
            return <JpgToPngTool />;
        case 'image-to-pdf':
            return <ImageToPdfTool />;
        case 'compress-image':
            return <CompressImageTool />;
        case 'resize-image':
            return <ResizeImageTool />;
        case 'webp-to-jpg':
            return <WebpToJpgTool />;
        case 'heic-to-jpg':
            return <HeicToJpgTool />;
        case 'crop-image':
            return <CropImageTool />;
        case 'image-watermark':
            return <ImageWatermarkTool />;
        case 'screenshot-to-pdf':
            return <ScreenshotToPdfTool />;
        case 'pdf-to-jpg':
            return <PdfToJpgTool />;
        case 'background-remover':
            return <BackgroundRemoverTool />;
        case 'merge-pdf':
            return <MergePdfTool />;
        case 'split-pdf':
            return <SplitPdfTool />;
        case 'rotate-pdf':
            return <RotatePdfTool />;
        case 'compress-pdf':
            return <CompressPdfTool />;
        case 'add-watermark-to-pdf':
            return <AddWatermarkToPdfTool />;
        case 'unlock-pdf':
            return <UnlockPdfTool />;
        case 'protect-pdf':
            return <ProtectPdfTool />;
        case 'pdf-to-word':
            return <PdfToWordTool />;
        case 'word-to-pdf':
            return <WordToPdfTool />;
        case 'excel-to-pdf':
            return <ExcelToPdfTool />;
        case 'powerpoint-to-pdf':
            return <PowerpointToPdfTool />;

        // Generators
        case 'qr-code-generator':
            return <QrCodeGeneratorTool />;
        case 'barcode-generator':
            return <BarcodeGeneratorTool />;
        case 'uuid-generator':
            return <UuidGeneratorTool />;
        case 'slug-generator':
            return <SlugGeneratorTool />;
        case 'fake-data-generator':
            return <FakeDataGeneratorTool />;
        case 'password-generator':
            return <PasswordGeneratorTool />;
        case 'username-generator':
            return <UsernameGeneratorTool />;
        case 'random-text-generator':
            return <RandomTextGeneratorTool />;
        case 'lorem-ipsum-generator':
            return <LoremIpsumGeneratorTool />;

        // Serverless Conversion Tools
        case 'json-to-csv':
            return <JsonToCsvTool />;
        case 'csv-to-json':
            return <CsvToJsonTool />;
        case 'yaml-to-json':
            return <YamlToJsonTool />;
        case 'json-to-yaml':
            return <JsonToYamlTool />;
        case 'markdown-to-html':
            return <MarkdownToHtmlTool />;
        case 'html-to-markdown':
            return <HtmlToMarkdownTool />;

        // JSON/XML/Base64 Tools
        case 'json-to-xml':
            return <JsonToXmlTool />;
        case 'xml-to-json':
            return <XmlToJsonTool />;
        case 'image-to-base64':
            return <ImageToBase64Tool />;
        case 'base64-to-image':
            return <Base64ToImageTool />;
        case 'yaml-formatter':
            return <YamlFormatterTool />;
        case 'hash-generator':
            return <HashGeneratorTool />;
        case 'url-encoder':
            return <UrlEncoderTool />;
        case 'unicode-explorer':
            return <UnicodeExplorerTool />;
        case 'color-hub':
            return <ColorHubTool />;
        case 'file-encyclopedia':
            return <FileEncyclopediaTool />;
        case 'prompt-optimizer':
            return <PromptOptimizerTool />;
        case 'youtube-metadata':
            return <YoutubeMetadataTool />;
        case 'social-bio-generator':
            return <SocialBioGeneratorTool />;
        case 'privacy-policy-generator':
            return <PrivacyPolicyGeneratorTool />;
        case 'terms-conditions-generator':
            return <TermsAndConditionsGeneratorTool />;

        // SEO Tools
        case 'sitemap-url-counter':
            return <SitemapUrlCounter />;
        case 'sitemap-to-url-list':
            return <SitemapToUrlList />;
        case 'sitemap-validator':
            return <SitemapValidator />;
        case 'sitemap-formatter':
            return <SitemapFormatter />;
        case 'sitemap-generator':
            return <SitemapGenerator />;
        case 'indexnow-generator':
            return <IndexNowGenerator />;

        default:
            return (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
                    <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary animate-pulse">
                        <span className="text-3xl font-black italic">!</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Interface Coming Soon</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We are currently building the specialized interface for <strong>{toolTitle}</strong>.
                            Stay tuned for a high-performance experience.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Notify Me
                    </button>
                </div>
            );
    }
}
