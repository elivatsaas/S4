const express = require('express');

const employeeStoreHandler = require('./../handlers/employeeStoreHandlers');

const router = express.Router();

//router.param("id", employeeStoreHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var employeeStores = await employeeStoreHandler.getAllEmployeeStores();
    res.status(200).json({
      status: 'success',
      results: employeeStores.length,
      data: {
        employeeStores,
      },
    });
  })
  .post(async function (req, res) {
    const { storeId, employeeId } = req.body;
    const newEmployeeStore = await employeeStoreHandler.createEmployeestore(
      employeeId,
      storeId
    );
    res.status(201).json({
      status: 'success',
      data: {
        newEmployeeStore,
      },
    });
  });

// router
//   .route('/:id')
//   .get(async function (req, res) {
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
//   .delete(async function (req, res) {
//     employeeStoreHandler.deleteEmployeeStore(req.params.id * 1);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

module.exports = router;
