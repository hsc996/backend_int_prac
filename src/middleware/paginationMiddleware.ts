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
// This allows us to attach a `pagination` object to the `req` object,
// which can be used in downstream route handlers or controllers.
interface PaginationRequest extends Request {
    pagination?: {
        page: number; // The current page number, starting from 1
        limit: number; // The maximum number of items per page
        skip: number; // The number of items to skip for pagination
    };
}

// Middleware to handle pagination logic
function paginationMiddleware(req: PaginationRequest, res: Response, next: NextFunction): void {
    // Parse the `page` query parameter from the request URL
    // If not provided or invalid, default to page 1
    const page = parseInt(req.query.page as string, 10) || 1;

    // Parse the `limit` query parameter from the request URL
    // If not provided or invalid, default to a limit of 10 items per page
    const limit = parseInt(req.query.limit as string, 10) || 10;

    // Calculate the `skip` value, which represents the number of items to skip
    // for the database query (used for offset in pagination)
    const skip = (page - 1) * limit;

    // Attach the pagination object to the `req` object
    // This makes the pagination parameters accessible in downstream handlers
    req.pagination = { page, limit, skip };

    // Pass control to the next middleware or route handler
    next();
}

// Export the middleware to be used in other parts of the application
export default paginationMiddleware;





