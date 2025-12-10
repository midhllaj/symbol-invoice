import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import PreviewModal from './components/PreviewModal';
import DocumentTypeSelector from './components/DocumentTypeSelector';
import './App.css';

function App() {
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [documentType, setDocumentType] = useState('quotation');
  const [invoiceData, setInvoiceData] = useState({
    quoteNo: '2180',
    date: new Date().toISOString().split('T')[0],
    company: 'JEEM INTERIOR LLC',
    trn: '',
    poBox: 'UNITED ARAB EMIRATES',
    attention: '',
    subject: 'VISA EXPENSE',
    vatEnabled: true,
    items: [
      { description: 'RTA PERMIT', quantity: 1, unitPrice: 395, amount: 395 },
      { description: 'RTA Deposit', quantity: 1, unitPrice: 3000, amount: 3000 },
      { description: 'Parking Reservation', quantity: 1, unitPrice: 220, amount: 220 },
      { description: 'Parking fee 3 Days', quantity: 1, unitPrice: 620, amount: 620 },
      { description: 'Service charge', quantity: 1, unitPrice: 600, amount: 600 }
    ]
  });

  const handleChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, unitPrice: 0, amount: 0 }
      ]
    }));
  };

  const handleRemoveItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleDocumentTypeSelect = (type) => {
    setDocumentType(type);
    setShowTypeSelector(false);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <InvoiceForm
          data={invoiceData}
          onChange={handleChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onPreview={() => setShowTypeSelector(true)}
          onDownload={() => setShowTypeSelector(true)}
        />

        {showTypeSelector && (
          <DocumentTypeSelector
            onSelect={handleDocumentTypeSelect}
            onClose={() => setShowTypeSelector(false)}
          />
        )}

        {showPreview && (
          <PreviewModal
            data={invoiceData}
            documentType={documentType}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
