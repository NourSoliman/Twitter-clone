import jwt from 'jsonwebtoken'
import {Request , Response , NextFunction} from 'express'
import {Document} from 'mongoose'
interface DecodedToken{
  userId:string,
    _id:string,
    followingIds: any,
    email:string,
    firstName:string,
}
declare global {
    namespace Express {
      interface Request {
        user?: DecodedToken;
      }
    }
  }
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken | undefined;
    
        if (!decoded) {
          return res.status(401).json({ error: 'Token verification failed' });
        }
    
        req.user = decoded;
        console.log('req.user:', req.user);
        next();
      } else {
        return res.status(401).json({ error: 'No token provided' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Authentication Failed' });
    }
  };
  

export default auth