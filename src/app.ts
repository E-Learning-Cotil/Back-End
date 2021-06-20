import express, { Application } from 'express';
import cors from 'cors';

import Errors from './errors/errors';
import routes from './routes';
import path from 'path';

class App{
    public express: Application

    public constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.errors();
    }

    private middlewares(): void{
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void{
        this.express.use(routes);
        this.express.use('/chat', express.static(path.resolve(__dirname, '..', 'public')));//TMP
    }

    private errors(): void{
        this.express.use(Errors.notFound);
        this.express.use(Errors.handleAll);
    }
}

export default new App().express;