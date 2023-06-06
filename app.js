const express = require('express')
const path = require('path')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const bodyParser = require('body-parser')
const Parcel = require('./model/parcel')
const Location = require('./model/currentlocation')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const jwt = require('jsonwebtoken')
const User =require('./model/User')
const {StatusCodes} = require('http-status-codes')
const connectDB = require('./config/db')
const {authenticateUser, isAdmin} = require('./middleware/authentication')
require('dotenv').config()
const auth = require('./routes/auth')
const parcel = require('./routes/parcel')
const {BadRequestError, NotFoundError} = require('./errors')

const app = express()
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 60*1000, max: 60}))

app.get('/', (req,res)=>{
    res.send('parcel order')
})
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(bodyParser.json())
  
app.use('/api/v1', auth )
app.use('/api/v1', authenticateUser, parcel)

app.put('/api/v1/parcels/:id/status', isAdmin, async (req, res) => {
    const {
        body: { status },
        user: { userId },
        params: { id: parcelId },
    } = req

    if(status=== ''){
        throw new BadRequestError('Status field cannot be empty')
    }

    const parcel = await Parcel.findByIdAndUpdate(
        { _id: parcelId, createdBy: userId },
        req.body, 
        { new: true, runValidators: true } 
    )

    if (!parcel) {
        throw new NotFoundError(`No job with id ${parcelId}`)
    }      
    res.status(StatusCodes.OK).json({ parcel })
})

app.put('/api/v1/parcels/:id/currentLocation',isAdmin, async (req, res) => {
    const {
        body: { currentLocation },
        user: { userId },
        params: { id: parcelId },
    } = req

    if(currentLocation=== ''){
        throw new BadRequestError('currentLocation field cannot be empty')
    }

    const parcel = await Parcel.findByIdAndUpdate(
        { _id: parcelId, createdBy: userId },
        req.body, 
        { new: true, runValidators: true } 
    )

    if (!parcel) {
        throw new NotFoundError(`No job with id ${parcelId}`)
    }      
    res.status(StatusCodes.OK).json({ parcel })
})

app.get('/api/v1/user', (req, res) =>{
    res.status(200).send('welcome page')
})

const port = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}....`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()