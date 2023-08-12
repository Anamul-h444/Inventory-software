const router = require("express").Router();

const { userAuth } = require("../../middleware/authorise");
const {
  CreateCategory,
  UpdateCategory,
  ReadCategory,
  ReadCategoryById,
  CategoryList,
  DeleteCategory,
} = require("../../controller/categories/categoryController");

router.post(
  "/create",
  [userAuth],

  CreateCategory
);
router.post(
  "/update/:id",
  [userAuth],

  UpdateCategory
);
router.get("/get", [userAuth], ReadCategory);
router.get("/get/:id", [userAuth], ReadCategoryById);
router.delete("/delete/:id", [userAuth], DeleteCategory);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], CategoryList);

module.exports = router;
