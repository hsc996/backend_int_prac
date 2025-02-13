import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";

const redisClient = new Redis();

//Middleware to handle caching
export default async function cacheMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    const key = req.originalUrl;
    try {
        const cachedData = await redisClient.get(key);
        if (cachedData){
            console.log("Cache hit.");
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            console.log("Cache miss.");
            res.locals.cacheKey = key; // Pass cache key to response locals
            next();
        }
    } catch (error) {
        console.error("Redis error: ", error);
        next();
    }
}

//Utility function to store data in Redis
export async function storeInCache(key: string, data: any, expiration: number = 10) {
    await redisClient.setex(key, expiration, JSON.stringify(data)); // Cache expires in 10 seconds
  }