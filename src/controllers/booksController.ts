import Book from "../models/Book";

const getAllBooks = async () => {
    return await Book.find();
}

const getOne = async (id : string) => {
    return await Book.find({_id:id});
}

const addBook = async (newBook : object) => {
    const book = new Book(newBook);
    const result = await book.save(newBook);
    return result._id;
}

export {addBook, getAllBooks, getOne};