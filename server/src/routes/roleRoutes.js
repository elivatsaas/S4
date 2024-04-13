const express = require("express");

const roleHandler = require("./../handlers/roleHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", roleHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var roles = await roleHandler.getAllRoles();
      res.status(200).json({
        status: "success",
        results: roles.length,
        data: {
          roles,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { roleName } = req.body;
      const newRole = await roleHandler.createRole(roleName);
      res.status(201).json({
        status: "success",
        data: {
          newRole,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const role = await roleHandler.getRole(req.params.id * 1);
      if (!role) {
        return next(new AppError("No role found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          role,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      const { roleName } = req.body;

      const id = req.params.id;
      const role = roleHandler.getRole(id);
      if (!role) {
        return next(new AppError("No role found with that ID", 404));
      }
      const updatedRole = await roleHandler.updateRole(id, roleName);
      res.status(201).json({
        status: "success",
        data: {
          updatedRole,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const role = roleHandler.getRole(req.params.id * 1);
      if (!role) {
        return next(new AppError("No role found with that ID", 404));
      }
      roleHandler.deleteRole(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );
module.exports = router;
