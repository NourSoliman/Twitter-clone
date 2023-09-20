import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const routers = require(`./Routers/api/routers`)
const db = require(`./db`)
require("dotenv").config();
const app = express();

app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use(cookieParser())
app.use(`/api` , routers)
const port = 1997
app.listen( port , () => console.log(`server Running on http://localHost:${port}`))
