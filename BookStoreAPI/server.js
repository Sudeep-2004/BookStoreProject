require('dotenv').config()
const express = require('express')
const connecttoDB = require('./database/db')
const bookRoutes = require('./router/book-routes')

const app = express()

const cors = require('cors');
const authRouter = require('./router/authRouter')

app.use(cors());


const PORT = process.env.PORT || 3001
 

//connect to the database
connecttoDB();


//middleware
app.use(express.json());

//routes  
app.use('/auth', authRouter);
app.use('/api/books', bookRoutes)




app.listen(PORT , () => {
    console.log(`server is running at the port ${PORT}`)
})

