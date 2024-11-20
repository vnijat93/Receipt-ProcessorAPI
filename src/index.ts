import express, { Request, Response } from 'express';
import { PostReciptsProcess } from './postReciptsProcess';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', async (req: Request, res: Response) => {
  res.send({response: 'Welcome to the TypeScript Express API!'});
});

app.post('/receipts/process', async (req: Request, res: Response) => {
    const processedReceipt = await PostReciptsProcess(req, res);
    res.send({id: processedReceipt.id});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
