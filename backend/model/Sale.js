const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  Transaction_ID: Number,
  Date: String,
  Customer_ID: String,
  Customer_Name: String,
  // other fields...
});

// 👇 FORCE correct collection name
module.exports = mongoose.model("Sale", saleSchema, "transactions");
