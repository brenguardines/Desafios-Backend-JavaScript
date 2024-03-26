const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager();
const CartModel = require("../models/cart.model.js");

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
    const cartId = request.params.cid;

    try{
        const cart = await CartModel.findById(cartId);
        response.json(cart.products);
    }catch (error){
        console.log("Error getting cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.post("/:cid/product/:pid", async (request, response) => {
    const cartId = request.params.cid;
    const productId = request.params.pid;
    const quantity = request.body.quantity || 1;

    try{
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        response.json(updateCart.products);
    }catch (error){
        console.log("Error add product to cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.delete("/:cid/product/:pid", async (request, response) => {
    const cartId = request.params.cid;
    const productId = request.params.pid;

    try{
        const updateCart = await cartManager.deleteProductToCart(cartId, productId);
        response.json({
            status: 'success',
            message: 'Product delete at cart successfully',
            updateCart});
    }catch (error){
        console.log("Error deleting product to cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.put("/:cid", async (request, response) => {
    const cartId = request.params.cid;
    const updatePorducts = request.body;

    try{
        const updateCart = await cartManager.updateCart(cartId, updatePorducts);
        response.json(updateCart);
    }catch (error){
        console.log("Error updating cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.put("/:cid/product/:pid", async (request, response) => {
    const cartId = request.params.cid;
    const productId = request.params.pid;
    const newQuantity = request.body.quantity;

    try{
        const updateCart = await cartManager.updateQuatityProducts(cartId, productId, newQuantity);
        response.json({
            status: 'success',
            message: 'Product quantity update successfully',
            updateCart});
    }catch (error){
        console.log("Error updating cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.delete("/:cid", async (request, response) => {
    const cartId = request.params.cid;

    try{
        const updateCart = await cartManager.emptyCart(cartId);
        response.json({
            status: 'success',
            message: 'All products at cart were delete successfully',
            updateCart});
    }catch (error){
        console.log("Error deleting product to cart", error);
        response.status(500).json({error: "Server error"});
    }
});

module.exports = router;