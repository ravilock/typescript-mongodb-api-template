import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.DATABASE_URI)
