const express = require("express");

const employeeHandler = require("./../handlers/employeeHandlers");
const authHandler = require("./../handlers/authHandlers");
const AppError = require("./../utils/appError");

const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", employeeHandler.checkID);

router.route("/signup").post(catchASync(authHandler.signup));
router.route("/login").post(catchASync(authHandler.login));

router.route("/").get(
  catchASync(async function (req, res, next) {
    var employees = await employeeHandler.getAllEmployees();
    console.log(employees);
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: {
        employees,
      },
    });
  })
);
/*
  .post(
    catchASync(async function (req, res, next) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        birthDate,
        payRate,
        password,
      } = req.body;
      const newEmployee = await employeeHandler.createEmployee(
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        birthDate,
        payRate,
        password
      );
      res.status(201).json({
        status: "success",
        data: {
          newEmployee,
        },
      });
    })
  );
*/
router.route("/cpp").get(
  catchASync(async function (req, res, next) {
    var employees = await employeeHandler.getAllEmployees();
    res.status(200).json({
      status: "success",
      results: employees.length,

      employees,
    });
  })
);

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const employee = await employeeHandler.getEmployee(req.params.id * 1);
      if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          employee,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      var {
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        birthDate,
        payRate,
        password,
        passwordConfirm,
      } = req.body;
      firstName = firstName ?? null;
      lastName = lastName ?? null;
      email = email ?? null;
      phoneNumber = phoneNumber ?? null;
      hireDate = hireDate ?? null;
      birthDate = birthDate ?? null;
      payRate = payRate ?? null;
      password = password ?? null;
      passwordConfirm = passwordConfirm ?? null;

      const id = req.params.id;
      const employee = employeeHandler.getEmployee(id);
      if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
      }
      const updatedEmployee = await employeeHandler.updateEmployee(
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        birthDate,
        payRate,
        password,
        passwordConfirm,
        id
      );
      res.status(201).json({
        status: "success",
        data: {
          updatedEmployee,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const employee = employeeHandler.deleteEmployee(req.params.id * 1);
      if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );

module.exports = router;
