import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect(retries = 5, delay = 5000): Promise<void> {
    const databaseUrl: string =
        process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    console.log(`Attempting to connect to MongoDB at ${databaseUrl}`);

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await mongoose.connect(databaseUrl, {
                serverSelectionTimeoutMS: 5000, // Time to wait before failing to connect
                connectTimeoutMS: 10000, // Connection timeout
            });

            console.log("MongoDB Connected Successfully.");
            break; // Exit loop on success
        } catch (error) {
            console.error(`MongoDB Connection Attempt ${attempt} Failed:`, error);

            if (attempt === retries) {
                console.error("Max retry attempts reached. Exiting...");
                process.exit(1);
            }

            console.log(`Retrying connection in ${delay / 1000} seconds...`);
            await new Promise((res) => setTimeout(res, delay));
        }
    }

    // MongoDB connection event listeners
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB Connection Error: ", err);
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed due to app termination.");
        process.exit(0);
    });
}

async function dbDisconnect(): Promise<void> {
    await mongoose.connection.close();
    console.log("Disconnecting from DB.");
}

async function dbDrop(): Promise<void> {
    await mongoose.connection.db?.dropDatabase();
    console.log("Database dropped");
}

export { dbConnect, dbDisconnect, dbDrop };