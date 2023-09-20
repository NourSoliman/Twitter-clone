// const Users = require(`../Models/Users`)
import Users from '../Models/Users'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {Request , Response , NextFunction} from 'express'
import { setCookie } from 'nookies';

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const existEmail = await Users.findOne({ email });

        // Check if email already exists
        if (existEmail) {
            return res.status(400).json({ error: `This Email Already Exists` });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: `Password and confirmPassword should match` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // If successful, call the next middleware
        return res.status(200).json({ message: 'Registration successful', user });

    } catch (error) {
        console.error(error);

        // Handle unexpected errors with a 500 status code
        res.status(500).json({ error: `Internal Server Error` });
    }
}

async function login(req:Request , res:Response ) {
try{
    const {email , password} = req.body
    if(!email || !password) {
    return res.status(500).json({error:`Please enter your email and password`})
    }
    const userEmail = await Users.findOne({email})
    if(!userEmail) {
        return res.status(500).json({error:`This Email doesn't exit!`})
    }
    const passwordCheck = await bcrypt.compare(password , userEmail.password)
    if(!passwordCheck) {
        return res.status(500).json({error:`Please enter a valid password`})
    }
    const token = jwt.sign({
        firstName:userEmail.firstName,
        email:userEmail.email,
    },
    process.env.JWT_SECRET,
    {expiresIn:"24h"}
    )
    res.cookie("token",token,{
        maxAge:24*60*60*1000,
        httpOnly:true,
        secure:false,
    })
    // setCookie({res} , `token`,token,{
    //     maxAge: 24 * 60 * 60, 
    //     path: '/', 
    //     httpOnly: true,
    //     secure: false, //i will change to true if i used HTTPS
    // })
    return res.status(201).json({message:`Login Successfully`, token})
}catch(error){
    console.log(error)
res.status(500).json({error:`Enternal server error`})
}
}

//GET ALL USERS
async function getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.params.page as string) || 1;
      console.log(page,`page before skip`)
      // Get the requested page number from the query parameters, default to page 1 if not provided
      const usersPerPage = 10; // Number of users to show per page
  
      // Calculate the skip value based on the page number and usersPerPage
      const skip = (page - 1) * usersPerPage;
      const users = await Users.find({})
        .skip(skip) // Skip the appropriate number of documents
        .limit(usersPerPage); // Limit the number of documents returned per page
  
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Internal Server Error` });
    }
  }
  
module.exports={
    register,
    login,
    getAllUsers,
}