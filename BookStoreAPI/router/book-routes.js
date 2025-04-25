const express = require('express')
const {getallbooks, getSingleBookById, addNewBook, updateBook, deleteBook} = require('../controller/book-controller')
const ensureAuthenticated = require('../middleware/auth')



const router = express.Router()


router.get('/get',ensureAuthenticated, getallbooks)
router.get('/get/:id',ensureAuthenticated, getSingleBookById)
router.post('/add',ensureAuthenticated, addNewBook)
router.put('/update/:id',ensureAuthenticated, updateBook)
router.delete('/delete/:id',ensureAuthenticated, deleteBook)

module.exports = router




 