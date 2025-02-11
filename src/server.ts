import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();

// Define CORS options
const corsOptions: cors.CorsOptions = {
    origin: [
        "http://localhost:8080", // Set PORT
        "http://localhost:3000", // CRA local
        "http://localhost:5173", // Vite local
    ],
    optionsSuccessStatus: 200,
};

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Handle CORS preflight requests
app.use((req: Request, res: Response, next: NextFunction): void  => {
    res.header("Access-Control-Allow-Origin", req.headers.origin as string); // Dynamically allow the requesting origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        res.sendStatus(200); // Respond with HTTP 200 for preflight requests
        return;
    }

    next();
});


// Homepage route to confirm server is running
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, world!"
    });
});

export { app };