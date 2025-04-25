const mongoose = require('mongoose')

const connecttoDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/BookStoreAPI')
        console.log('MongoDb is connected successfully')

    }catch(e){
        console.error('MongoDB connection failed', e)
        process.exit(1)
    }
}

module.exports = connecttoDB