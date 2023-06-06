const mongoose = require('mongoose')

const currentLocationSchema = new mongoose.Schema(
    {
        currentLocation:{
            type:String,
            required:true
        }
    }
)

const model = mongoose.model('currentLocation', currentLocationSchema)
module.exports= model