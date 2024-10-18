import mongoose from "mongoose";

const book = new mongoose.Schema({
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
})

export default mongoose.model("Books", book);