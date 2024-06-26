// import express from 'express';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
const cors = require(`cors`)
const cookieParser = require(`cookie-parser`)
const bodyParser = require(`body-parser`)
const express = require(`express`)
const routers = require(`./Routers/api/routers`)
const db = require(`./db`)
require("dotenv").config();
const app = express();

app.use(bodyParser.json({limit:'5mb'}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
// app.use(cors({
//     origin:process.env.NEXT_APP,
//     credentials:true,
// }))

app.use(cookieParser())
app.use(`/api` , routers)
const port = 1998
app.listen( port , () => console.log(`server Running on http://localHost:${port}`))


