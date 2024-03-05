module.exports = (temp, product) => {
  let output = temp.replace(/{%SHIFTSTARTTIME%}/g, product.startTime);
  output = output.replace(/{%SHIFTENDTIME%}/g, product.endTime);
  output = output.replace(/{%SHIFTDATE%}/g, product.date);
  output = output.replace(/{%SHIFTROLE%}/g, product.role);
  output = output.replace(/{%SHIFTSTORE%}/g, product.store);

  return output;
};
