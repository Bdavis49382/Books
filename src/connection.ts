import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.URL as string);
        console.log('connected');
    }
    catch (err) {
        console.error('could not connect to mongoDB: ' + err);
    }
}