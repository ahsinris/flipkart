const router = require('express').Router()
const { loginValidation, addProductValidation, deleteProductValidation, updateProductValidation, addproducttocartValidation } = require('../validation/joi')

const { login, addProduct, deleteProduct, createcart, updateProduct, getproducts, addproducttocart } = require('../controller/usercontroller')

const dbconn = require('../db/mysql.config')

router.post('/login', loginValidation, login)
router.post('/addProduct', addProductValidation, addProduct)
router.delete('/deleteProduct', deleteProductValidation, deleteProduct)
router.post('/createcart', createcart)
router.post('/addproducttocart', addproducttocartValidation, addproducttocart)

router.get('/order/history', async function (req, res) {
    const [myOrders] = await dbconn.query('SELECT * FROM cart ORDER BY id DESC LIMIT 1')

    return res.status(200).json({
        data: myOrders[0]
    })
})


// CRUD OPRATION
router.post('/createProduct', addProductValidation, addProduct)
router.delete('/removeProduct', deleteProductValidation, deleteProduct)
router.put('/updateProduct', updateProductValidation, updateProduct)
router.get('/getproducts', getproducts)


module.exports = router