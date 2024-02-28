import mysql from 'mysql2'

import dotenv from 'dotenv'

import { deleteEmployeeStoresByStore } from './employeeStoresS4.js'
import { deleteShiftByStore } from './shiftS4.js'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getStores(){
    const [rows] = await pool.query(`SELECT * FROM Store`)

    return rows
}

export async function getStore(id){
    const [rows] = await pool.query(`SELECT *
    FROM Store
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function createStore(storeName) {
    const [result] = await pool.query(`
    INSERT INTO Store (id, storeName) 
    VALUES (?, ?)
    `, [0, storeName])

    const id = result.insertId
    return getStore(id)
}

export async function updateStore(store_id, storeName) {
    const [result] = await pool.query(`
    UPDATE Store
    SET id = ?, storeName = ?
    WHERE id = ?
    `, [store_id, storeName,store_id])

 
    return getStore(store_id)
}

export async function deleteStore(id) {
    const result = getStore(id)

    deleteEmployeeStoresByStore(id)
    deleteShiftByStore(id)


    await pool.query(`
    DELETE FROM Store
    WHERE id = ?
    `, [id])

 
    return result;
}

/*
//get Stores
const Stores = await getStores()
console.log(Stores)

//return Store 
const Store = await getStore(1)
console.log(Store)

//insert Store, returns created object (useful for accessing generated id)

const result = await createStore('South')
console.log(result)
*/