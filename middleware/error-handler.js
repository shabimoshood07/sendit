const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    
    let customError = {
        StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'Something went wrong try again later'
    }

   // if(err instanceof CustomAPIError) {
    //    return res.status(err.StatusCodes).json({ msg: err.message })
//}

    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((items) => items.message)
            .join(',')
        customError.StatusCode = 400
    }
    if (err.code && err.code === 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.StatusCode = 400
    }
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.StatusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware   