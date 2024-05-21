const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController();
// const generatedProducts = require("../utils/products.utils.js");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

// router.get("/mockingproducts", (request, response) => {
//     const products = [];

//     for(let i = 0; i < 100; i++){
//         products.push(generatedProducts());
//     }
//     response.json(products);
// })

module.exports = router;