const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager("./src/models/cart.json");

router.post("/", async (request, response) => {
    try{
        const newCart = await cartManager.addCart();
        response.json(newCart);
    }catch (error){
        console.log("Error add a new cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.get("/:cid", async (request, response) => {
    const cartId = parseInt(request.params.cid);

    try{
        const cart = await cartManager.getCartById(cartId);
        response.json(cart.products);
    }catch (error){
        console.log("Error getting cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.post("/:cid/product/:pid", async (request, response) => {
    const cartId = parseInt(request.params.cid);
    const productId = request.params.pid;
    const quantity = 1;

    try{
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        response.json(updateCart.products);
    }catch (error){
        console.log("Error add product to cart", error);
        response.status(500).json({error: "Server error"});
    }
});


module.exports = router;