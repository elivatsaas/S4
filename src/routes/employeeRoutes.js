const express = require('express');

const employeeHandler = require('./../handlers/employeeHandlers');

const router = express.Router();

//router.param("id", employeeHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var employees = await employeeHandler.getAllEmployees();
    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: {
        employees,
      },
    });
  })
  .post(async function (req, res) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
    } = req.body;
    const newEmployee = await employeeHandler.createEmployee(
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate
    );
    res.status(201).json({
      status: 'success',
      data: {
        newEmployee,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const employee = await employeeHandler.getEmployee(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        employee,
      },
    });
  })
  .patch(async function (req, res) {
    var {
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
    } = req.body;
    firstName = firstName ?? null;
    lastName = lastName ?? null;
    email = email ?? null;
    phoneNumber = phoneNumber ?? null;
    hireDate = hireDate ?? null;
    birthDate = birthDate ?? null;
    payRate = payRate ?? null;
    const id = req.params.id;
    const updatedEmployee = await employeeHandler.updateEmployee(
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
      id
    );
    res.status(201).json({
      status: 'success',
      data: {
        updatedEmployee,
      },
    });
  })
  .delete(async function (req, res) {
    employeeHandler.deleteEmployee(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

module.exports = router;
