const express = require("express");

const scheduleHandler = require("./../handlers/scheduleHandlers");
const authHandler = require("./../handlers/authHandlers");
const catchASync = require("./../utils/catchASync");
const router = express.Router();
const AppError = require("./../utils/appError");

//router.param("id", employeeHandler.checkID);

router
  .route("/")
  .get(
    //catchASync(authHandler.protect),
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
      console.log(schedule);
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
module.exports = router;

router.route("/generate/:id").post(
  catchASync(async function (req, res, next) {
    var results = await scheduleHandler.generateSchedule(req.params.id * 1);
    res.status(200).json({
      status: "success",
      results: results.length,
      results,
    });
  })
);
