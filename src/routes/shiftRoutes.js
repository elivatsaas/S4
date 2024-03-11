const express = require('express');

const shiftHandler = require('./../handlers/shiftHandlers');

const router = express.Router();

//router.param("id", shiftHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var shifts = await shiftHandler.getAllShifts();
    res.status(200).json({
      status: 'success',
      results: shifts.length,
      data: {
        shifts,
      },
    });
  })
  .post(async function (req, res) {
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
      status: 'success',
      data: {
        newShift,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const shift = await shiftHandler.getShift(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        shift,
      },
    });
  })
  .patch(async function (req, res) {
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
      status: 'success',
      data: {
        updatedShift,
      },
    });
  })
  .delete(async function (req, res) {
    shiftHandler.deleteShift(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

module.exports = router;
