import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAllEmployeeStores(){
    const [rows] = await pool.query(`SELECT * FROM EmployeeStores`)

    return rows
}

export async function getAEmployeeStore(Employee_id, Store_id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeStores
    WHERE Employee_id = ?
    AND Store_id = ?
    `, [Employee_id, Store_id])

    return rows[0]
}
export async function getAEmployeeStoreByEmployee(Employee_id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeStores
    WHERE Employee_id = ?
    `, [Employee_id])

    return rows[0]
}
export async function getAEmployeeStoreByStore(Store_id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeStores
    WHERE Store_id = ?
    `, [Store_id])

    return rows[0]
}



export async function createAEmployeeStore(Employee_id, Store_id) {
    const [result] = await pool.query(`
    INSERT INTO EmployeeStores (Employee_id, Store_id) 
    VALUES (?, ?)
    `, [Employee_id, Store_id])

    const id = result.insertId
    return getAEmployeeStore(Employee_id,Store_id)
}


export async function deleteEmployeeStores(Employee_id, Store_id) {
    const result = getAEmployeeStore(Employee_id, Store_id)


    await pool.query(`
    DELETE FROM EmployeeStores
    WHERE Store_id = ?
    AND Employee_id = ?
    `, [Store_id, Employee_id])
    return result;
}

export async function deleteEmployeeStoresByStore(id) {
    const result = getAEmployeeStoreByStore(id)


    await pool.query(`
    DELETE FROM EmployeeStores
    WHERE Store_id = ?
    `, [id])
    return result;
}

export async function deleteEmployeeStoresByEmployee(id) {

    const result = getAEmployeeStoreByEmployee
    await pool.query(`
    DELETE FROM EmployeeStores
    WHERE Employee_id = ?
    `, [id])

 
    return result;
}

/*
//get EmployeeStores
const EmployeeStores = await getAllEmployeeStores()
console.log(EmployeeStores)

//return EmployeeStore 
const EmployeeStore = await getAEmployeeStore(1)
console.log(EmployeeStore)

//insert EmployeeStore, returns created object (useful for accessing generated id)

const result = await createAEmployeeStore('South')
console.log(result)
*/