import mongoose from 'mongoose'



const connectDB = async() => {
    try{
        const DB_URL = `mongodb+srv://E-commerce:6WdBydtDinmJbH3k@e-commerce.oo5paas.mongodb.net/`

    await mongoose.connect(DB_URL)
    console.log(`DB connected`) 
    }catch(error){
        console.log(error)
    }
}
export default connectDB