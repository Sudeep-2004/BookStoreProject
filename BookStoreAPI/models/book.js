const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [100, 'Book title can’t be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxLength: [100, 'Author name can’t be more than 100 characters']
    },
    year: {
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1000, 'Year must be at least 1000'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Book', BookSchema);