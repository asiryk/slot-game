import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static('./build'));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve('./build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
