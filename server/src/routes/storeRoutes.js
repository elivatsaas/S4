const express = require("express");

const storeHandler = require("../handlers/storeHandlers");
const AppError = require("./../utils/appError");
const catchASync = require("./../utils/catchASync");
const router = express.Router();

//router.param("id", StoreHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var stores = await storeHandler.getAllStores();
      res.status(200).json({
        status: "success",
        results: stores.length,
        data: {
          stores,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { storeName } = req.body;
      const newStore = await storeHandler.createStore(storeName);
      res.status(201).json({
        status: "success",
        data: {
          newStore,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const store = await storeHandler.getStore(req.params.id * 1);
      if (!store) {
        return next(new AppError("No store found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          store,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      const store = await storeHandler.getStore(req.params.id * 1);
      if (!store) {
        return next(new AppError("No store found with that ID", 404));
      }
      const { storeName } = req.body;

      const id = req.params.id;
      const updatedStore = await storeHandler.updateStore(id, storeName);
      res.status(201).json({
        status: "success",
        data: {
          updatedStore,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const store = await storeHandler.getStore(req.params.id * 1);
      if (!store) {
        return next(new AppError("No store found with that ID", 404));
      }
      storeHandler.deleteStore(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );
module.exports = router;
