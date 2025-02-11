import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const validOrigins: string[] = [
//     "http://localhost:3000",
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://127.0.0.1:5174",
//     "http://127.0.0.1:5173"
// ]

// const corsOptions = {
//     origin: (origin:string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//         if (!origin || validOrigins.includes(origin)){
//             callback(null, true);
//         } else {
//             const err = new Error("Not allowed by CORS");
//             (err as any).status = 403;
//             callback(err, false);
//         }
//     },
//     methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
//     credentials: true,
//     optionsSuccessStatus: 200
// };


// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// Homepage route to confirm server is running
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, world!"
    });
});

export { app };