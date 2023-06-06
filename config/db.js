const mongoose = require('mongoose')

const connectDB =  (url) => {
        return mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        
}

module.exports= connectDB;