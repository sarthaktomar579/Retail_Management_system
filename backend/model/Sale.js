import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.models.Sale ||
  mongoose.model("Sale", SaleSchema, "transactions");
