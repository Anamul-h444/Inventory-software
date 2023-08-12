const { Supplier } = require("../../models/suppliers/Supplier");

exports.CreateSupplier = async (req, res) => {
  const { name, email, address, phone } = req.body;
  const userEmail = req.headers.email;
  try {
    let supplier = new Supplier({
      userEmail: userEmail,
      name,
      email,
      address,
      phone,
    });
    const newSupplier = await supplier.save();
    res.status(201).json({
      success: true,
      message: "Supplier create successful",
      newSupplier,
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.phone === 1) {
      return res.status(400).send("Phone number already exists");
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.UpdateSupplier = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;
  const { name, email, address, phone } = req.body;
  try {
    let supplier = {};
    supplier = await Supplier.findOne({ _id: id, userEmail: userEmail });
    if (!supplier) {
      res.status(400).send("Supplier is not found");
    } else {
      const updatedSupplier = await Supplier.updateOne(supplier, {
        name,
        email,
        address,
        phone,
      });
      res.status(201).json({
        success: true,
        message: "Supplier update successful",
        updatedSupplier,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Supplier is not found");
    } else if (error.keyPattern && error.keyPattern.phone === 1) {
      return res.status(400).send("Phone number already exists");
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.ReadSupplier = async (req, res) => {
  const userEmail = req.headers.email;
  try {
    const suppliers = await Supplier.find({ userEmail: userEmail });
    res.status(200).json({
      success: true,
      message: "Supplier retrieved successful",
      suppliers,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.ReadSupplierById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    const supplier = await Supplier.find({ _id: id, userEmail: email });
    if (supplier.length === 0) {
      // Supplier not found
      throw new Error("Supplier not found");
    }
    res.status(200).json({
      success: true,
      message: "Supplier retrieved successful",
      supplier,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Supplier not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.SupplierList = async (req, res) => {
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
          { name: searchRegex },
          { email: searchRegex },
          { address: searchRegex },
          { phone: searchRegex },
        ],
      };

      data = await Supplier.aggregate([
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
      data = await Supplier.aggregate([
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

exports.DeleteSupplier = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email
  const query = {_id:id, userEmail:email}
  let supplier = {};
  supplier = await Supplier.findOne(query);
  if (!supplier) {
    res.status(400).send("Supplier is not found");
  } else {
    const deletedSupplier = await Supplier.deleteOne(query);
    res.status(200).json({
      success: true,
      message: "Supplier delete successful",
      deletedSupplier,
    });
  }
};
