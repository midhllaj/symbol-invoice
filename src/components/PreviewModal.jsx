import React, { useRef } from 'react';
import InvoicePreview from './InvoicePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

const PreviewModal = ({ data, documentType, onClose }) => {
    const previewRef = useRef();


    const handleDownload = async () => {
        const element = previewRef.current;

        // Create canvas from the element with improved settings
        const canvas = await html2canvas(element, {
            scale: 4, // Higher scale for better quality
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            imageTimeout: 0,
            onclone: (document) => {
                const element = document.getElementById('invoice-preview');
                if (element) {
                    element.style.letterSpacing = '0.5px'; // Ensure letter spacing is applied in clone
                }
            }
        });

        const imgData = canvas.toDataURL('image/png', 1.0);

        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;

        const pdf = new jsPDF('p', 'mm', 'a4', true);
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

        const fileName = documentType === 'invoice' ? 'Invoice' : 'Quotation';
        pdf.save(`${fileName}_${data.quoteNo || 'Draft'}.pdf`);
    };

    const title = documentType === 'invoice' ? 'Invoice Preview' : 'Quotation Preview';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-auto p-6 bg-gray-100 flex justify-center">
                    <div className="transform scale-90 origin-top">
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
