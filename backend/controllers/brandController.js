import Brand from '../models/Brand.js';

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json({ brands });
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Server error" });
  }
};
