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
    const id = request.params.pid;

    try{
        const {limit = 10, page = 1, sort, query} = request.query;

        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

        response.json({
            status: 'success',
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null
        })

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