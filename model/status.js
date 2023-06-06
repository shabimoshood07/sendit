const mongoose = require('mongoose')

const statusSchema =  new mongoose.Schema (
    {
        status: {
            type: String,
            enum: ['pending', 'delivering', 'delivered'],
            default: 'pending', 
        }
    }    
)  

const model = mongoose.model('status', statusSchema)
module.exports = model  
