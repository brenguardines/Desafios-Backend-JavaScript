const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();
const CartModel = require("../models/cart.model.js");

class CartController {
    async newCart(request, response) {
        try{
            const newCart = await cartRepository.addCart();
            response.json(newCart);
        }catch (error){
            console.log("Error add a new cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async getCart(request, response) {
        const cartId = request.params.cid;
    
        try{
            const cart = await CartModel.findById(cartId);
            response.json(cart.products);
        }catch (error){
            console.log("Error getting cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async addProductToCart(request, response) {
        const cartId = request.params.cid;
        const productId = request.params.pid;
        const quantity = request.body.quantity || 1;
    
        try{
            const updateCart = await cartRepository.addProductToCart(cartId, productId, quantity);
            response.json(updateCart.products);
        }catch (error){
            console.log("Error add product to cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async deleteProductToCart(request, response) {
        const cartId = request.params.cid;
        const productId = request.params.pid;
    
        try{
            const updateCart = await cartRepository.deleteProductToCart(cartId, productId);
            response.json({
                status: 'success',
                message: 'Product delete at cart successfully',
                updateCart});
        }catch (error){
            console.log("Error deleting product to cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async updateCart(request, response) {
        const cartId = request.params.cid;
        const updatePorducts = request.body;
    
        try{
            const updateCart = await cartRepository.updateCart(cartId, updatePorducts);
            response.json(updateCart);
        }catch (error){
            console.log("Error updating cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async updateQuatityProducts(request, response) {
        const cartId = request.params.cid;
        const productId = request.params.pid;
        const newQuantity = request.body.quantity;
    
        try{
            const updateCart = await cartRepository.updateQuatityProducts(cartId, productId, newQuantity);
            response.json({
                status: 'success',
                message: 'Product quantity update successfully',
                updateCart});
        }catch (error){
            console.log("Error updating cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
    
    async emptyCart(request, response) {
        const cartId = request.params.cid;
    
        try{
            const updateCart = await cartRepository.emptyCart(cartId);
            response.json({
                status: 'success',
                message: 'All products at cart were delete successfully',
                updateCart});
        }catch (error){
            console.log("Error deleting product to cart", error);
            response.status(500).json({error: "Server error"});
        }
    };
}

module.exports = CartController;