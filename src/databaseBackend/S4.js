import express from 'express'

import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from './employeeS4.js'

import { getShifts, getShift, createShift, updateShift, deleteShift } from './shiftS4.js'

import { getAvailabilities, getAvailability, createAvailability, updateAvailability, deleteAvailability } from './availabilityS4.js'

import { getDesiredShiftHours, getDesiredShiftHour, createDesiredShiftHour, updateDesiredShiftHour,  deleteDesiredShiftHour } from './desiredShiftHour.js'

import { getStores, getStore, createStore, updateStore, deleteStore } from './storeS4.js'

import { getRoles, getRole, createRole,updateRole, deleteRole } from './roleS4.js'

import { getSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule } from './scheduleS4.js'

import { getAllEmployeeStores, getAEmployeeStore, createAEmployeeStore, updateEmployeeStore, deleteEmployeeStores} from './employeeStoresS4.js'

import { getAllEmployeeRoles, getAEmployeeRole, createAEmployeeRole, updateEmployeeRole, deleteEmployeeRoles} from './employeeRolesS4.js'








const app = express()

app.use(express.json())


//employee web interactions
app.get("/employees", async (req, res) => {
    const employees = await getEmployees()
    res.send(employees)
})

app.get("/employees/:id", async (req, res) => {
    const id = req.params.id
    const employee = await getEmployee(id)
    res.status(200).send(employee)
})

/*
json example post text
{
    "firstName": "Mickey",
    "lastName": "Mouse",
    "email": "mickey@clubhouse.mick",
    "phoneNumber": "2837483928",
    "hireDate": "2022-10-02",
    "birthDate": "2000-02-10",
    "payRate": "18"
  }
  */

app.post("/employees", async (req, res) => {
    const {firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate} = req.body
    const employee = await createEmployee(firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate)
    res.status(201).send(employee)
})

//update data
app.patch("/employees/u", async (req, res) => {
    const {employee_id, firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate} = req.body
    const employee = await updateEmployee(employee_id, firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate)
    res.status(201).send(employee)
})

//delete data
app.delete("/employees/d", async (req, res) => {
    const {id} = req.body
    const employee = await deleteEmployee(id)
    res.status(201).send(employee)
})


//shift web interactions
app.get("/shifts", async (req, res) => {
    const shifts = await getShifts()
    res.send(shifts)
})

app.get("/shifts/:id", async (req, res) => {
    const id = req.params.id
    const shift = await getShift(id)
    res.send(shift)
})
/*
shift json
{
    "date": "2024-05-22",
    "startTime": "10:00",
    "endTime": "18:00",
    "Employee_id": null,
    "Schedule_id": "1",
    "Role_id": "3",
    "Store_id": "3"
  }
  */
app.post("/shifts", async (req, res) => {
    const {date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id} = req.body
    const shift = await createShift(date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id)
    res.status(201).send(shift)
})

//update data
app.patch("/shifts/u", async (req, res) => {
    const {shift_id, date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id} = req.body
    const shift = await updateShift(shift_id, date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id)
    res.status(201).send(shift)
})

app.delete("/shifts/d", async (req, res) => {
    const {id} = req.body
    const shift = await deleteShift(id)
    res.status(201).send(shift)
})



//schedule web interactions
app.get("/schedules", async (req, res) => {
    const schedules = await getSchedules()
    res.send(schedules)
})

app.get("/schedules/:id", async (req, res) => {
    const id = req.params.id
    const schedule = await getSchedule(id)
    res.send(schedule)
})

/*
schedule json
{
    "startDate": "2024-06-10",
    "endDate": "2024-06-23",
    "scheduleName": "myTestSchedule"
  }
  */

app.post("/schedules", async (req, res) => {
    const {startDate, endDate, scheduleName} = req.body
    const schedule = await createSchedule(startDate, endDate, scheduleName)
    res.status(201).send(schedule)
})

//update data
app.patch("/schedules/u", async (req, res) => {
    const {schedule_id, startDate, endDate, scheduleName} = req.body
    const schedule = await updateSchedule(schedule_id, startDate, endDate, scheduleName)
    res.status(201).send(schedule)
})

app.delete("/schedules/d", async (req, res) => {
    const {id} = req.body
    const schedule = await deleteSchedule(id)
    res.status(201).send(schedule)
})


//availability web interactions
app.get("/availability", async (req, res) => {
    const availabilities = await getAvailabilities()
    res.send(availabilities)
})

app.get("/availability/:id", async (req, res) => {
    const id = req.params.id
    const availability = await getAvailability(id)
    res.send(availability)
})

/*
{
    "startTime": "3:00",
    "endTime": "23:00",
    "dayOfWeek": "4",
    "Employee_id": "6",
    "Schedule_id": null
}
*/
app.post("/availability", async (req, res) => {
    const {startTime, endTime, dayOfWeek, Employee_id, Schedule_id} = req.body
    const availability = await createAvailability(startTime, endTime, dayOfWeek, Employee_id, Schedule_id)
    res.status(201).send(availability)
})

//update data
app.patch("/availability/u", async (req, res) => {
    const {availability_id, startTime, endTime, dayOfWeek, Employee_id, Schedule_id} = req.body
    const availability = await updateAvailability(availability_id, startTime, endTime, dayOfWeek, Employee_id, Schedule_id)
    res.status(201).send(availability)
})

app.delete("/availability/d", async (req, res) => {
    const {id} = req.body
    const availability = await deleteAvailability(id)
    res.status(201).send(availability)
})
//desired shift hours web interactions
app.get("/dsh", async (req, res) => {
    const dshs = await getDesiredShiftHours()
    res.send(dshs)
})

app.get("/dsh/:id", async (req, res) => {
    const id = req.params.id
    const dsh = await getDesiredShiftHour(id)
    res.send(dsh)
})


/*
{
    "desiredShifts": "4",
    "maxShifts": "6",
    "desiredHours": "30",
    "maxHours": "35",
    "Employee_id": "1",
    "Schedule_id": "2"
}
*/
app.post("/dsh", async (req, res) => {
    const {desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id} = req.body
    const dsh = await createDesiredShiftHour(desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id)
    res.status(201).send(dsh)
})

//update data
app.patch("/dsh/u", async (req, res) => {
    const {dsh_id, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id} = req.body
    const dsh = await updateDesiredShiftHour(dsh_id, desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id)
    res.status(201).send(dsh)
})


app.delete("/dsh/d", async (req, res) => {
    const {id} = req.body
    const dsh = await deleteDesiredShiftHour(id)
    res.status(201).send(dsh)
})

//store web interactions
app.get("/stores", async (req, res) => {
    const stores = await getStores()
    res.send(stores)
})

app.get("/stores/:id", async (req, res) => {
    const id = req.params.id
    const store = await getStore(id)
    res.send(store)
})

/*
{
    "storeName": "testStore"
}
*/
app.post("/stores", async (req, res) => {
    const {storeName} = req.body
    const store = await createStore(storeName)
    res.status(201).send(store)
})

//update data
app.patch("/stores/u", async (req, res) => {
    const {store_id, storeName} = req.body
    const store = await updateStore(store_id, storeName)
    res.status(201).send(store)
})

app.delete("/stores/d", async (req, res) => {
    const {id} = req.body
    const store = await deleteStore(id)
    res.status(201).send(store)
})

//role web interactions
app.get("/roles", async (req, res) => {
    const roles = await getRoles()
    res.send(roles)
})

app.get("/roles/:id", async (req, res) => {
    const id = req.params.id
    const role = await getRole(id)
    res.send(role)
})

/*
{
    "roleName": "testRole"
}
*/

app.post("/roles", async (req, res) => {
    const {roleName} = req.body
    const role = await createRole(roleName)
    res.status(201).send(role)
})

//update data
app.patch("/roles/u", async (req, res) => {
    const {role_id, roleName} = req.body
    const role = await updateRole(role_id, roleName)
    res.status(201).send(role)
})

app.delete("/roles/d", async (req, res) => {
    const {id} = req.body
    const role = await deleteRole(id)
    res.status(201).send(role)
})

//employee stores web interactions
app.get("/employeestores", async (req, res) => {
    const employeestores = await getAllEmployeeStores()
    res.send(employeestores)
})

app.get("/employeestores/:id", async (req, res) => {
    const id = req.params.id
    const employeestore = await getAEmployeeStore(id)
    res.send(employeestore)
})

/*
{
  "Store_id": "2",
  "Employee_id": "12"
}
*/
app.post("/employeestores", async (req, res) => {
    const {Employee_id, Store_id} = req.body
    const employeestore = await createAEmployeeStore(Employee_id, Store_id)
    res.status(201).send(employeestore)
})

//you do not update employee stores or employee roles, you only insert or delete

app.delete("/employeestores/d", async (req, res) => {
    const {store_id, employee_id} = req.body
    const employeestore = await deleteEmployeeStores(store_id, employee_id)
    res.status(201).send(employeestore)
})


//employee roles web interactions
app.get("/employeeroles", async (req, res) => {
    const employeeroles = await getAllEmployeeRoles()
    res.send(employeeroles)
})

app.get("/employeeroles/:id", async (req, res) => {
    const id = req.params.id
    const employeerole = await getAEmployeeRole(id)
    res.send(employeerole)
})

/*
{
  "Role_id": "3",
  "Employee_id": "12"
}
*/
app.post("/employeeroles", async (req, res) => {
    const {Employee_id, Role_id} = req.body
    const employeeroles = await createAEmployeeRole(Employee_id, Role_id)
    res.status(201).send(employeeroles)
})

//you do not update employee stores or employee roles, you only insert or delete



app.delete("/employeeroles/d", async (req, res) => {
    const {role_id, employee_id} = req.body
    const employeerole = await deleteEmployeeRoles(role_id, employee_id)
    res.status(201).send(employeerole)
})




app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})

