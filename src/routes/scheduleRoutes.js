const express = require('express');

const scheduleHandler = require('./../handlers/scheduleHandlers');

const router = express.Router();

//router.param("id", employeeHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var schedules = await scheduleHandler.getAllSchedules();
    res.status(200).json({
      status: 'success',
      results: schedules.length,
      data: {
        schedules,
      },
    });
  })
  .post(async function (req, res) {
    const { startDate, endDate, scheduleName } = req.body;
    const newSchedule = await scheduleHandler.createSchedule(
      startDate,
      endDate,
      scheduleName
    );
    res.status(201).json({
      status: 'success',
      data: {
        newSchedule,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const schedule = await scheduleHandler.getSchedule(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        schedule,
      },
    });
  })
  .patch(async function (req, res) {
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
      status: 'success',
      data: {
        updateSchedule,
      },
    });
  })
  .delete(async function (req, res) {
    scheduleHandler.deleteSchedule(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

router.route('/find/:id').get(async function (req, res) {
  var results = await scheduleHandler.getEmployeesForSchedule(
    req.params.id * 1
  );
  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results,
    },
  });
});
module.exports = router;
