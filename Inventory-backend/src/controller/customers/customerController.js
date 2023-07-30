const { Customer } = require("../../models/customers/Customer");

exports.CreateCustomer = async (req, res) => {
  const { name, email, address, phone } = req.body;
  const userEmail = req.headers.email;
  try {
    let customer = new Customer({
      userEmail: userEmail,
      name,
      email,
      address,
      phone,
    });
    const newCustomer = await customer.save();
    res.status(201).json({
      success: true,
      message: "Customer create successful",
      newCustomer,
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.phone === 1) {
      return res.status(400).send("Phone number already exists");
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.UpdateCustomer = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;
  const { name, email, address, phone } = req.body;
  try {
    let customer = {};
    customer = await Customer.findOne({ _id: id, userEmail: userEmail });
    if (!customer) {
      res.status(400).send("Customer is not found");
    } else {
      const updatedCustomer = await Customer.updateOne(customer, {
        name,
        email,
        address,
        phone,
      });
      res.status(201).json({
        success: true,
        message: "Customer update successful",
        updatedCustomer,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Customer is not found");
    } else if (error.keyPattern && error.keyPattern.phone === 1) {
      return res.status(400).send("Phone number already exists");
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.ReadCustomer = async (req, res) => {
  const userEmail = req.headers.email;
  try {
    const customer = await Customer.find({ userEmail: userEmail });
    res.status(200).json({
      success: true,
      message: "Customer retrieved successful",
      customer,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.ReadCustomerById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    const customer = await Customer.find({ _id: id, userEmail: email });
    if (customer.length === 0) {
      // customer not found
      throw new Error("Customer not found");
    }
    res.status(200).json({
      success: true,
      message: "Customer retrieved successful",
      customer,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Customer not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.CustomerList = async (req, res) => {
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

      data = await Customer.aggregate([
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
      data = await Customer.aggregate([
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

// exports.DeleteSupplier = async (req, res) => {
//   const id = req.params.id;
//   let supplier = {};
//   supplier = await Supplier.findOne({ supplierId: id });
//   if (!supplier) {
//     res.status(400).send("Supplier is not found");
//   } else {
//     const deletedSupplier = await Supplier.deleteOne(supplier);
//     res.status(200).json({
//       success: true,
//       message: "Supplier delete successful",
//       deletedSupplier,
//     });
//   }
// };
