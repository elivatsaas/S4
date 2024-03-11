const express = require('express');

const dshHandler = require('../handlers/dshHandlers');

const router = express.Router();

//router.param("id", dshHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var dsh = await dshHandler.getAllDesiredShiftHours();
    res.status(200).json({
      status: 'success',
      results: dsh.length,
      data: {
        dsh,
      },
    });
  })
  .post(async function (req, res) {
    const {
      desiredShifts,
      maxShifts,
      desiredHours,
      maxHours,
      Employee_id,
      Schedule_id,
    } = req.body;
    const newDSH = await dshHandler.createDesiredShiftHour(
      desiredShifts,
      maxShifts,
      desiredHours,
      maxHours,
      Employee_id,
      Schedule_id
    );
    res.status(201).json({
      status: 'success',
      data: {
        newDSH,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const dsh = await dshHandler.getDesiredShiftHour(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        dsh,
      },
    });
  })
  .patch(async function (req, res) {
    var {
      desiredShifts,
      maxShifts,
      desiredHours,
      maxHours,
      Employee_id,
      Schedule_id,
    } = req.body;
    desiredShifts = desiredShifts ?? null;
    maxShifts = maxShifts ?? null;
    desiredHours = desiredHours ?? null;
    maxHours = maxHours ?? null;
    Employee_id = Employee_id ?? null;
    Schedule_id = Schedule_id ?? null;
    const id = req.params.id;
    const updatedDSH = await dshHandler.updateDesiredShiftHour(
      id,
      desiredShifts,
      maxShifts,
      desiredHours,
      maxHours,
      Employee_id,
      Schedule_id
    );
    res.status(201).json({
      status: 'success',
      data: {
        updatedDSH,
      },
    });
  })
  .delete(async function (req, res) {
    dshHandler.deleteDesiredShiftHour(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
module.exports = router;
