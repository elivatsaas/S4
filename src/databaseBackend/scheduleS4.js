import mysql from 'mysql2'

import dotenv from 'dotenv'
import { deleteAvailabilityBySchedule } from './availabilityS4.js'
import { deleteDesiredShiftHourBySchedule} from './desiredShiftHour.js'
import { deleteShiftBySchedule } from './shiftS4.js'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getSchedules(){
    const [rows] = await pool.query(`SELECT * FROM Schedule`)

    return rows
}

export async function getSchedule(id){
    const [rows] = await pool.query(`SELECT *
    FROM Schedule
    WHERE id = ?
    `, [id])

    return rows[0]
}

export async function createSchedule(startDate, endDate, scheduleName) {
    const [result] = await pool.query(`
    INSERT INTO Schedule (id, startDate, endDate, scheduleName) 
    VALUES (?, ?, ?, ?)
    `, [0, startDate, endDate, scheduleName])

    const id = result.insertId
    return getSchedule(id)
}

export async function updateSchedule(schedule_id, startDate, endDate, scheduleName) {
    const [result] = await pool.query(`
    UPDATE Schedule
    SET id = ?, startDate = ?, endDate = ?, scheduleName = ?
    WHERE id = ?
    `, [schedule_id, startDate, endDate, scheduleName, schedule_id])

 
    return getSchedule(schedule_id)
}

export async function deleteSchedule(id) {
    const result = getSchedule(id)

    deleteAvailabilityBySchedule(id)
    deleteDesiredShiftHourBySchedule(id)
    deleteShiftBySchedule(id)

    await pool.query(`
    DELETE FROM Schedule
    WHERE id = ?
    `, [id])

    return result;
}


/*
//get Schedules
const Schedules = await getSchedules()
console.log(Schedules)

//return Schedule 
const Schedule = await getSchedule(1)
console.log(Schedule)

//insert Schedule, returns created object (useful for accessing generated id)

const result = await createSchedule('Manager')
console.log(result)
*/