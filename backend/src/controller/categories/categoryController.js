const { Category } = require("../../models/categories/Category");
const { Product } = require("../../models/products/Product");

exports.CreateCategory = async (req, res) => {
  const name = req.body.name;
  const email = req.headers.email;
  try {
    let category = {};
    category = await Category.findOne({ name: name, userEmail: email });
    if (category) {
      res.status(400).send("Category already exist");
    } else {
      brand = new Category({ name: name, userEmail: email });
      const newCategory = await brand.save();
      res.status(201).json({
        success: true,
        message: "Category create successful",
        newCategory,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.UpdateCategory = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.headers.email;

  try {
    //Check existing brand
    const existingCategory = await Category.findOne({
      name: name,
      userEmail: email,
    });
    if (existingCategory) return res.status(400).send("Category already exist");

    //Update brand
    let category = {};
    category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(400).send("Category is not found");
    } else {
      const updatedCategory = await Category.updateOne(category, {
        name: name,
      });
      res.status(201).json({
        success: true,
        message: "Category update successful",
        updatedCategory,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Category is not found");
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.ReadCategory = async (req, res) => {
  try {
    const category = await Category.find({ userEmail: req.headers.email });
    res.status(200).json({
      success: true,
      message: "Category retrieved successful",
      category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ReadCategoryById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    const category = await Category.find({ _id: id, userEmail: email });
    if (category.length === 0) {
      // Supplier not found
      throw new Error("Category is not found");
    }
    res.status(200).json({
      success: true,
      message: "Category retrieved successful",
      category,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Category is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.CategoryList = async (req, res) => {
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

      data = await Category.aggregate([
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
      data = await Category.aggregate([
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

exports.DeleteCategory = async (req, res) => {
  let id = req.params.id;
  const userEmail = req.headers.email;

  try {
    // Check if the Category is associated with a product
    const product = await Product.findOne({
      categoryId: id,
      userEmail: userEmail,
    });
    if (product) {
      return res
        .status(200)
        .json({ status: "associate", data: "Associate with Product" });
    } else {
      // Delete the Category
      const deletedCategory = await Category.findOneAndDelete({
        _id: id,
        userEmail: userEmail,
      });
      if (deletedCategory === null) {
        throw new Error("Category is not found");
      }
      res.status(200).json({
        status: "success",
        data: deletedCategory,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Category is not found");
    }
    res.status(500).json({
      status: "error",
      message: "Error deleting Category.",
      error: error.message,
    });
  }
};
