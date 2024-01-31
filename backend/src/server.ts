import express, { Express } from "express";
import {route} from "./routes";

const app: Express = express();


app.use(express.json())
app.use(route)

app.listen(process.env.PORT || 3333, () => console.log('server running '))