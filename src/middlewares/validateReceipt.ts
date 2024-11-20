import { Request, Response, NextFunction } from 'express';
import { Receipt } from '../types';

export function validateReceipt(req: Request, res: Response, next: NextFunction): void {
    const receipt: Receipt = req.body;

    if (
        typeof receipt.retailer === 'string' &&
        typeof receipt.purchaseDate === 'string' &&
        isValidDate(receipt.purchaseDate) &&
        typeof receipt.purchaseTime === 'string' &&
        isValidTime(receipt.purchaseTime) &&
        Array.isArray(receipt.items) &&
        receipt.items.every(item => 
            typeof item.shortDescription === 'string' && 
            typeof item.price === 'string' &&
            isValidFloat(item.price)
        ) &&
        typeof receipt.total === 'string' &&
        isValidFloat(receipt.total)
    ) {
        next();
    } else {
        res.status(400).send({ error: 'Invalid receipt format' });
    }
}

function isValidDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(regex)) return false;
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
};

function isValidFloat(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

function isValidTime(time: string): boolean {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
}
