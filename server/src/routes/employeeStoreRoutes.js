const express = require("express");

const employeeStoreHandler = require("./../handlers/employeeStoreHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", employeeStoreHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var employeeStores = await employeeStoreHandler.getAllEmployeeStores();
      res.status(200).json({
        status: "success",
        results: employeeStores.length,
        data: {
          employeeStores,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { storeId, employeeId } = req.body;
      const newEmployeeStore = await employeeStoreHandler.createEmployeestore(
        employeeId,
        storeId
      );
      res.status(201).json({
        status: "success",
        data: {
          newEmployeeStore,
        },
      });
    })
  );

// router
//   .route('/:id')
//   .get(catchASync(async function (req, res, next) {
//     const employeeStore = await employeeStoreHandler.getEmployeeStore(
//       req.params.eid * 1,
//       req.params.rid * 1
//     );
//     res.status(200).json({
//       status: 'success',
//       data: {
//         employeeStore,
//       },
//     });
//   })
//   .delete(catchASync(async function (req, res, next) {
//     employeeStoreHandler.deleteEmployeeStore(req.params.id * 1);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

module.exports = router;
