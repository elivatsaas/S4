import mysql from 'mysql2'


import dotenv from 'dotenv'
import { deleteAvailabilityByEmployee } from './availabilityS4.js'
import { deleteEmployeeStoresByEmployee } from './employeeStoresS4.js'
import { deleteEmployeeRolesByEmployee } from './employeeRolesS4.js'
import { deleteDesiredShiftHourByEmployee } from './desiredShiftHour.js'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getEmployees(){
    const [rows] = await pool.query(`SELECT * FROM Employee`)

    return rows
}

export async function getEmployee(id){
    const [rows] = await pool.query(`SELECT *
    FROM Employee
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function createEmployee(firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate) {
    const [result] = await pool.query(`
    INSERT INTO Employee (firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate])

    const id = result.insertId
    return getEmployee(id)
}

export async function updateEmployee(employee_id, firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate) {
    const [result] = await pool.query(`
    UPDATE Employee
    SET id = ?, firstName = ?, lastName = ?, email = ?, phoneNumber = ?, hireDate = ?, birthDate = ?, payRate = ?
    WHERE id = ?
    `, [employee_id, firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate, employee_id])

 
    return getEmployee(employee_id)
}

export async function deleteEmployee(id) {
    const result = getEmployee(id)
    deleteAvailabilityByEmployee(id)
    deleteEmployeeStoresByEmployee(id)
    deleteEmployeeRolesByEmployee(id)
    deleteDesiredShiftHourByEmployee(id)


    await pool.query(`
    DELETE FROM Employee
    WHERE id = ?
    `, [id])

 
    return result;
}



/*
//get employees
const employees = await getEmployees()
console.log(employees)

//return employee 
const employee = await getEmployee(1)
console.log(employee)

//insert employee, returns employee (useful for accessing generated id)

const result = await createEmployee('Tommy', 'ToughKnuckles', 'TomIsTough@example.com',
                                                '4848563849','2022-03-28','1985-10-18','18')
console.log(result)
*/
//insert employee, returns employee (useful for accessing generated id)

