const express = require("express");

const shiftHandler = require("./../handlers/shiftHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const employeeHandlers = require("../handlers/employeeHandlers");
const router = express.Router();

//router.param("id", shiftHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var shifts = await shiftHandler.getAllShifts();
      res.status(200).json({
        status: "success",
        results: shifts.length,
        data: {
          shifts,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const {
        date,
        startTime,
        endTime,
        Employee_id,
        Schedule_id,
        Role_id,
        Store_id,
      } = req.body;
      const newShift = await shiftHandler.createShift(
        date,
        startTime,
        endTime,
        Employee_id,
        Schedule_id,
        Role_id,
        Store_id
      );
      res.status(201).json({
        status: "success",
        data: {
          newShift,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const shift = await shiftHandler.getShift(req.params.id * 1);
      if (!shift) {
        return next(new AppError("No shift found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          shift,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      const shift = await shiftHandler.getShift(req.params.id * 1);
      if (!shift) {
        return next(new AppError("No shift found with that ID", 404));
      }
      var {
        date,
        startTime,
        endTime,
        Employee_id,
        Schedule_id,
        Role_id,
        Store_id,
      } = req.body;
      date = date ?? null;
      startTime = startTime ?? null;
      endTime = endTime ?? null;
      Employee_id = Employee_id ?? null;
      Schedule_id = Schedule_id ?? null;
      Role_id = Role_id ?? null;
      Store_id = Store_id ?? null;
      const id = req.params.id;
      const updatedShift = await shiftHandler.updateShift(
        id,
        date,
        startTime,
        endTime,
        Employee_id,
        Schedule_id,
        Role_id,
        Store_id
      );
      res.status(201).json({
        status: "success",
        data: {
          updatedShift,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const shift = await shiftHandler.getShift(req.params.id * 1);
      if (!shift) {
        return next(new AppError("No shift found with that ID", 404));
      }
      shiftHandler.deleteShift(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );

router.route("/updatecpp").put(
  catchASync(async function (req, res, next) {
    //console.log(req, res);
    var data = req.body;
    data.forEach(async function (shift) {
      var Employee_id;
      if (shift.employee_id === -1) {
        Employee_id = null;
      } else {
        Employee_id = shift.employee_id;
      }
      var id = shift.shiftId;

      const updatedShift = await shiftHandler.updateShift(
        id * 1,
        null,
        null,
        null,
        Employee_id,
        null,
        null,
        null
      );
    });
    res.status(201).json({
      status: "success",
    });
  })
);

router.route("/schedules/:id").get(
  catchASync(async function (req, res, next) {
    const shiftReturn = await shiftHandler.getShiftsBySchedule(
      req.params.id * 1
    );
    if (!shiftReturn) {
      return next(new AppError("No shift found with that ID", 404));
    }
    let shift = shiftReturn.sort((a, b) => a.date - b.date);
    res.status(200).json({
      status: "success",
      results: shift.length,
      shift,
    });
  })
);

// In shiftRoutes.js

router.route("/employees/:id").get(
  catchASync(async (req, res, next) => {
    const employees = await shiftHandler.getEmployeesForShift(
      req.params.id * 1
    );
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: employees,
    });
  })
);

router.route("/dates/:id").get(
  catchASync(async (req, res, next) => {
    const shifts = await shiftHandler.getShiftsByDate(req.params.id);
    res.status(200).json({
      status: "success",
      results: shifts.length,
      data: { shifts },
    });
  })
);

router.route("/take").post(
  catchASync(async (req, res, next) => {
    const shiftId = req.body.shiftId;
    const employeeId = req.body.employeeId;
    const shift = shiftHandler.getShift(shiftId);
    const employee = employeeHandlers.getEmployee(employeeId);
    if (!shift) {
      return next(new AppError("No shift found with that ID", 404));
    }
    if (!employee) {
      return next(new AppError("No employee found with that ID", 404));
    }

    const employeeShiftsRes = await shiftHandler.getEmployeesForShift(shiftId);
    const employeeShifts = employeeShiftsRes[0];
    const employeeIsInShift = employeeShifts.some(
      (employee) => employee.employee_id === employeeId
    );
    if (!employeeIsInShift) {
      return next(
        new AppError(
          `Employee ${employee.firstName} ${employee.lastName} is not eligible for that shift`,
          404
        )
      );
    }
    const updatedShift = await shiftHandler.updateShift(
      shiftId,
      undefined,
      undefined,
      undefined,
      employeeId,
      undefined,
      undefined,
      undefined
    );
    res.status(201).json({
      status: "success",
      data: {
        updatedShift,
      },
    });
  })
);

router.route("/trade").post(
  catchASync(async (req, res, next) => {
    const shift1 = await shiftHandler.getShift(req.body.firstShiftId);
    const employee1 = await employeeHandlers.getEmployee(
      req.body.firstEmployeeId
    );
    const shift2 = await shiftHandler.getShift(req.body.secondShiftId);
    const employee2 = await employeeHandlers.getEmployee(
      req.body.secondEmployeeId
    );

    if (!shift1 | !shift2) {
      return next(new AppError("No shift found with that ID", 404));
    }
    if (!employee1 | !employee2) {
      return next(new AppError("No employee found with that ID", 404));
    }
    if (shift1.Employee_id != employee1.id) {
      return next(
        new AppError(
          `Employee ${employee1.firstName} ${employee1.lastName} does not own that shift`,
          404
        )
      );
    }
    if (shift2.Employee_id != employee2.id) {
      return next(
        new AppError(
          `Employee ${employee2.firstName} ${employee2.lastName} does not own that shift`,
          404
        )
      );
    }

    const shifts1Res = await shiftHandler.getEmployeesForShift(shift1.id);
    const shifts1 = shifts1Res[0];
    const employeeIsInShift1 = shifts1.some(
      (employee) => employee.employee_id === employee1.id
    );

    const shifts2Res = await shiftHandler.getEmployeesForShift(shift2.id);
    const shifts2 = shifts2Res[0];
    const employeeIsInShift2 = shifts2.some(
      (employee) => employee.employee_id === employee2.id
    );
    if (!employeeIsInShift1) {
      return next(
        new AppError(
          `Employee ${employee1.firstName} ${employee1.lastName} is not eligible for that shift`,
          404
        )
      );
    }
    //const shifts2 = shiftHandler.getEmployeesForShift(shift2);
    //const employeeIsInShift2 = shifts2.some(
    //  (employee) => employee.employee_id === employee2.id
    //);
    if (!employeeIsInShift2) {
      return next(
        new AppError(
          `Employee ${employee2.firstName} ${employee2.lastName} is not eligible for that shift`,
          404
        )
      );
    }

    const updatedShift1 = await shiftHandler.updateShift(
      shift1.id,
      undefined,
      undefined,
      undefined,
      employee2.id,
      undefined,
      undefined,
      undefined
    );
    const updatedShift2 = await shiftHandler.updateShift(
      shift2.id,
      undefined,
      undefined,
      undefined,
      employee1.id,
      undefined,
      undefined,
      undefined
    );
    res.status(201).json({
      status: "success",
      data: {
        updatedShift1,
        updatedShift2,
      },
    });
  })
);

module.exports = router;
