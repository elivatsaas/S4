import mysql from 'mysql2'

import dotenv from 'dotenv'
import { deleteEmployeeRolesByRole } from './employeeRolesS4.js'
import { deleteShiftByRole } from './shiftS4.js'


dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getRoles(){
    const [rows] = await pool.query(`SELECT * FROM Role`)

    return rows
}

export async function getRole(id){
    const [rows] = await pool.query(`SELECT *
    FROM Role
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function createRole(roleName) {
    const [result] = await pool.query(`
    INSERT INTO Role (RoleName) 
    VALUES (?)
    `, [roleName])

    const id = result.insertId
    return getRole(id)
}

export async function updateRole(role_id, roleName) {
    const [result] = await pool.query(`
    UPDATE Role
    SET id = ?, roleName = ?
    WHERE id = ?
    `, [role_id,roleName,role_id])

 
    return getRole(role_id)
}


export async function deleteRole(id) {
    const result = getRole(id)

    deleteEmployeeRolesByRole(id)
    deleteShiftByRole(id)

    await pool.query(`
    DELETE FROM Role
    WHERE id = ?
    `, [id])

 
    return result;
}

/*
//get Roles
const Roles = await getRoles()
console.log(Roles)

//return Role 
const Role = await getRole(1)
console.log(Role)

//insert Role, returns created object (useful for accessing generated id)

const result = await createRole('Manager')
console.log(result)
*/