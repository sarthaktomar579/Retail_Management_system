import connectDB from "../src/utils/db.js";
import Sale from "../model/Sale.js";

export default async function handler(req, res) {
  // ✅ CORS HEADERS (VERY IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "",
      region,
      gender,
      category,
      paymentMethod,
    } = req.query;

    const query = {};

    // 🔍 Search
    if (search) {
      query.$or = [
        { "Customer Name": { $regex: search, $options: "i" } },
        { "Product Name": { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Filters
    if (region) query["Customer Region"] = { $in: region.split(",") };
    if (gender) query["Gender"] = { $in: gender.split(",") };
    if (category) query["Product Category"] = { $in: category.split(",") };
    if (paymentMethod)
      query["Payment Method"] = { $in: paymentMethod.split(",") };

    // 🔃 Sorting
    let sortObj = {};
    if (sort) {
      const [key, order] = sort.split(":");
      sortObj[key] = order === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    const data = await Sale.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Sale.countDocuments(query);

    return res.status(200).json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
