const express = require("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("./productManager.js");
const productManager = new ProductManager("./src/products.json");

app.use(express.json());

app.get("/products", async (request, response) => {
    try{
        const limit = request.query.limit;
        const products = await productManager.getProducts();

        limit ? response.json(products.slice(0, limit)) : response.json(products);
    }catch (error){
        console.log("Error getting products", error);
        response.status(500).json({error: "Server error"});
    }
})

app.get("/products/:pid", async (request, response) => {
    let id = request.params.pid;

    try{
        const product = await productManager.getProductsById(parseInt(id));

        product ? response.json(product) : response.json("Product not found");
    }catch (error){
        console.log("Error getting product", error);
        response.status(500).json({error: "Server error"});
    }
})

app.listen(PUERTO);