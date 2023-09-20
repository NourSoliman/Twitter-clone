import mongoose from 'mongoose'

mongoose.set(`strictQuery` , true)
const DB_URL = `mongodb+srv://E-commerce:6WdBydtDinmJbH3k@e-commerce.oo5paas.mongodb.net/`
mongoose.connect(DB_URL)
.then(()=>console.log(`db connected`)).catch((error)=>console.log(error))