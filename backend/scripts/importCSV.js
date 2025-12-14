const fs = require("fs");
const csv = require("csvtojson");
const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Define the Sale schema (matching the model structure)
    const SaleSchema = new mongoose.Schema({}, { strict: false });
    const Sale = mongoose.models.Sale || mongoose.model("Sale", SaleSchema, "transactions");

    console.log("Deleting all existing records...");
    const deleteResult = await Sale.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing records`);

    console.log("Starting CSV import...");

    // Get CSV file path from command line argument or use default
    const csvFilePath = process.argv[2] || "dataset.csv";
    
    if (!fs.existsSync(csvFilePath)) {
      console.error(`Error: CSV file not found at ${csvFilePath}`);
      process.exit(1);
    }
    
    console.log(`Reading CSV from: ${csvFilePath}`);

    // Read entire CSV and convert to JSON array to maintain order
    const jsonArray = await csv().fromFile(csvFilePath);
    
    console.log(`Loaded ${jsonArray.length} records from CSV`);
    
    // Sort by Transaction ID to ensure proper order (ID 1 comes first)
    jsonArray.sort((a, b) => {
      const idA = parseInt(a["Transaction ID"] || a["TransactionID"] || a["Transaction_Id"] || 0);
      const idB = parseInt(b["Transaction ID"] || b["TransactionID"] || b["Transaction_Id"] || 0);
      return idA - idB;
    });

    console.log("Records sorted by Transaction ID");

    // Insert in batches of 1000 to avoid memory issues and handle MongoDB limits
    const batchSize = 1000;
    let inserted = 0;
    let failedBatches = 0;
    
    for (let i = 0; i < jsonArray.length; i += batchSize) {
      try {
        const batch = jsonArray.slice(i, i + batchSize);
        await Sale.insertMany(batch, { ordered: true });
        inserted += batch.length;
        console.log(`Inserted ${inserted} / ${jsonArray.length} records (${((inserted/jsonArray.length)*100).toFixed(2)}%)`);
      } catch (batchError) {
        // Handle MongoDB free tier limit or other errors
        if (batchError.message && batchError.message.includes("exceeded")) {
          console.log(`\n⚠️  MongoDB limit reached. Stopping import at ${inserted} records.`);
          console.log(`This is likely due to MongoDB free tier storage limits.`);
          break;
        } else {
          console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, batchError.message);
          failedBatches++;
          // Continue with next batch
        }
      }
    }

    // Verify final count
    const finalCount = await Sale.countDocuments();
    console.log(`\n✅ Import completed!`);
    console.log(`   Total records in database: ${finalCount}`);
    console.log(`   Successfully inserted: ${inserted}`);
    if (failedBatches > 0) {
      console.log(`   Failed batches: ${failedBatches}`);
    }
    
    process.exit(0);

  } catch (err) {
    console.error("Import failed:", err);
    process.exit(1);
  }
})();
