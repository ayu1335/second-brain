import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";


function authmiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
       
        if (!decoded) {
            return res.status(401).send("Unauthorized")
        }
         (req as any).userId = (decoded as any).id; // attach user
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized")
    }
}
export default(authmiddleware)