import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";

// Initialize a Redis client instance using ioredis
const redisClient = new Redis();

/**
 * Middleware to handle caching.
 * Checks if a response for the requested URL exists in the Redis cache.
 * If cached data is found, it is returned directly. Otherwise, the request is passed to the next middleware/controller.
 * 
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function in the stack
 */
export default async function cacheMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Use the original URL of the request as the cache key
    const key = req.originalUrl;

    try {
        // Attempt to retrieve cached data for the key
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            // Cache hit: log and send the cached data as a JSON response
            console.log("Cache hit.");
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            // Cache miss: log and store the cache key in `res.locals` for later use
            console.log("Cache miss.");
            res.locals.cacheKey = key; // Pass cache key to response locals
            next(); // Proceed to the next middleware or route handler
        }
    } catch (error) {
        // Log Redis-related errors and proceed to the next middleware
        console.error("Redis error: ", error);
        next();
    }
}

/**
 * Utility function to store data in Redis.
 * Serializes and stores the provided data with an expiration time.
 * 
 * @param key - The cache key to associate with the data
 * @param data - The data to store in the cache
 * @param expiration - Cache expiration time in seconds (default is 10 seconds)
 */
export async function storeInCache(key: string, data: any, expiration: number = 10) {
    // Store the data in Redis with the given expiration time (setex = set with expiration)
    await redisClient.setex(key, expiration, JSON.stringify(data));
}
