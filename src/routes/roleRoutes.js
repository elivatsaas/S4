const express = require('express');

const roleHandler = require('./../handlers/roleHandlers');

const router = express.Router();

//router.param("id", roleHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var roles = await roleHandler.getAllRoles();
    res.status(200).json({
      status: 'success',
      results: roles.length,
      data: {
        roles,
      },
    });
  })
  .post(async function (req, res) {
    const { roleName } = req.body;
    const newRole = await roleHandler.createRole(roleName);
    res.status(201).json({
      status: 'success',
      data: {
        newRole,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const role = await roleHandler.getRole(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        role,
      },
    });
  })
  .patch(async function (req, res) {
    const { roleName } = req.body;

    const id = req.params.id;
    const updatedRole = await roleHandler.updateRole(id, roleName);
    res.status(201).json({
      status: 'success',
      data: {
        updatedRole,
      },
    });
  })
  .delete(async function (req, res) {
    roleHandler.deleteRole(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
module.exports = router;
