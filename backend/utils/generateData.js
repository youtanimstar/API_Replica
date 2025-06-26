const generateData = (format, type) => {
  let data = {
    message: "No data provided",
  };

  if (type === 1) {
    data = JSON.stringify(format);
  }

  return data;
};
module.exports = {
  generateData,
};