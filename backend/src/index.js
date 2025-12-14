import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- DB --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

// -------------------- SCHEMA --------------------
const transactionSchema = new mongoose.Schema({}, { strict: false });
const Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);

// -------------------- API --------------------
app.get("/api/sales", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const PAGE_SIZE = 10; // ✅ EXACTLY 10 PER PAGE
    const skip = (page - 1) * PAGE_SIZE;

    const search = req.query.search || "";
    const sort = req.query.sort || "";
    const region = req.query.region;
    const gender = req.query.gender;
    const category = req.query.category;
    const paymentMethod = req.query.paymentMethod;

    const query = {};

    // 🔍 SEARCH
    if (search) {
      query["Customer Name"] = { $regex: search, $options: "i" };
    }

    // 🎯 FILTERS (CSV HEADERS)
    if (region) query["Customer Region"] = { $in: region.split(",") };
    if (gender) query["Gender"] = { $in: gender.split(",") };
    if (category) query["Product Category"] = { $in: category.split(",") };
    if (paymentMethod)
      query["Payment Method"] = { $in: paymentMethod.split(",") };

    // ↕ SORT
    let sortQuery = {};
    if (sort === "amount_asc") sortQuery = { "Final Amount": 1 };
    if (sort === "amount_desc") sortQuery = { "Final Amount": -1 };

    const total = await Transaction.countDocuments(query);

    const rows = await Transaction.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(PAGE_SIZE);

    res.json({
      data: rows.map((d) => ({
        transactionId: d["Transaction ID"],
        date: d["Date"],
        customerId: d["Customer ID"],
        customerName: d["Customer Name"],
        phone: String(d["Phone Number"]),
        gender: d["Gender"],
        age: d["Age"],
        region: d["Customer Region"],
        category: d["Product Category"],
        tags: d["Tags"],
        paymentMethod: d["Payment Method"],
        amount: d["Final Amount"],
      })),
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------- SERVER --------------------
app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
