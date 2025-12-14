const connectDB = require("../src/utils/db");
const Sale = require("../model/Sale");

module.exports = async function handler(req, res) {
  try {
    await connectDB();

    const page = Number(req.query.page) || 1;
    const LIMIT = 10;
    const skip = (page - 1) * LIMIT;

    const query = {};

    if (req.query.search) {
      query.customerName = { $regex: req.query.search, $options: "i" };
    }

    ["region", "gender", "category", "paymentMethod"].forEach((key) => {
      if (req.query[key]) {
        query[key] = { $in: req.query[key].split(",") };
      }
    });

    let sortOption = {};
    if (req.query.sort === "name-asc") sortOption.customerName = 1;
    if (req.query.sort === "name-desc") sortOption.customerName = -1;
    if (req.query.sort === "amount-asc") sortOption.amount = 1;
    if (req.query.sort === "amount-desc") sortOption.amount = -1;

    const total = await Sale.countDocuments(query);
    const data = await Sale.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(LIMIT);

    return res.status(200).json({
      data,
      totalPages: Math.ceil(total / LIMIT),
      currentPage: page,
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
