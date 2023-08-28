const { Brand } = require("../../models/brands/Brand");
const { Product } = require("../../models/products/Product");

exports.CreateBrand = async (req, res) => {
  const name = req.body.name;
  const email = req.headers.email;
  try {
    let brand = {};
    brand = await Brand.findOne({ name: name, userEmail: email });
    if (brand) {
      res.status(400).send("Brand already exist");
    } else {
      brand = new Brand({ name: name, userEmail: email });
      const newBrand = await brand.save();
      res.status(201).json({
        success: true,
        message: "Brand create successful",
        newBrand,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.UpdateBrnad = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.headers.email;

  try {
    //Check existing brand
    const existingBrand = await Brand.findOne({ name: name, userEmail: email });
    if (existingBrand) return res.status(400).send("Brand already exist");

    //Update brand
    let brand = {};
    brand = await Brand.findOne({ _id: id });
    if (!brand) {
      res.status(400).send("Brand is not found");
    } else {
      const updatedBrand = await Brand.updateOne(brand, { name: name });
      res.status(201).json({
        success: true,
        message: "Brand update successful",
        updatedBrand,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Brand is not found");
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.ReadBrand = async (req, res) => {
  try {
    const brands = await Brand.find({ userEmail: req.headers.email });
    res.status(200).json({
      success: true,
      message: "Brand retrieved successful",
      brands,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ReadBrandById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    const brand = await Brand.find({ _id: id, userEmail: email });
    if (brand.length === 0) {
      // Brand not found
      throw new Error("Brand not found");
    }
    res.status(200).json({
      success: true,
      message: "Brand retrieved successful",
      brand,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Brand is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.DeleteBrand = async (req, res) => {
  let id = req.params.id;
  const userEmail = req.headers.email;

  try {
    // Check if the brand is associated with a product
    const product = await Product.findOne({
      brandId: id,
      userEmail: userEmail,
    });
    if (product) {
      return res
        .status(200)
        .json({ status: "associate", data: "Associate with Product" });
    } else {
      // Delete the brand
      const deletedBrand = await Brand.findOneAndDelete({
        _id: id,
        userEmail: userEmail,
      });
      if (deletedBrand === null) {
        return res.status(400).send("Brand is not found");
      }
      res.status(200).json({
        status: "success",
        data: deletedBrand,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting brand.",
      error: error.message,
    });
  }
};

exports.BrandList = async (req, res) => {
  const email = req.headers.email;
  const searchKeyword = req.params.searchKeyword;
  const pageNo = Number(req.params.pageNo);
  const perPage = Number(req.params.perPage);
  const skipRow = (pageNo - 1) * perPage;

  try {
    let data;
    if (searchKeyword !== "0") {
      let searchRegex = { $regex: searchKeyword, $options: "i" };
      let searchQuery = { $or: [{ name: searchRegex }] };

      data = await Brand.aggregate([
        { $match: { userEmail: email } },
        { $match: searchQuery },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await Brand.aggregate([
        { $match: { userEmail: email } },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
