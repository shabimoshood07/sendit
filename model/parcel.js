const mongoose = require('mongoose')
var pickupLocation = pickupLocation
const parcelSchema = new mongoose.Schema(
    {
        itemDescription: {
            type: String,
            required:[true, 'please provide itemDescription'],
        },
        price: {
            type: Number,
            required: true
        },
        pickupLocation: {
            type: String,
            required: true
        },
        destination: {
            type : String,
            required: true
        },
        recipientName: {
            type: String,
            required: true
        },
        recipientNumber: {
            type: String,
            required: true
        }, 
        currentLocation:{
            type:String,
            required:true
        },
        status: {
            type: String,
            enum: ['pending', 'delivering', 'delivered'],
            default: 'pending', 
        },
        createdBy: {
            type:mongoose.Types.ObjectId,
            ref: 'User',
            required:[true, 'please provide user']
        }
    },{timestamps: true}
)

const model = mongoose.model('parcel', parcelSchema)
module.exports = model  