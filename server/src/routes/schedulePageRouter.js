const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/' || '/:id', (req, res) => {
  //res.writeHead(200, { 'Content-type': 'text/html' });
  res.sendFile(path.resolve(`public/S4_Scheduling.html`));
});

module.exports = router;
