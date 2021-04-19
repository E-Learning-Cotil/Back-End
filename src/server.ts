import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
    return res.json({msg: "Hello World!"});
});

app.listen(3333, () => console.log("Server is running..."));