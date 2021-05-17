import {Request, Response} from 'express';
import path from 'path';

async function renderDocs(req:Request, res: Response) {
    return res.sendFile(path.join(__dirname, '..','..','index.html'));
}

export default renderDocs;