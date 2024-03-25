const express = require("express");

const dshHandler = require("../handlers/dshHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", dshHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var dsh = await dshHandler.getAllDesiredShiftHours();
      res.status(200).json({
        status: "success",
        results: dsh.length,
        data: {
          dsh,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
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
        status: "success",
        data: {
          newDSH,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const dsh = await dshHandler.getDesiredShiftHour(req.params.id * 1);
      if (!dsh) {
        return next(
          new AppError("No desired shift hours found with that ID", 404)
        );
      }
      res.status(200).json({
        status: "success",
        data: {
          dsh,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
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
      const dsh = dshHandler.getDesiredShiftHour(id);
      if (!dsh) {
        return next(
          new AppError("No desired shift hours found with that ID", 404)
        );
      }
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
        status: "success",
        data: {
          updatedDSH,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const dsh = dshHandler.getDesiredShiftHour(req.params.id * 1);
      if (!dsh) {
        return next(
          new AppError("No desired shift hours found with that ID", 404)
        );
      }
      dshHandler.deleteDesiredShiftHour(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );
module.exports = router;
