import mongoose from "mongoose";

const reviewer = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dateCreated: {
        type: Date,
        require: false
    },
})

export default mongoose.model("Reviewers", reviewer);