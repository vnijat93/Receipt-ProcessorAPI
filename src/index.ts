import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send({response: 'Welcome to the TypeScript Express API!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
