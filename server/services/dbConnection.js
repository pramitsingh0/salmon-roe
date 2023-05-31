const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const dbConnect = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to db");
};

module.exports = dbConnect;
