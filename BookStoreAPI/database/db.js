const mongoose = require('mongoose')

const connecttoDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://sathisudeep4:sathisudeep5@cluster0.whp4eue.mongodb.net/')
        console.log('MongoDb is connected successfully')

    }catch(e){
        console.error('MongoDB connection failed', e)
        process.exit(1)
    }
}

module.exports = connecttoDB