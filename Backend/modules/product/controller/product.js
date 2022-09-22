import sql from './../../../DB/connection.js';
import { addToQuery, responseFunction } from './../../utilties/utilties.js';

export const getProducts = (req, res) => {
    const { category, search, orderPrice, pricegt, pricelt, orderDate } = req.query
    const isQuery = category || search || pricegt || pricelt ? 'where' : ''

    let searchQuery = '';

    category ? searchQuery = addToQuery(searchQuery, `category = '${category}' `) : ''
    search ? searchQuery = addToQuery(searchQuery, `p.name like '%${search}%' `) : ''
    pricegt ? searchQuery = addToQuery(searchQuery, `price >= ${pricegt}`) : ''
    pricelt ? searchQuery = addToQuery(searchQuery, `price <= ${pricelt}`) : ''
    orderPrice == 1 ? searchQuery += ` order by price ASC` : orderPrice == 2 ? searchQuery += ` order by price DESC` : ''
    orderDate == 1 ? searchQuery += ` order by created_at ASC` : orderDate == 2 ? searchQuery += `  order by created_at DESC` : ''
    console.log(searchQuery)

    sql.execute(`SELECT p.id as productID,p.category,imageURL,p.created_at as product_time, p.name, p.price, p.description, u.firstName, u.lastName, p.userID, u.email ,u.created_at FROM products as p left join users as u on u.id = p.userID ${isQuery} ${searchQuery}`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.length, 'empty')
    })
}

export const getProduct = (req, res) => {
    const { id } = req.params
    sql.execute(`SELECT * from products where id=${id}`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.length, 'In-valid ID')
    })
}

export const addProduct = (req, res) => {
    const { name, description, price, userID, imageURL, category } = req.body
    sql.execute(`insert into products (name, description, price, userID, imageURL, category) values( '${name}', '${description}', ${price}, ${userID}, '${imageURL}', '${category}' )`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.affectedRows)
    })
}

export const deleteProduct = (req, res) => {
    const { id } = req.params
    const { email } = req.body

    sql.execute(`select * from products as p inner join users as u on u.id = p.userID where p.id=${id} and u.email = '${email}' `, (err, result, fields) => {
        if (err) {
            res, json({ message: 'query err', err })
        } else {
            if (result.length) {
                sql.execute(`delete from products where id=${id}`, (err, result, fields) => {
                    responseFunction(req, res, err, result, result?.affectedRows)
                })
            } else {
                res.json({ message: 'auth failed' })
            }
        }
    })

}

export const updateProduct = (req, res) => {
    const { id } = req.params
    const { name, description, price, email, category, imageURL } = req.body

    console.log(req.body)

    sql.execute(`select * from products as p inner join users as u on u.id = p.userID where p.id=${id} and u.email = '${email}' `, (err, result, fields) => {
        if (err) {
            res, json({ message: 'query err', err })
        } else {
            if (result.length) {
                sql.execute(`UPDATE products set name='${name}', description= '${description}', price=${price}, category='${category}', imageURL='${imageURL}' where id=${id}`, (err, result, fields) => {
                    responseFunction(req, res, err, result, result?.affectedRows)
                })
            } else {
                res.json({ message: 'auth failed' })
            }
        }
    })

}
