import mysql from 'mysql2'

import dotenv from 'dotenv'


dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAvailabilities(){
    const [rows] = await pool.query(`SELECT * FROM Availability`)

    return rows
}

export async function getAvailability(id){
    const [rows] = await pool.query(`SELECT *
    FROM Availability
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function getAvailabilityByEmployee(id){
    const [rows] = await pool.query(`SELECT *
    FROM Availability
    WHERE Employee_id = ?
    `, [id])

    return rows[0]
}

export async function getAvailabilityBySchedule(id){
    const [rows] = await pool.query(`SELECT *
    FROM Availability
    WHERE Schedule_id = ?
    `, [id])

    return rows[0]
}

export async function createAvailability(startTime, endTime, dayOfWeek, Employee_id, Schedule_id) {
    const [result] = await pool.query(`
    INSERT INTO Availability (startTime, endTime, dayOfWeek, Employee_id, Schedule_id) 
    VALUES (?, ?, ?, ?, ?)
    `, [startTime, endTime, dayOfWeek, Employee_id, Schedule_id])

    const id = result.insertId
    return getAvailability(id)
}

export async function updateAvailability(availability_id, startTime, endTime, dayOfWeek, Employee_id, Schedule_id) {
    const [result] = await pool.query(`
    UPDATE Availability
    SET id = ?, startTime = ?, endTime = ?, dayOfWeek = ?,  Employee_id = ?, Schedule_id = ?
    WHERE id = ?
    `, [availability_id, startTime, endTime, dayOfWeek, Employee_id, Schedule_id,availability_id])

 
    return getAvailability(availability_id)
}

export async function deleteAvailability(id) {
    const result = getAvailability(id)

    await pool.query(`
    DELETE FROM Availability
    WHERE id = ?
    `, [id])

 
    return result;
}

export async function deleteAvailabilityByEmployee(id) {
    const result = getAvailabilityByEmployee(id)

    await pool.query(`
    DELETE FROM Availability
    WHERE Employee_id = ?
    `, [id])

 
    return result;
}

export async function deleteAvailabilityBySchedule(id) {
    const result = getAvailabilityBySchedule(id)

    await pool.query(`
    DELETE FROM Availability
    WHERE Schedule_id = ?
    `, [id])

 
    return result;
}
/*
//get Availabilities
const Availabilities = await getAvailabilitiess()
console.log(Availabilities)

//return Availability 
const Availability = await getAvailability(1)
console.log(Availability)

//insert Availability, returns Availability (useful for accessing generated id)

const result = await createAvailability('2024-05-19', '10:30', '3:30',
                                                '3','1','2','2')
console.log(result)
*/