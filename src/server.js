const fs = require("fs");
const url = require("url");

const app = require("./app");

//load in data to send
//Use fileSync since it only runs once at beginning of code. Wouldnt want sync otherwise
//
//   const tempProduct = fs.readFileSync(
//     `${__dirname}/templates/template_product.html`,
//     'utf-8'
//   );

//SERVER
const port = 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
