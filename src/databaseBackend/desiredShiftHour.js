import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getDesiredShiftHours(){
    const [rows] = await pool.query(`SELECT * FROM desiredShiftHours`)

    return rows
}

export async function getDesiredShiftHour(id){
    const [rows] = await pool.query(`SELECT *
    FROM desiredShiftHours
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function getDesiredShiftHoursByEmployee(id){
    const [rows] = await pool.query(`SELECT *
    FROM DesiredShiftHours
    WHERE Employee_id = ?
    `, [id])

    return rows[0]
}

export async function getDesiredShiftHoursBySchedule(id){
    const [rows] = await pool.query(`SELECT *
    FROM DesiredShiftHours
    WHERE Schedule_id = ?
    `, [id])

    return rows[0]
}


export async function createDesiredShiftHour(desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) {
    const [result] = await pool.query(`
    INSERT INTO desiredShiftHours (desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) 
    VALUES (?, ?, ?, ?, ?, ?)
    `, [desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id])

    const id = result.insertId
    return getDesiredShiftHour(id)
}

export async function updateDesiredShiftHour(dsh_id, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) {
    const [result] = await pool.query(`
    UPDATE DesiredShiftHours
    SET id = ?, desiredShifts = ?, maxShifts = ?, desiredHours = ?, maxHours = ?, Employee_id = ?, Schedule_id = ?
    WHERE id = ?
    `, [dsh_id, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id,dsh_id])

 
    return getDesiredShiftHour(dsh_id)
}

export async function deleteDesiredShiftHour(id) {
    const result = getDesiredShiftHour(id)


    await pool.query(`
    DELETE FROM DesiredShiftHours
    WHERE id = ?
    `, [id])

    return result;
}

export async function deleteDesiredShiftHourByEmployee(id, dataTuype) {
    const result = getDesiredShiftHoursByEmployee(id)

    await pool.query(`
    DELETE FROM DesiredShiftHours
    WHERE Employee_id = ?
    `, [id])

 
    return result;
}

export async function deleteDesiredShiftHourBySchedule(id) {
    const result = getDesiredShiftHoursBySchedule(id)

    await pool.query(`
    DELETE FROM DesiredShiftHours
    WHERE Schedule_id = ?
    `, [id])

 
    return result;
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