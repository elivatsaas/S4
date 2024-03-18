const express = require('express');

const availabilityHandler = require('./../handlers/availabilityHandlers');

const router = express.Router();

//router.param("id", availabilityHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var availabilities = await availabilityHandler.getAllAvailabilities();
    res.status(200).json({
      status: 'success',
      results: availabilities.length,
      data: {
        availabilities,
      },
    });
  })
  .post(async function (req, res) {
    var { startTime, endTime, dayOfWeek, Employee_id, Schedule_id } = req.body;
    const newAvailability = await availabilityHandler.createAvailability(
      startTime,
      endTime,
      dayOfWeek,
      Employee_id,
      Schedule_id
    );
    res.status(201).json({
      status: 'success',
      data: {
        newAvailability,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const id = req.params.id * 1;
    const availability = await availabilityHandler.getAvailability(id);
    res.status(200).json({
      status: 'success',
      data: {
        availability,
      },
    });
  })
  .patch(async function (req, res) {
    var { startTime, endTime, dayOfWeek, Employee_id, Schedule_id } = req.body;
    startTime = startTime ?? null;
    endTime = endTime ?? null;
    dayOfWeek = dayOfWeek ?? null;
    Employee_id = Employee_id ?? null;
    Schedule_id = Schedule_id ?? null;
    const id = req.params.id;
    const updatedAvailability = await availabilityHandler.updateAvailability(
      id,
      startTime,
      endTime,
      dayOfWeek,
      Employee_id,
      Schedule_id
    );
    res.status(201).json({
      status: 'success',
      data: {
        updatedAvailability,
      },
    });
  })
  .delete(async function (req, res) {
    availabilityHandler.deleteAvailability(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

module.exports = router;
