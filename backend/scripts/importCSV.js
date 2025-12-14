const fs = require("fs");
const csv = require("csvtojson");
const mongoose = require("mongoose");
require("dotenv").config();
const Sale = require("../models/Sale");

(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    console.log("Clearing old records...");
    await Sale.deleteMany({});

    console.log("Starting CSV import...");

    const stream = fs.createReadStream("dataset.csv");
    const jsonArray = [];

    stream
      .pipe(csv())
      .on("data", (data) => {
        jsonArray.push(JSON.parse(data.toString()));
        if (jsonArray.length === 1000) {
          Sale.insertMany(jsonArray.splice(0));
          console.log("Inserted 1000 records");
        }
      })
      .on("end", async () => {
        if (jsonArray.length > 0) {
          await Sale.insertMany(jsonArray);
        }
        console.log("CSV import completed successfully");
        process.exit(0);
      })
      .on("error", (err) => {
        console.error("CSV stream error:", err);
        process.exit(1);
      });

  } catch (err) {
    console.error("Import failed:", err);
    process.exit(1);
  }
})();
