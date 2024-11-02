import mongoose from "mongoose";

const book = new mongoose.Schema({
    reviewer: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model("Books", book);