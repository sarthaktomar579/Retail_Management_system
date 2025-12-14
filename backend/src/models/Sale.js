const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

router.get("/sales", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const LIMIT = 10;                // ✅ EXACTLY 10 per page
    const skip = (page - 1) * LIMIT;

    const query = {};

    // ---------- SEARCH ----------
    if (req.query.search) {
      query.customerName = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // ---------- FILTERS ----------
    ["region", "gender", "category", "paymentMethod"].forEach((key) => {
      if (req.query[key]) {
        query[key] = { $in: req.query[key].split(",") };
      }
    });

    // ---------- SORT ----------
    let sortOption = {};
    if (req.query.sort === "name-asc") sortOption.customerName = 1;
    if (req.query.sort === "name-desc") sortOption.customerName = -1;
    if (req.query.sort === "amount-asc") sortOption.amount = 1;
    if (req.query.sort === "amount-desc") sortOption.amount = -1;

    const total = await Sale.countDocuments(query);

    const data = await Sale.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(LIMIT);                 // ✅ LIMIT APPLIED

    res.json({
      data,
      totalPages: Math.ceil(total / LIMIT),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
