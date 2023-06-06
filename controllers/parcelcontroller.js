const Parcel = require('../model/parcel')
const Status = require('../model/status')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const getAllParcelOrders = async (req,res) => { 
    const parcels = await Parcel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ parcels, count:parcels.length })
}
const getParcelOrder = async (req, res) => {
    const {
      user: { userId },
      params: { id: parcelId },
    } = req
  
    const parcel = await Parcel.findOne({
      _id: parcelId,
      createdBy: userId,
    })
    if (!parcel) {
      throw new NotFoundError(`No job with id ${parcelId}`)
    }
    res.status(StatusCodes.OK).json({ parcel })
}
const createParcelOrder = async (req,res) =>{ 
    req.body.createdBy = req.user.userId
    const parcel = await Parcel.create(req.body)
    res.status(StatusCodes.CREATED).json({ parcel })
}
const updateParcelDestination = async (req, res) => {
    const {
        body: { destination },
        user: { userId },
        params: { id: parcelId },
    } = req 

    if(destination=== ''){
        throw new BadRequestError('Destination field cannot be empty')
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
}

const deleteParcelOrder = async (req, res) => {
    const {
        user: { userId },
        params: { id: parcelId },
    } = req 

    const parcel = await Parcel.findByIdAndRemove({
        _id:parcelId,
        createdBy:userId
    })
    if (!parcel) {
        throw new NotFoundError(`No job with id ${parcelId}`)
    }      
    res.status(StatusCodes.OK).send('Deleted successfully')
}

module.exports = {
    getAllParcelOrders,
    getParcelOrder,
    createParcelOrder,
    updateParcelDestination,
    deleteParcelOrder,
}