import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";



function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized 1" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
       
        if (!decoded) {
            return res.status(401).send("Unauthorized 2")
        }
        //@ts-ignore
         req.userId = decoded.id; // attach user
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized")
    }
}
export default(authMiddleware)