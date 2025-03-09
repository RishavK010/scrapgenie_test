import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFile = path.join(__dirname, './../data.json');


const readData = () => {
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
}

const writeData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data,null,3),'utf-8')
}
app.get('/', (req,res) => {
    const data = readData();
    res.json(data);
});

app.post('/', (req,res) => {
    const newData = req.body;
    const data = readData();
    console.log(newData);

    const updatedData = [...data, newData];
    writeData(updatedData);

    res.status(201).send('data added succes!');
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
});