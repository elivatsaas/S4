const express = require("express");

const shiftHandler = require("./../handlers/shiftHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const { route } = require("./scheduleRoutes");
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
      var Employee_id = shift.employee_id;
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
    const shift = await shiftHandler.getShiftsBySchedule(req.params.id * 1);
    if (!shift) {
      return next(new AppError("No shift found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      results: shift.length,
      shift,
    });
  })
);
module.exports = router;
