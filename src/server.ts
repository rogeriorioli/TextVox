import express, { Express } from "express";
import {route} from "./routes";
import cors from 'cors'
import path from "path";
import 'dotenv/config'
const app: Express = express();
const tmpFolder = path.join(__dirname, "../","../", "tmp");
app.use(cors("*"))
app.use(express.static(tmpFolder));

app.use(express.json())
app.use(route)

app.listen(process.env.PORT || 3333, () => console.log('server running '))