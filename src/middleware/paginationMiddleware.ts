import { Request, Response, NextFunction } from "express";

/**
 * A middleware function that calculates pagination parameters based on the request query parameters 'page' and 'limit'. 
 * It assigns the calculated 'page', 'limit', and 'skip' values to the request object and proceeds to the next middleware in the chain.
 * 
 * @param req The request object
 * @param res The response object
 * @param next The next function to be called in the middleware chain
 */

// Extend the Request type to include Pagination
interface PaginationRequest extends Request {
    pagination?: {
        page: number;
        limit: number;
        skip: number;
    };
}

function paginationMiddleware(req: PaginationRequest, res: Response, next: NextFunction): void {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    req.pagination = { page, limit, skip };
    next();
}

export default paginationMiddleware;