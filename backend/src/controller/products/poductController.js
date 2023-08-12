const { Product } = require("../../models/products/Product");
const { PurchaseProduct } = require("../../models/purchases/PurchaseProduct");
const { SaleProduct } = require("../../models/sales/SaleProduct");
const { ReturnProduct } = require("../../models/returns/ReturnProduct");

module.exports.CreateProduct = async (req, res) => {
  const userEmail = req.headers.email;
  const { categoryId, brandId, name, unit, details } = req.body;
  try {
    const product = new Product({
      categoryId,
      brandId,
      name,
      unit,
      details,
      userEmail: userEmail,
    });
    const newProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product Create successful",
      newProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.UpdateProduct = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;

  const { categoryId, brandId, name, unit, details } = req.body;

  try {
    const product = await Product.findOne({ _id: id, userEmail: userEmail });
    if (!product) {
      return res.status(400).send("Product is not found");
    } else {
      const updatedProduct = await Product.updateOne(product, {
        categoryId,
        brandId,
        name,
        unit,
        details,
      });
      res.status(200).json({
        success: true,
        message: "Product update successful",
        updatedProduct,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("product is not found");
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.ReadProductById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    const product = await Product.find({ _id: id, userEmail: email });
    if (product.length === 0) {
      // Supplier not found
      throw new Error("Supplier not found");
    }
    res.status(200).json({
      success: true,
      message: "product retrieved successful",
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("product is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ProductList = async (req, res) => {
  const email = req.headers.email;
  const searchKeyword = req.params.searchKeyword;
  const pageNo = Number(req.params.pageNo);
  const perPage = Number(req.params.perPage);
  const skipRow = (pageNo - 1) * perPage;

  try {
    let data;
    if (searchKeyword !== "0") {
      let searchRegex = { $regex: searchKeyword, $options: "i" };
      let searchQuery = {
        $or: [
          { "brands.name": searchRegex },
          { "categories.name": searchRegex },
          { name: searchRegex },
          { unit: searchRegex },
          { details: searchRegex },
        ],
      };

      data = await Product.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brands",
          },
        },
        { $match: searchQuery },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await Product.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand",
          },
        },
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

module.exports.DeleteProduct = async (req, res) => {
  const userEmail = req.headers.email;
  const id = req.params.id;

  try {
    // Check if the product is associated with any purchase, sale, or return
    const associatedPurchase = await PurchaseProduct.findOne({
      productId: id,
      userEmail: userEmail,
    });

    const associatedSale = await SaleProduct.findOne({
      productId: id,
      userEmail: userEmail,
    });

    const associatedReturn = await ReturnProduct.findOne({
      productId: id,
      userEmail: userEmail,
    });

    if (associatedPurchase) {
      return res
        .status(400)
        .send("Product is associated with a purchase product");
    }

    if (associatedSale) {
      return res.status(400).send("Product is associated with a sale product");
    }

    if (associatedReturn) {
      return res
        .status(400)
        .send("Product is associated with a return product");
    }

    // Delete the product
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      userEmail: userEmail,
    });

    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      status: "success",
      data: deletedProduct,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Invalid product ID");
    }

    res.status(500).json({
      status: "error",
      message: "Error deleting product.",
      error: error.message,
    });
  }
};
