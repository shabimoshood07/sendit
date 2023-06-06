const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError, BadRequestError } = require('../errors')

const authenticateUser = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Autheticatoin Invalid');
    }
    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, role:payload.role, name: payload.name }
        next(); 
    }catch(error){
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

const isAdmin = (req,res,next) =>{
    if(req.user.role === 'basic'){   
        console.log(req.user)
        throw new BadRequestError('Access Denied')
    } else{   
        next()
    }  
     
} 

module.exports ={   
    authenticateUser,
    isAdmin
} 

 


    
