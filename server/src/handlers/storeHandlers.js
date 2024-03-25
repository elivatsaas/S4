const mysql = require('mysql2');
const dotenv = require('dotenv');

const employeeStoreHandler = require('./employeeStoreHandlers');
const shiftHandler = require('./../handlers/shiftHandlers');

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllStores() {
  const [stores] = await db.query(`SELECT * FROM Store`);

  return stores;
}

async function getStore(id) {
  const [store] = await db.query(
    `SELECT *
    FROM Store
    WHERE id = ?
    `,
    [id]
  );

  return store[0];
}

async function createStore(storeName) {
  const [store] = await db.query(
    `
    INSERT INTO Store (id, storeName) 
    VALUES (?, ?)
    `,
    [0, storeName]
  );

  return getStore(store.insertId);
}

async function updateStore(store_id, storeName) {
  await db.query(
    `
    UPDATE Store
   SET storeName = ?
    WHERE id = ?
    `,
    [storeName, store_id]
  );

  return getStore(store_id);
}

async function deleteStore(id) {
  const store = getStore(id);

  shiftHandler.deleteShiftByStore(id);
  employeeStoreHandler.deleteEmployeeStoresByStore(id);

  await db.query(
    `
    DELETE FROM Store
    WHERE id = ?
    `,
    [id]
  );

  return store;
}

module.exports = {
  getAllStores: getAllStores,
  getStore: getStore,
  createStore: createStore,
  updateStore: updateStore,
  deleteStore: deleteStore,
};
