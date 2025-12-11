import React, { useRef } from 'react';
import InvoicePreview from './InvoicePreview';
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

const PreviewModal = ({ data, documentType, onClose }) => {
    const previewRef = useRef();
    const [scale, setScale] = React.useState(0.9);

    React.useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const padding = 32; // 1rem padding on each side
            const targetWidth = 794; // A4 width in px (approx)
            const availableWidth = windowWidth - padding;

            if (availableWidth < targetWidth) {
                setScale(availableWidth / targetWidth);
            } else {
                setScale(0.9);
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = () => {
        window.print();
    };

    const title = documentType === 'invoice' ? 'Invoice Preview' : 'Quotation Preview';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 md:p-4" onClick={onClose}>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-100 flex justify-center">
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            height: scale < 1 ? `${297 * 3.78 * scale}px` : 'auto' // Adjust height to avoid extra scroll space if scaled
                        }}
                    >
                        <InvoicePreview data={data} documentType={documentType} ref={previewRef} />
                    </div>
                </div>

                <div className="p-4 border-t flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
