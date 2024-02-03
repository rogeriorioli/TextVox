import express, { Express } from "express";
import {route} from "./routes";
import cors from 'cors'
const app: Express = express();

app.use(cors("*"))
app.use(express.json())
app.use(route)

app.listen(process.env.PORT || 3333, () => console.log('server running '))