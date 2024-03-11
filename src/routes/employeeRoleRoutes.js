const express = require('express');

const employeeRoleHandler = require('./../handlers/employeeRoleHandlers');

const router = express.Router();

//router.param("id", employeeRoleHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var employeeRoles = await employeeRoleHandler.getAllEmployeeRoles();
    res.status(200).json({
      status: 'success',
      results: employeeRoles.length,
      data: {
        employeeRoles,
      },
    });
  })
  .post(async function (req, res) {
    const { roleId, employeeId } = req.body;
    const newEmployeeRole = await employeeRoleHandler.createEmployeeRole(
      employeeId,
      roleId
    );
    res.status(201).json({
      status: 'success',
      data: {
        newEmployeeRole,
      },
    });
  });

// router
//   .route('/:id')
//   .get(async function (req, res) {
//     const employeeRole = await employeeRoleHandler.getEmployeeRole(
//       req.params.eid * 1,
//       req.params.rid * 1
//     );
//     res.status(200).json({
//       status: 'success',
//       data: {
//         employeeRole,
//       },
//     });
//   })
//   .delete(async function (req, res) {
//     employeeRoleHandler.deleteEmployeeRole(req.params.id * 1);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

module.exports = router;
