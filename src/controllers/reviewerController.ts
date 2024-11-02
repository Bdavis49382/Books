import Reviewer from "../models/Reviewer";

const getAllReviewers = async () => {
    return await Reviewer.find();
}

const getOne = async (id : string) => {
    return await Reviewer.findById(id);
}

const addReviewer = async (newReviewer : object) => {
    const book = new Reviewer(newReviewer);
    const result = await book.save(newReviewer);
    return result._id;
}

const deleteReviewer = async (id : string) => {
    return await Reviewer.deleteOne({_id : id});
}

const updateReviewer = async (id : string, newBook : object) => {
    return await Reviewer.updateOne({ _id : id}, newBook);
}

export {addReviewer, getAllReviewers, getOne, deleteReviewer, updateReviewer};