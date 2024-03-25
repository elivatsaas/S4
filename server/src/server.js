// const url = require('url');
(function () {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    console.log("spawn called");
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();
const app = require("./app");

//index.js

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});
//load in data to send
//Use fileSync since it only runs once at beginning of code. Wouldnt want sync otherwise
//
//   const tempProduct = fs.readFileSync(
//     `${__dirname}/templates/template_product.html`,
//     'utf-8'
//   );

//SERVER
const port = 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
