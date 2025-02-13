import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

interface JWTPayload {
    userId: string
}

interface AuthRequest extends Request {
    authUserData: JWTPayload
}

export default function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const providedToken = req.headers.authorization?.split(" ")[1];

    if (!providedToken){
        return res.status(403).json({
            message: "Please sign in to view this content."
        });
    }

    try {
        const decodedData = jwt.verify(providedToken, jwtSecretKey) as JWTPayload;

        if (decodedData?.userId){
            req.authUserData = decodedData;
            return next();
        } else {
            return res.status(401).json({ message: "Please sign in to view this data."});
        }
    } catch (error: any) {
        const errorMessage =
            error.name === "TokenExpiredError"
            ? "Token expired. Please log in again."
            : "Invalid token. Please sign in to view this content.";

        return res.status(401).json({ message: errorMessage });
    }
}