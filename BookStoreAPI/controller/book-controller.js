const Book = require('../models/book');

const getallbooks = async (req, res) => {
    try {
        const allbooks = await Book.find({ user: req.user._id });

        if (allbooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'List of books fetched successfully',
                data: allbooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No books are available'
            });
        }
    } catch (e) {
        console.log('error ->', e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong bro'
        });
    }
}; 

const getSingleBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const singleBook = await Book.findOne({ _id: bookId, user: req.user._id });

        if (singleBook) {
            res.status(200).json({
                success: true,
                message: 'Requested book fetched successfully',
                data: singleBook
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Requested book is not available'
            });
        }
    } catch (e) {
        console.log('error ->', e);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        newBookFormData.user = req.user._id; // attach user ID

        const newlyCreatedBook = await Book.create(newBookFormData);

        if (newlyCreatedBook) {
            res.status(200).json({
                success: true,
                message: 'New book created successfully',
                data: newlyCreatedBook
            });
        }
    } catch (e) {
        console.log('error ->', e);
        res.status(500).json({ success: false, message: 'Failed to add new book' });
    }
};

const updateBook = async (req, res) => {
    try {
        const UpdatedbookData = req.body;
        const bookId = req.params.id;

        const updateBook = await Book.findOneAndUpdate(
            { _id: bookId, user: req.user._id },
            UpdatedbookData,
            { new: true }
        );

        if (!updateBook) {
            return res.status(404).json({
                success: false,
                message: 'Unable to update the book'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book was updated successfully',
            data: updateBook
        });
    } catch (e) {
        console.log('error ->', e);
        res.status(500).json({ success: false, message: 'Failed to update book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookID = req.params.id;

        const deletedBook = await Book.findOneAndDelete({ _id: bookID, user: req.user._id });

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Unable to delete this book'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book was deleted successfully',
            data: deletedBook
        });
    } catch (e) {
        console.log('error ->', e);
        res.status(500).json({ success: false, message: 'Failed to delete book' });
    }
};

module.exports = {
    getallbooks,
    getSingleBookById,
    addNewBook,
    updateBook,
    deleteBook
};