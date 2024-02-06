const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./src/models/products.json");


router.get("/", async (request, response) => {
    try {
        const products = await productManager.getProducts();

        response.render("home", {products: products})
    } catch (error) {
        console.log("Error getting products", error);
        response.status(500).json({error: "Server error"});
    }
})

router.get("/realtimeproducts", async (request, response) => {
    try {
        response.render("realtimeproducts");
    } catch (error) {
        console.log("Error view real time", error);
        response.status(500).json({error: "Server error"});
    }
})


module.exports = router; 