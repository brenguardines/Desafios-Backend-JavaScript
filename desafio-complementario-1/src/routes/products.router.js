const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager();

router.get("/", async (request, response) => {
    try{
        const limit = request.query.limit;
        const products = await productManager.getProducts();

        limit ? response.json(products.slice(0, limit)) : response.json(products);
    }catch (error){
        console.log("Error getting products", error);
        response.status(500).json({error: "Server error"});
    }
});

router.get("/:pid", async (request, response) => {
    let id = request.params.pid;

    try{
        const product = await productManager.getProductById(id);

        product ? response.json(product) : response.json("Product not found");
    }catch (error){
        console.log("Error getting product", error);
        response.status(500).json({error: "Server error"});
    }
});

router.post("/", async (request, response) => {
    const newProduct = request.body;

    try{
        await productManager.addProduct(newProduct);
        response.status(201).json({message: "Product add successfully"});
    }catch (error){
        console.log("Error add product", error);
        response.status(500).json({error: "Server error"});
    }
});

router.put("/:pid", async (request, response) => {
    const id = request.params.pid;
    const productUpdate = request.body;
    try{
        await productManager.updateProduct(id, productUpdate);
        response.json({message: "Product update successfully"});
    }catch (error){
        console.log("Error update product", error);
        response.status(500).json({error: "Server error"});
    }
});

router.delete("/:pid", async (request, response) => {
    const id = request.params.pid;

    try{
        await productManager.deleteProduct(id);
        response.json({message: "Product deleted successfully"});
    }catch (error){
        console.log("Error deleted product", error);
        response.status(500).json({error: "Server error"});
    }
});

module.exports = router;