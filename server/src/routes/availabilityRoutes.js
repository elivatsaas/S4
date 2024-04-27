const express = require("express");

const availabilityHandler = require("./../handlers/availabilityHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", availabilityHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var availabilities = await availabilityHandler.getAllAvailabilities();
      res.status(200).json({
        status: "success",
        results: availabilities.length,
        data: {
          availabilities,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      var { startTime, endTime, dayOfWeek, Employee_id, Schedule_id } =
        req.body;
      const newAvailability = await availabilityHandler.createAvailability(
        startTime,
        endTime,
        dayOfWeek,
        Employee_id,
        Schedule_id
      );
      res.status(201).json({
        status: "success",
        data: {
          newAvailability,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const id = req.params.id * 1;
      const availability = await availabilityHandler.getAvailability(id);
      if (!availability) {
        return next(new AppError("No availability found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          availability,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      var { startTime, endTime, dayOfWeek, Employee_id, Schedule_id } =
        req.body;
      startTime = startTime ?? null;
      endTime = endTime ?? null;
      dayOfWeek = dayOfWeek ?? null;
      Employee_id = Employee_id ?? null;
      Schedule_id = Schedule_id ?? null;
      const id = req.params.id;

      const availability = availabilityHandler.getAvailability(id);
      if (!availability) {
        return next(new AppError("No availability found with that ID", 404));
      }
      const updatedAvailability = await availabilityHandler.updateAvailability(
        id,
        startTime,
        endTime,
        dayOfWeek,
        Employee_id,
        Schedule_id
      );
      res.status(201).json({
        status: "success",
        data: {
          updatedAvailability,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const availability = availabilityHandler.getAvailability(req.params.id);
      if (!availability) {
        return next(new AppError("No availability found with that ID", 404));
      }
      availabilityHandler.deleteAvailability(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );

router.route("/employees/:employeeId").get(
  catchASync(async (req, res, next) => {
    const availability = await availabilityHandler.getAvailabilityByEmployee(
      req.params.employeeId
    );
    res.status(200).json({
      status: "success",
      data: {
        availability,
      },
    });
  })
);

router.route("/schedules/:scheduleId").get(
  catchASync(async (req, res, next) => {
    const availability = await availabilityHandler.getAvailabilityBySchedule(
      req.params.scheduleId
    );
    res.status(200).json({
      status: "success",
      data: {
        availability,
      },
    });
  })
);

module.exports = router;
