const Joi = require('joi');
const { schema } = require('../models/user');

const signupValidation = async (req, res, next) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(409).json({
            message : 'signing up error occured', error
        }) 
    }
    next();
}

const loginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(409).json({
            success:false,
            message : 'error occured'
        })
    }
    next();
}

module.exports = {signupValidation, loginValidation}