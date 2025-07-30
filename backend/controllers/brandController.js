import Brand from '../models/brandModel.js';

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json({ brands });
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createBrand = async (req, res) => {

  const { name, slug, logoUrl, websiteUrl, description } = req.body;

  if (!name || !slug || !description) {
    return res.status(400).json({ message: "Name, slug, and description are required" });
  }

  try {
    const newBrand = new Brand({ name, slug, logoUrl, websiteUrl, description });
    await newBrand.save();
    res.status(201).json({ message: "Brand created successfully", brand: newBrand });
  } catch (err) {
    console.error("Error creating brand:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Brand ID is required" });
  }

  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error("Error deleting brand:", err);
    res.status(500).json({ message: "Server error" });
  }
}
export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id || !name || !description) {
    return res.status(400).json({ message: "Brand ID, name, and description are required" });
  }

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (err) {
    console.error("Error updating brand:", err);
    res.status(500).json({ message: "Server error" });
  }
}