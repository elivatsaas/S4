const fs = require('fs');
const path = require('path');
const express = require('express');
const replaceTemplate = require('./../replaceTemplate');
const shiftHandler = require('./../handlers/shiftHandlers');

const router = express.Router();
//router.param("id", employeeHandler.checkID);

router.get('/', (req, res) => {
  //res.writeHead(200, { 'Content-type': 'text/html' });
  res.sendFile(path.resolve(`public/S4_Landing.html`));
});

module.exports = router;
