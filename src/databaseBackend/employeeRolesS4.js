import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAllEmployeeRoles(){
    const [rows] = await pool.query(`SELECT * FROM EmployeeRoles`)

    return rows
}

export async function getAEmployeeRole(Employee_id, Role_id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeRoles
    WHERE Role_id = ?
    AND Employee_id = ?
    `, [Role_id, Employee_id])

    return rows[0]
}
export async function getAEmployeeRolesByRole(Role_id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeRoles
    WHERE Role_id = ?
    `, [Role_id])

    return rows[0]
}



export async function getAEmployeeRoleByEmployee(id){
    const [rows] = await pool.query(`SELECT *
    FROM EmployeeRoles
    WHERE Employee_id = ?
    `, [id])

    return rows[0]
}

export async function createAEmployeeRole(Employee_id, Role_id) {
    const [result] = await pool.query(`
    INSERT INTO EmployeeRoles (Employee_id, Role_id) 
    VALUES (?, ?)
    `, [Employee_id, Role_id])

    const id = result.insertId
    return getAEmployeeRole(Employee_id, Role_id)
}




export async function deleteEmployeeRoles(Employee_id, Role_id) {
    const result = getAEmployeeRoleByEmployee(id)


    await pool.query(`
    DELETE FROM EmployeeRoles
    WHERE Employee_id = ?
    AND Role_id = ?
    `, [Employee_id, Role_id])

    return result;
}

export async function deleteEmployeeRolesByEmployee(id) {
    const result = getAEmployeeRoleByEmployee(id)

    await pool.query(`
    DELETE FROM EmployeeRoles
    WHERE employee_id = ?
    `, [id])

 
    return result;
}
export async function deleteEmployeeRolesByRole(id) {
    const result = getAEmployeeRolesByRole(id)

    await pool.query(`
    DELETE FROM EmployeeRoles
    WHERE Role_id = ?
    `, [id])

 
    return result;
}

/*
//get EmployeeRoles
const EmployeeRoles = await getAllEmployeeRoles()
console.log(EmployeeRoles)

//return EmployeeRole 
const EmployeeRole = await getAEmployeeRole(1)
console.log(EmployeeRole)

//insert EmployeeRole, returns created object (useful for accessing generated id)

const result = await createAEmployeeRole('South')
console.log(result)
*/