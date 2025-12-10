import React, { forwardRef } from 'react';
import { toWords } from 'number-to-words';

const InvoicePreview = forwardRef(({ data, documentType = 'quotation' }, ref) => {
    // Calculate totals
    const total = data.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const vat = data.vatEnabled ? total * 0.05 : 0;
    const grossTotal = total + vat;

    // Convert number to words
    const numberToWords = (num) => {
        const roundedNum = Math.round(num);
        const words = toWords(roundedNum);
        return words.toUpperCase();
    };

    // Format date to DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const documentTitle = documentType === 'invoice' ? 'INVOICE' : 'QUOTATION';

    return (
        <div className="invoice-preview-container" ref={ref} id="invoice-preview">
            <div className="invoice-header">
                <div className="quotation-title">{documentTitle}</div>
                <div className="company-logo">
                    <img src="/symbol-logo.png" alt="Symbol Advertising" style={{ width: '180px', height: 'auto' }} />
                </div>
            </div>

            <div className="header-grid">
                <div className="header-cell label">{documentType === 'invoice' ? 'Invoice No' : 'Quote No'}</div>
                <div className="header-cell">{data.quoteNo}</div>
                <div className="header-cell label">Date</div>
                <div className="header-cell">{formatDate(data.date)}</div>

                <div className="header-cell label">Company</div>
                <div className="header-cell">{data.company}</div>
                <div className="header-cell label">TRN</div>
                <div className="header-cell">100025361500003</div>

                <div className="header-cell label">PO Box</div>
                <div className="header-cell">{data.poBox}</div>
                <div className="header-cell"></div>
                <div className="header-cell"></div>

                <div className="header-cell label">TRN NO</div>
                <div className="header-cell"></div>
                <div className="header-cell"></div>
                <div className="header-cell"></div>

                <div className="header-cell label">Attention</div>
                <div className="header-cell">{data.attention}</div>
                <div className="header-cell label">Subject:</div>
                <div className="header-cell">{data.subject}</div>
            </div>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th className="col-sl">Sl.<br />No.</th>
                        <th className="col-desc">Description</th>
                        <th className="col-qty">Qty</th>
                        <th className="col-price">Unit<br />Price</th>
                        <th className="col-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} style={{ height: '50px' }}>
                            <td className="col-sl">{index + 1}.</td>
                            <td className="col-desc" style={{ whiteSpace: 'pre-wrap' }}>{item.description}</td>
                            <td className="col-qty">{item.quantity}</td>
                            <td className="col-price">{item.unitPrice}</td>
                            <td className="col-amount">{item.amount}</td>
                        </tr>
                    ))}
                    {/* Fill empty rows to maintain height if needed, or just let it expand */}
                    {Array.from({ length: Math.max(0, 10 - data.items.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} style={{ height: '50px' }}>
                            <td className="col-sl"></td>
                            <td className="col-desc"></td>
                            <td className="col-qty"></td>
                            <td className="col-price"></td>
                            <td className="col-amount"></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="totals-section">
                <tbody>
                    <tr className="totals-row">
                        <td rowSpan="3" style={{ border: 'none', verticalAlign: 'top', width: '60%' }}>
                            <div className="amount-words">
                                Amount in Words DHS :<br />
                                {numberToWords(grossTotal).toUpperCase()} ONLY/-
                            </div>
                            {documentType === 'quotation' && (
                                <div className="payment-terms">
                                    <strong>PAYMENT : ADVANCE PAYMENT</strong><br />
                                    FOR THE BEST QUALITY AND SERVICE, NOW AND ALWAYS
                                </div>
                            )}
                        </td>
                        <td className="totals-label">TOTAL ( AED )</td>
                        <td className="totals-value">{total.toFixed(2)}/-</td>
                    </tr>
                    {data.vatEnabled && (
                        <tr className="totals-row">
                            <td className="totals-label">VAT ( 5.0% )</td>
                            <td className="totals-value">{vat > 0 ? vat.toFixed(2) : '-'}</td>
                        </tr>
                    )}
                    <tr className="totals-row">
                        <td className="totals-label">GROSS TOTAL(AED)</td>
                        <td className="totals-value">{grossTotal.toFixed(2)}/-</td>
                    </tr>
                </tbody>
            </table>

            <div className="footer-section">
                <div className="signature-box">
                    <p>For SYMBOL ADV.</p>
                    <p>ABDUL LATHEIF</p>
                    <div className="email-footer">
                        symboladv66@gmail.com
                    </div>
                </div>
            </div>

            <div className="bottom-logo">SYMBOL ADV.</div>
            <div className="page-number">PAGE 1</div>
            <div className="bottom-bar"></div>
        </div>
    );
});

export default InvoicePreview;
