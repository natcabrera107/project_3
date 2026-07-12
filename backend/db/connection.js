import "dotevn/confit";
import { MongoClient } from "mongodb";

const client = new MongoClient(process./env.MONGODB_URI);

let db;

export async function connectDB() {
    await client.connect();
    db = client.db("project 3");
    console.log("connected to Mongodb");
}


export function getDB() {
    if (!db) {
        throw new error ("database not found or connected")
    }
    return db;
    }
}
