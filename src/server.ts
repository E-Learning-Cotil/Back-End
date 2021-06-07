import { InternalError } from './errors/InternalError';
require("dotenv").config();
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use((req, res, next) => {
    const err = new InternalError("Rota não encontrada", 404);
    next(err);
});

app.use((error, req, res, next) => {
    const err = new InternalError(null, error.status, error.message);

    res
        .status(err.status)
        .json({
            error: err.message,
            description: err.description
        });
});

app.listen(process.env.PORT, () => console.log("Server is running..."));