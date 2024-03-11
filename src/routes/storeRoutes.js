const express = require('express');

const storeHandler = require('../handlers/StoreHandlers');

const router = express.Router();

//router.param("id", StoreHandler.checkID);

router
  .route('/')
  .get(async function (req, res) {
    var stores = await storeHandler.getAllStores();
    res.status(200).json({
      status: 'success',
      results: stores.length,
      data: {
        stores,
      },
    });
  })
  .post(async function (req, res) {
    const { storeName } = req.body;
    const newStore = await storeHandler.createStore(storeName);
    res.status(201).json({
      status: 'success',
      data: {
        newStore,
      },
    });
  });

router
  .route('/:id')
  .get(async function (req, res) {
    const store = await storeHandler.getStore(req.params.id * 1);
    res.status(200).json({
      status: 'success',
      data: {
        store,
      },
    });
  })
  .patch(async function (req, res) {
    const { storeName } = req.body;

    const id = req.params.id;
    const updatedStore = await storeHandler.updateStore(id, storeName);
    res.status(201).json({
      status: 'success',
      data: {
        updatedStore,
      },
    });
  })
  .delete(async function (req, res) {
    storeHandler.deleteStore(req.params.id * 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
module.exports = router;
