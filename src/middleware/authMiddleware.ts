import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecreyKey = process.env.JWT_SECRET_KEY || "your_secret_key";

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
        const decodedData = jwt.verify(providedToken, jwtSecreyKey) as JWTPayload;

        if (decodedData?.userId){
            req.authUserData = decodedData;
            next();
        }
    } catch (error: any) {
        const errorMessage =
             error.name === "TokenExpiredError"
                ? "Token expired. Please log in again."
                : "Invalid token. Please sign in to view this content.";
        
        return res.status(400).json({ error: errorMessage })
    }
}
