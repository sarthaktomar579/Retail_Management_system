import connectDB from "../src/utils/db";
import Sale from "../model/Sale";

export default async function handler(req, res) {
  // ✅ CORS HEADERS (VERY IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const {
      page = 1,
      search = "",
      sort = "",
      region,
      gender,
      category,
      paymentMethod
    } = req.query;

    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};

    // 🔍 Search
    if (search) {
      query["Customer Name"] = { $regex: search, $options: "i" };
    }

    // 🎯 Filters
    if (region) query["Customer Region"] = { $in: region.split(",") };
    if (gender) query["Gender"] = { $in: gender.split(",") };
    if (category) query["Product Category"] = { $in: category.split(",") };
    if (paymentMethod) query["Payment Method"] = { $in: paymentMethod.split(",") };

    // 🔃 Sorting
    let sortOption = {};
    if (sort === "amount") sortOption["Final Amount"] = -1;
    if (sort === "date") sortOption["Date"] = -1;

    const data = await Sale.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Sale.countDocuments(query);

    return res.status(200).json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
}
