const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, 'please provide name' ],
            unique: true,
            maxlenght: 50,
            minlenght: 5,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'please provide email'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please provide a valid email'
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'please provide password'],
            minlength: 6,
        },
        phoneNumber: {
            type: String,
            required: [true, 'please provide phone number']
        },
        address: {
            type: String,
            required: [true, 'please provide address'],
        },
        role: {
            type: String,
            enum: ['admin', 'basic'],
            default: 'admin', 
        }  
    },
    { collection: 'users' } 
)

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})  

userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId:this._id,role:this.role,name:this.name }, 
        process.env.JWT_SECRET, 
        {
            expiresIn:process.env.JWT_LIFETIME
        }
    )
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const model = mongoose.model('User', userSchema)
 
module.exports = model