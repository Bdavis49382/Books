import Book from "../models/Book";

const getAllBooks = async () => {
    return await Book.find();
}

const getOne = async (id : string) => {
    return await Book.findById(id);
}

const addBook = async (newBook : object) => {
    const book = new Book(newBook);
    const result = await book.save(newBook);
    return result._id;
}

const deleteBook = async (id : string) => {
    return await Book.deleteOne({_id : id});
}

const updateBook = async (id : string, newBook : object) => {
    return await Book.updateOne({ _id : id}, newBook);
}

export {addBook, getAllBooks, getOne, deleteBook, updateBook};