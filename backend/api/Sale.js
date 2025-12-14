import connectDB from "../src/utils/db.js";
import Sale from "../model/Sale.js";

export default async function handler(req, res) {
  // 🔥 CORS HEADERS (MANDATORY)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

    if (search) {
      query["Customer Name"] = { $regex: search, $options: "i" };
    }

    if (region) query["Customer Region"] = { $in: region.split(",") };
    if (gender) query["Gender"] = { $in: gender.split(",") };
    if (category) query["Product Category"] = { $in: category.split(",") };
    if (paymentMethod) query["Payment Method"] = { $in: paymentMethod.split(",") };

    let cursor = Sale.find(query);

    if (sort === "amount_desc") cursor = cursor.sort({ "Final Amount": -1 });
    if (sort === "amount_asc") cursor = cursor.sort({ "Final Amount": 1 });
    if (sort === "date_desc") cursor = cursor.sort({ Date: -1 });
    if (sort === "date_asc") cursor = cursor.sort({ Date: 1 });

    const total = await Sale.countDocuments(query);
    const rawData = await cursor.skip(skip).limit(limit);

    // 🔥 NORMALIZE FIELDS FOR FRONTEND
    const data = rawData.map(d => ({
      id: d["Transaction ID"],
      date: d["Date"],
      customer: d["Customer Name"],
      phone: d["Phone Number"],
      gender: d["Gender"],
      age: d["Age"],
      region: d["Customer Region"],
      category: d["Product Category"],
      tags: d["Tags"],
      payment: d["Payment Method"],
      amount: d["Final Amount"]
    }));

    res.json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}
