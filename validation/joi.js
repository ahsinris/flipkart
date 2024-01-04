const joi = require('joi')

const loginValidation = async (req, res, next) => {
    try {
        let schema = joi.object({

            email: joi.string().email().required(),
            password: joi.string().required()

        })

        await schema.validateAsync({ ...req.body })

        // next()

    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
const addProductValidation = async (req, res, next) => {
    try {
        let schema = joi.object({

            name: joi.string().required(),
            stock_count: joi.string().required(),
            price: joi.string().required(),
            description: joi.string().required()

        })

        await schema.validateAsync({ ...req.body })

        next()

    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
const deleteProductValidation = async (req, res, next) => {
    try {
        let schema = joi.object({

            id: joi.string().required()

        })

        await schema.validateAsync({ ...req.body })

        next()

    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
const updateProductValidation = async (req, res, next) => {
    try {
        let schema = joi.object({
            name: joi.string().required(),
            stock_count: joi.string().required()
        })

        await schema.validateAsync({ ...req.body })

        next()

    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
const addproducttocartValidation = async (req, res, next) => {
    try {
        let schema = joi.object({
            name: joi.string().required(),
            quantity: joi.string().required()
        })
        await schema.validateAsync({ ...req.body })
        next()
    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}

module.exports = { loginValidation, addProductValidation, deleteProductValidation, updateProductValidation, addproducttocartValidation }