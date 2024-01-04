const dbconn = require('../db/mysql.config')
const { loginService, addproductService, deleteproductService, createService, updateproductService, getproductsService, addproducttocartServive } = require('../service/userservice')
const jwt = require('jsonwebtoken')

async function login(req, res) {
    try {
        const result = await loginService(req.body)
        if (!result.sucess) {
            return res.status(result.status).json({
                message: result.message
                // console.log(next)
            })
        }

        const payload = {
            id: result.data.id,
            email: result.data.email,
            name: result.data.name

        }
        payload.acesstoken = jwt.sign(payload, process.env.SECERETKEY, { expiresIn: '1h' })
        return res.status(200).json({
            message: " login sucessfully ",
            data: payload
        })

    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
async function addProduct(req, res) {
    try {
        const result = await addproductService(req.body)
        if (!result.sucess) {
            return res.status(400).json({
                message: "oops something went wrong"
            })
        }
        return res.status(200).json({
            message: "product added sucessfully"
        })



    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
async function deleteProduct(req, res) {
    try {
        const result = await deleteproductService(req.body)
        if (!result.sucess) {
            return res.status(result.status).json({
                message: result.message
            })
        }
        return res.status(200).json({
            message: "deleted sucessfully"
        })



    }
    catch (e) {
        return res.status(500).json({
            message: "server error" + e
        })
    }
}
async function createcart(req, res) {
    try {
        const result = await createService(req.user)
        return res.status(200).json({
            message: "cart created",
            data: result.data
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "server issue" + e
        })
    }
}

async function updateProduct(req, res) {
    try {
        const result = await updateproductService(req.body)
        if (!result.sucess) {
            return res.status(result.status).json({
                message: result.message
            })
        }
        return res.status(200).json({
            message: "updated sucessfully",

        })


    }
    catch (e) {
        return res.status(500).json({
            message: "server issue" + e
        })

    }
}
async function getproducts(req, res) {

    try {
        const result = await getproductsService()
        if (!result.sucess) {
            return res.status(result.status).json({
                message: result.message
            })
        }
        return res.status(200).json({
            message: "all products are listed",
            data: result.data

        })


    }
    catch (e) {
        return res.status(500).json({
            message: "server issue" + e
        })

    }

}
async function addproducttocart(req, res) {
    try {
        const result = await addproducttocartServive(req.body)
        if (result.sucess)
            return res.status(200).json({
                message: "sucessfully added to cart"
            })




    }
    catch (e) {
        return res.status(500).json({
            message: "server issue" + e
        })

    }

}

module.exports = { login, addProduct, deleteProduct, createcart, updateProduct, getproducts, addproducttocart }