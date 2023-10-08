
// import {NextRequest , NextResponse} from 'next/server'
// import Users from '../../../Models/Users'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

// async function  POST(req: Request, res: NextResponse) {
//     try {
//         const body = await req.json()
//         const { email, password } = body
//         if (!email || !password) {
//             return NextResponse.json({ error: `Please enter your email and password` })
//         }
//         const userEmail = await Users.findOne({ email })
//         if (!userEmail) {
//             return NextResponse.json({ error: `This Email doesn't exit!` })
//         }
//         const passwordCheck = await bcrypt.compare(password, userEmail.password)
//         if (!passwordCheck) {
//             return NextResponse.json({ error: `Please enter a valid password` })
//         }
//         const token = jwt.sign({
//             firstName: userEmail.firstName,
//             email: userEmail.email,
//             userId: userEmail._id,
//             followingIds:userEmail.followingIds,
//             followerIds:userEmail.followerIds,
//         },
//             "JWT_-SECRET-_-DUMBHAHA",
//             { expiresIn: "24h" }
//         )
//         // res.cookies("token", token, {
//         //     maxAge: 24 * 60 * 60 * 1000,
//         //     httpOnly: true,
//         //     secure: false,
//         // })
//         res.setHeader('Set-Cookie', `token=${token}; Max-Age=86400; Path=/; HttpOnly; SameSite=Lax`);
//         // setCookie({res} , `token`,token,{
//         //     maxAge: 24 * 60 * 60, 
//         //     path: '/', 
//         //     httpOnly: true,
//         //     secure: false, //i will change to true if i used HTTPS
//         // })
//         return NextResponse.json({ message: `Login Successfully`, token })
//     } catch (error) {
//         console.log(error)
//         NextResponse.json({ error: `Enternal server error` })
//     }
// }