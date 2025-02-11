import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect(): Promise<void> {
    try {
        const databaseUrl: string =
        process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

        console.log(`Attempting to connect to database at ${databaseUrl}`);

        await mongoose.connect(databaseUrl, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (error) {
        console.error("MongoDB Connection Error: ", error);
        process.exit(1);
    }
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