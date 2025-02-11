import dotenv from "dotenv";
import mongoose from "mongoose";
const { dbConnect, dbDisconnect } = require('./functions/dbFunctions');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || "http://localhost:8080/";

// Define Schema
const BookSchema = new mongoose.Schema({
    title: String,
    author: String
});

const Book = mongoose.model("Book", BookSchema);

// async function seedDb(){

// }