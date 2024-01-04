const dbconn = require('../db/mysql.config')

const bcrypt = require('bcrypt')

async function loginService(requestdata) {

    const { email, password } = requestdata

    const [result] = await dbconn.query(`select * from users where email =?`, [email])
    // console.log(result)
    if (!result.length) {
        return {
            sucess: false,
            status: 400,
            message: "kindly register first"
        }
    }
    const isvalidpassword = await bcrypt.compare(password, result[0].password)

    console.log(isvalidpassword)

    if (!isvalidpassword) {
        return {
            sucess: false,
            status: 400,
            message: "invalid credentials"
        }
    }

    return {
        sucess: true,
        data: result
    }
}


async function addproductService(requestdata) {

    const { name, stock_count, price, description } = requestdata

    const result = await dbconn.query(`insert into products (name,stock_count,price,description) values (?,?,?,?)`, [name, stock_count, price, description])
    // console.log(result)

    return {
        sucess: true,
        data: result
    }
}
async function deleteproductService(requestdata) {

    const { id } = requestdata

    const [isvalidid] = await dbconn.query('select * from products where id = ?', [id])

    if (!isvalidid.length) {
        return {
            sucess: false,
            status: 400,
            message: "id not found"

        }
    }

    const [result] = await dbconn.query('delete from products  where id =?', [id])

    return {
        sucess: true,
        data: result
    }
}
async function updateproductService(requestdata) {

    const { name, stock_count } = requestdata

    const [isvalidProduct] = await dbconn.query('select * from products where name = ?', [name])

    if (!isvalidProduct.length) {
        return {
            sucess: false,
            status: 400,
            message: "product not found"

        }
    }

    const [result] = await dbconn.query('update products set stock_count =? where name=?', [stock_count, name])
    console.log(result)

    return {
        sucess: true,
        data: result
    }
}
async function createService(user) {

    let userId = null;

    if (user) userId = user.id

    const [cart] = await dbconn.query('insert into cart (user_id) values (?)', [userId])

    return {
        sucess: true,
        data: cart.insertId
    }
}
async function getproductsService() {

    const [result] = await dbconn.query(`select * from products`)
    if (!result.length) {
        return {
            sucess: false,
            status: 400,
            message: "no products available"
        }
    }
    return {
        sucess: true,
        data: result
    }

}

async function addproducttocartServive(requestdata) {
    const { id, quantity, cart_id } = requestdata

    const [productDeatils] = await dbconn.query('select id ,price from products where name =?', [id])

    const [result] = await dbconn.query('insert into cart_details (cart_id,product_id,price,quantity) values(?,?,?,?)', [cart_id, productDeatils[0].id, productDeatils[0].price, quantity])

    return {
        sucess: true,
        data: result
    }
}


module.exports = { loginService, addproductService, deleteproductService, updateproductService, createService, getproductsService, addproducttocartServive }