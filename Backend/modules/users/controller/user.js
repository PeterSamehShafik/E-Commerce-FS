import sql from './../../../DB/connection.js';
import { addToQuery, responseFunction } from './../../utilties/utilties.js';


export const getUsers = (req, res) => {
    const { agegt, agelt, fname, lname } = req.query
    const isQuery = agegt || agelt || fname || lname ? 'where' : ''

    let searchQuery = '';

    if (agegt) {
        searchQuery = addToQuery(searchQuery, `age>=${+agegt}`)
    }
    if (agelt) {
        searchQuery = addToQuery(searchQuery, `age<=${+agelt}`)
    }
    if (fname) {
        searchQuery = addToQuery(searchQuery, `firstName like '${fname}' `)
    }
    if (lname) {
        searchQuery = addToQuery(searchQuery, `lastName like '${lname}' `)
    }

    sql.execute(`SELECT * FROM users ${isQuery} ${searchQuery}`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.length, 'empty')
    })
}

export const getUser = (req, res) => {
    const { id } = req.params
    sql.execute(`SELECT * from users where id=${id}`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.length, 'In-valid ID')
    })
}

export const addUser = (req, res) => {
    const { firstName, lastName, email, age, password } = req.body
    console.log(req.body)
    sql.execute(`insert into users (firstName, lastName, email, age, password) values( '${firstName}', '${lastName}', '${email}', ${age}, '${password}' )`, (err, result, fields) => {
        if (err) {
            res.json({ message: 'Email already registred', err })
        } else {
            if (result.affectedRows) {
                res.json({ message: "done", result })
            } else {
                res.json({ message: message, result })
            }
        }
    })
}

export const updateUser = (req, res) => {
    const { admin } = req.body
    const { id } = req.params
    sql.execute(`update users set admin=${admin} where id=${id} `, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.affectedRows, 'In-valid ID')
    })
}

export const deleteUser = (req, res) => {
    const { id } = req.params
    sql.execute(`DELETE FROM users where id = ${id}`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.affectedRows, 'In-valid ID')
    })
}

export const signIn = (req, res) => {
    const { email, password } = req.body
    sql.execute(`SELECT email,admin,age,firstName,lastName,created_at,id from users where password='${password}' and email='${email}'`, (err, result, fields) => {
        responseFunction(req, res, err, result, result?.length, 'Wrong email or password')
    })
}