const express = require("express");

const scheduleHandler = require("./../handlers/scheduleHandlers");
const authHandler = require("./../handlers/authHandlers");
const catchASync = require("./../utils/catchASync");
const router = express.Router();
const AppError = require("./../utils/appError");
const employeeHandlers = require("../handlers/employeeHandlers");
const roleHandlers = require("../handlers/roleHandlers");
const shiftHandlers = require("../handlers/shiftHandlers");

//router.param("id", employeeHandler.checkID);

router
  .route("/")
  .get(
    //catchASync(authHandler.protect),
    //catchASync(async function (req, res, next) {
    // const hasPermission = await authHandler.restrictTo(
    //   req.employee.id,
    //   "Manager"
    // );

    // if (!hasPermission) {
    // return next(
    //   new AppError("You do not have permission to access this route", 403)
    // );
    //}

    // If permission is granted, proceed with the route handler
    //return next();
    // }),
    catchASync(async function (req, res, next) {
      var schedules = await scheduleHandler.getAllSchedules();
      res.status(200).json({
        status: "success",
        results: schedules.length,
        data: {
          schedules,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { startDate, endDate, scheduleName } = req.body;
      const newSchedule = await scheduleHandler.createSchedule(
        startDate,
        endDate,
        scheduleName
      );
      res.status(201).json({
        status: "success",
        data: {
          newSchedule,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const schedule = await scheduleHandler.getSchedule(req.params.id * 1);
      if (!schedule) {
        return next(new AppError("No schedule found with that ID", 404));
      }
      //res.send(schedule);
      res.json({
        data: {
          schedule,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      const schedule = await scheduleHandler.getSchedule(req.params.id * 1);
      if (!schedule) {
        return next(new AppError("No schedule found with that ID", 404));
      }
      var { startDate, endDate, scheduleName } = req.body;
      startDate = startDate ?? null;
      endDate = endDate ?? null;
      scheduleName = scheduleName ?? null;
      const id = req.params.id;
      const updateSchedule = await scheduleHandler.updateSchedule(
        id,
        startDate,
        endDate,
        scheduleName
      );
      res.status(201).json({
        status: "success",
        data: {
          updateSchedule,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const schedule = await scheduleHandler.getSchedule(req.params.id * 1);
      if (!schedule) {
        return next(new AppError("No schedule found with that ID", 404));
      }
      await scheduleHandler.deleteSchedule(req.params.id * 1);

      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );

router.route("/find/:id").get(
  catchASync(async function (req, res, next) {
    var results = await scheduleHandler.getEmployeesForSchedule(
      req.params.id * 1
    );
    results = results[0];
    res.status(200).json({
      status: "success",
      results: results.length,
      returnValues: results,
    });
  })
);

router.route("/generate/:id").get(
  catchASync(async function (req, res, next) {
    var results = await scheduleHandler.generateSchedule(req.params.id * 1);
    res.status(200).json({
      status: "success",
      results,
    });
  })
);

router.route("/cpp/:id").get(
  catchASync(async function (req, res, next) {
    const schedule = await scheduleHandler.getSchedule(req.params.id * 1);
    if (!schedule) {
      return next(new AppError("No schedule found with that ID", 404));
    }
    //res.send(schedule);
    res.json({
      schedule,
    });
  })
);

router.route("/null/:id").post(
  catchASync(async function (req, res, next) {
    const nullReturn = await scheduleHandler.setScheduleNull(req.params.id * 1);

    res.status(200).json({
      status: "success",
    });
  })
);

router.post("/confirm/:scheduleId", async (req, res, next) => {
  try {
    const { scheduleId } = req.params;

    // Retrieve all shifts for the given schedule ID (assuming you have a function to do this)
    const shifts = await shiftHandlers.getShiftsBySchedule(scheduleId);

    // Find all unique employee IDs for the shifts
    const uniqueEmployeeIds = [
      ...new Set(
        shifts
          .filter((shift) => shift.Employee_id !== null)
          .map((shift) => shift.Employee_id)
      ),
    ];

    // For each employee, send confirmation email
    await Promise.all(
      uniqueEmployeeIds.map((employeeId) =>
        scheduleHandler.sendScheduleEmail(employeeId, scheduleId, shifts)
      )
    );
    res.status(200).json({
      status: "success",
      message: `Confirmation emails sent successfully for Schedule ${scheduleId}.`,
    });
  } catch (error) {
    console.error("Error confirming schedule:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
