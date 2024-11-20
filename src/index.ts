import express, { Request, Response } from 'express';
import { PostReciptsProcess } from './postReciptsProcess';
import { ProcessedReceipt } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

const memoryDB = new Map<string, ProcessedReceipt>();

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/receipts/:id/points', async (req: Request, res: Response) => {
    const receiptId = req.params.id;
    const processedReceipt = memoryDB.get(receiptId);
    if (!processedReceipt) {
        res.status(404).send({error: 'Receipt not found'});
    } else {
        res.status(200);
        res.send({points: processedReceipt.points});
    }
});

app.post('/receipts/process', async (req: Request, res: Response) => {
    const processedReceipt = await PostReciptsProcess(req, res);
    memoryDB.set(processedReceipt.id, processedReceipt);
    res.status(201);
    res.send({id: processedReceipt.id});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
