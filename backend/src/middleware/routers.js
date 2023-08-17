const userRouter = require("../routes/users/userRouter");
const brandRouter = require("../routes/brands/brandRouter");
const categoryRouter = require("../routes/categories/categoryRouter");
const suppliersRouter = require("../routes/suppliers/suppliersRouter");
const customerRouter = require("../routes/customers/customerRouter");
const expenseTypeRouter = require("../routes/expenses/expenseTypeRouter");
const expenseRouter = require("../routes/expenses/expenseRouter");
const productRoute = require("../routes/products/productRoute");
const puchaseRouter = require("../routes/purchases/puchaseRouter");
const saleRouter = require("../routes/sales/saleRouter");
const returnRoute = require("../routes/returns/returnRoute");
const reportRouter = require("../routes/report/reportRouter");
const summaryRouter = require("../routes/summary/summaryRouter");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/supplier", suppliersRouter);
  app.use("/api/customer", customerRouter);
  app.use("/api/expenseType", expenseTypeRouter);
  app.use("/api/expenseType", expenseRouter);
  app.use("/api/product", productRoute);
  app.use("/api/purchase", puchaseRouter);
  app.use("/api/sale", saleRouter);
  app.use("/api/return", returnRoute);
  app.use("/api/report", reportRouter);
  app.use("/api/summary", summaryRouter);

  app.use("*", (req, res) => {
    res.status(404).send("404 not found!");
  });
};
