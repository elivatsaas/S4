import mysql from 'mysql2'

import dotenv from 'dotenv'


dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getShifts(){
    const [rows] = await pool.query(`SELECT * FROM Shift`)

    return rows
}

export async function getShift(id){
    const [rows] = await pool.query(`SELECT *
    FROM Shift
    WHERE id = ?
    `, [id])

    return rows[0]
}
export async function getShiftBySchedule(id){
    const [rows] = await pool.query(`SELECT *
    FROM Shift
    WHERE Schedule_id = ?
    `, [id])

    return rows[0]
}
export async function getShiftByStore(id){
    const [rows] = await pool.query(`SELECT *
    FROM Shift
    WHERE Store_id = ?
    `, [id])

    return rows[0]
}

export async function getShiftByRole(id){
    const [rows] = await pool.query(`SELECT *
    FROM Shift
    WHERE Role_id = ?
    `, [id])

    return rows[0]
}

export async function createShift(date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id) {
    const [result] = await pool.query(`
    INSERT INTO Shift (date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id])

    const id = result.insertId
    return getShift(id)
}

export async function updateShift(shift_id, date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id) {
    const [result] = await pool.query(`
    UPDATE Shift
    SET id = ?, date = ?, startTime = ?, endTime = ?, Employee_id = ?, Schedule_id = ?, Role_id = ?, Store_id = ?
    WHERE id = ?
    `, [shift_id, date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id, shift_id])

 
    return getShift(shift_id)
}

export async function deleteShift(id) {
    const result = getShift(id)


    await pool.query(`
    DELETE FROM Shift
    WHERE id = ?
    `, [id])

 
    return result;
}

export async function deleteShiftBySchedule(id) {
    const result = getShiftBySchedule(id)

    await pool.query(`
    DELETE FROM Shift
    WHERE Schedule_id = ?
    `, [id])

 
    return result;
}

export async function deleteShiftByStore(id) {
    const result = getShiftByStore(id)

    await pool.query(`
    DELETE FROM Shift
    WHERE Store_id = ?
    `, [id])

 
    return result;
}

export async function deleteShiftByRole(id) {
    const result = getShiftByRole(id)

    await pool.query(`
    DELETE FROM Shift
    WHERE Role_id = ?
    `, [id])

 
    return result;
}


/*
//get Shifts
const Shifts = await getShifts()
console.log(Shifts)

//return Shift 
const Shift = await getShift(1)
console.log(Shift)

//insert Shift, returns Shift (useful for accessing generated id)

const result = await createShift('2024-05-19', '10:30', '3:30',
                                                '3','1','2','2')
console.log(result)
*/