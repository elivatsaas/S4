import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getdesiredShiftHours(){
    const [rows] = await pool.query(`SELECT * FROM desiredShiftHours`)

    return rows
}

export async function getdesiredShiftHour(id){
    const [rows] = await pool.query(`SELECT *
    FROM desiredShiftHours
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function createDesiredShiftHour(desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) {
    const [result] = await pool.query(`
    INSERT INTO desiredSHr (date, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [date, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id])

    const id = result.insertId
    return getdesiredShiftHour(id)
}

/*
//get desiredShiftHours
const desiredShiftHours = await getDesiredShiftHourrs()
console.log(desiredShiftHours)

//return desiredShiftHour 
const desiredShiftHour = await getDesiredShiftHour(1)
console.log(desiredShiftHour)

//insert desiredShiftHour, returns created object (useful for accessing generated id)

const result = await createdesiredSHr('4', '6', '40',
                                                '50','1','NULL')
console.log(result)
*/