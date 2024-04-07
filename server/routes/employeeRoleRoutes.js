const express = require("express");

const employeeRoleHandler = require("./../handlers/employeeRoleHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", employeeRoleHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var employeeRoles = await employeeRoleHandler.getAllEmployeeRoles();
      res.status(200).json({
        status: "success",
        results: employeeRoles.length,
        data: {
          employeeRoles,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { roleId, employeeId } = req.body;
      const newEmployeeRole = await employeeRoleHandler.createEmployeeRole(
        employeeId,
        roleId
      );
      res.status(201).json({
        status: "success",
        data: {
          newEmployeeRole,
        },
      });
    })
  );

// router
//   .route('/:id')
//   .get(catchASync(async function (req, res, next) {
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
//   .delete(catchASync(async function (req, res, next) {
//     employeeRoleHandler.deleteEmployeeRole(req.params.id * 1);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

module.exports = router;
