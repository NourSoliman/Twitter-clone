// const Users = require(`../Models/Users`)
import Users from '../Models/Users'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { setCookie } from 'nookies';

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const existEmail = await Users.findOne({ email });
        const existfirstName = await Users.findOne({ firstName })
        if (existfirstName) {
            return res.status(400).json({ error: `This Email Already exist` })
        }
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

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ error: `Please enter your email and password` })
        }
        const userEmail = await Users.findOne({ email })
        if (!userEmail) {
            return res.status(500).json({ error: `This Email doesn't exit!` })
        }
        const passwordCheck = await bcrypt.compare(password, userEmail.password)
        if (!passwordCheck) {
            return res.status(500).json({ error: `Please enter a valid password` })
        }
        const token = jwt.sign({
            firstName: userEmail.firstName,
            email: userEmail.email,
            userId: userEmail._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
        })
        // setCookie({res} , `token`,token,{
        //     maxAge: 24 * 60 * 60, 
        //     path: '/', 
        //     httpOnly: true,
        //     secure: false, //i will change to true if i used HTTPS
        // })
        return res.status(201).json({ message: `Login Successfully`, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Enternal server error` })
    }
}

//GET ALL USERS
async function getAllUsers(req: Request, res: Response) {
    try {
        const pageNumber = parseInt(req.params.page, 10) || 1;
        const perPage = 10;
        const skipUsers = (pageNumber - 1) * perPage
        const users = await Users.find({}).skip(skipUsers).limit(perPage)
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: `Internal Server Error` });
    }
}

async function getUserData(req: Request, res: Response) {
    try {
        const { userId } = req.params
        const user = await Users.findById(userId)
        if (!user) {
            return res.status(400).json({ error: `user not exist` })
        }
        const { firstName, lastName, email, profileImage, coverImage, bio, createdAt, followingIds, followerIds } = user
        return res.status(201).send({ firstName, lastName, email, profileImage, coverImage, bio, createdAt, followingIds, followerIds })
    } catch (error) {
        res.status(500).json({ error: `Eternal server error` })
    }
}
//CHANGE USER PROFILE INFOS
async function updateUserField(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const { bio, firstName, profileImage, coverImage } = req.body;
        if (!bio || !firstName) {
            return res.status(400).json({ error: `Please fill the empty inputs!` })
        }
        if (firstName) {
            const existingUser = await Users.findOne({ firstName, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ error: `This first name is already in use by another user` });
            }
        }
        const update: { [key: string]: any } = {};

        if (bio) {
            update.bio = bio;
        }
        if (profileImage) {
            update.profileImage = profileImage;
        }
        if (coverImage) {
            update.coverImage = coverImage;
        }
        if (firstName) {
            update.firstName = firstName;
        }
        const user = await Users.findByIdAndUpdate(userId, update, { new: true });

        if (!user) {
            return res.status(404).json({ error: `User not found` });
        }

        return res.status(201).json({ message: `Updated successfully.`, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error` });
    }
}

module.exports = {
    register,
    login,
    getAllUsers,
    getUserData,
    updateUserField,
}