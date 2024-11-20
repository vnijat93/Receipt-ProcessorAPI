import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Receipt, Item, ProcessedReceipt } from './types';

export async function PostReciptsProcess(req: Request, res: Response): Promise<ProcessedReceipt> {
    const receipt: Receipt = req.body;
    const points = await calculatePoints(receipt);
    const id = uuidv4();
    console.log(`Receipt ID: ${id}, Points: ${points}`);
    return { id, receipt, points };
}

export async function calculatePoints(receipt: Receipt): Promise<number> {
    let points = 0;
    points += await retailerNamePoints(receipt.retailer);
    points += await dollarAmountPoints(receipt.total);
    points += await itemsPoints(receipt.items);
    points += await descriptionLengthPoints(receipt.items);
    points += await oddDayPoints(receipt.purchaseDate);
    points += await timeOfPurchasePoints(receipt.purchaseTime);
    return points;
}

export async function retailerNamePoints(retailer: string): Promise<number> {
    let points = 0;
    for (let char of retailer) {
        if (char.match(/[a-z0-9]/i)) {
            points++;
        }
    }
    return points;
}

export async function dollarAmountPoints(total: string): Promise<number> {
    let points = 0;
    const totalAmount = parseFloat(total);
    if (totalAmount % 1 === 0) {
        points += 50;;
    }
    if (totalAmount % 0.25 === 0) {
        points += 25;
    }
    return points;
}

export async function itemsPoints(items: Item[]): Promise<number> {
    let points = 0;
    const itemCount = items.length;
    points += Math.floor(itemCount / 2) * 5;
    return points;
}

export async function descriptionLengthPoints(items: Item[]): Promise<number> {
    let points = 0;
    items.forEach((item) => {
        const descriptionLength = item.shortDescription.trim().length;
        if (descriptionLength % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });
    return points;
}

export async function oddDayPoints(purchaseDate: string): Promise<number> {
    let points = 0;
    const date = new Date(purchaseDate);
    const day = date.getDate();
    if (day % 2 !== 0) {
        points += 6;
    }
    return points;
}

export async function timeOfPurchasePoints(purchaseTime: string): Promise<number> {
    let points = 0;
    const [hours, minutes] = purchaseTime.split(':').map(Number);

    if ((hours === 14) || (hours === 15 && minutes === 0)) {
        points += 10;
    }
    return points;
}
