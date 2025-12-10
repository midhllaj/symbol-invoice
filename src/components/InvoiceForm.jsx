import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, FileText, Download } from "lucide-react";

const InvoiceForm = ({ data, onChange, onAddItem, onRemoveItem, onPreview, onDownload }) => {
    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        // Auto-calculate amount
        if (field === 'quantity' || field === 'unitPrice') {
            const qty = parseFloat(newItems[index].quantity) || 0;
            const price = parseFloat(newItems[index].unitPrice) || 0;
            newItems[index].amount = (qty * price).toFixed(2);
        }

        onChange('items', newItems);
    };

    return (
        <div className="space-y-6 p-1">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Invoice Generator</h2>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center space-x-2 mr-4">
                        <Switch
                            id="vat-mode"
                            checked={data.vatEnabled}
                            onCheckedChange={(checked) => onChange('vatEnabled', checked)}
                        />
                        <Label htmlFor="vat-mode">VAT: ON / OFF</Label>
                    </div>
                    <Button variant="outline" onClick={onPreview}>
                        <FileText className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button onClick={onDownload}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quoteNo">Quote No</Label>
                                <Input
                                    id="quoteNo"
                                    value={data.quoteNo}
                                    onChange={(e) => onChange('quoteNo', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => onChange('date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={data.subject}
                                onChange={(e) => onChange('subject', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                                id="company"
                                value={data.company}
                                onChange={(e) => onChange('company', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="trn">TRN No</Label>
                                <Input
                                    id="trn"
                                    value={data.trn}
                                    onChange={(e) => onChange('trn', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="attention">Attention</Label>
                                <Input
                                    id="attention"
                                    value={data.attention}
                                    onChange={(e) => onChange('attention', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="poBox">Address / PO Box</Label>
                            <Input
                                id="poBox"
                                value={data.poBox}
                                onChange={(e) => onChange('poBox', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Line Items</CardTitle>
                    <Button variant="secondary" size="sm" onClick={onAddItem}>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1 space-y-2">
                                    {index === 0 && <Label>Description</Label>}
                                    <Input
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    />
                                </div>
                                <div className="w-24 space-y-2">
                                    {index === 0 && <Label>Qty</Label>}
                                    <Input
                                        type="number"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className="w-32 space-y-2">
                                    {index === 0 && <Label>Price</Label>}
                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                    />
                                </div>
                                <div className="w-32 space-y-2">
                                    {index === 0 && <Label>Amount</Label>}
                                    <Input
                                        value={item.amount}
                                        readOnly
                                        className="bg-muted"
                                    />
                                </div>
                                <div className={index === 0 ? "pt-8" : ""}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                        onClick={() => onRemoveItem(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvoiceForm;
