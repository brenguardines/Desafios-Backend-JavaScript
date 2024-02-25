const CartModel = require("../models/cart.model.js");

class CartManager{
    async addCart(){
        try{
            const newCart = new CartModel({products : []});
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error add new cart", error);
            throw error;
        }
    }

    async getCartById(cartId){
        try{
            const cart = await CartModel.findById(cartId);

            if(!cart){
                throw new Error (`Doesn't exists cart with id ${cartId}`);
            }

            return cart;

        } catch (error) {
            console.log("Error getting cart by id", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1){
        try{
            const cart = await this.getCartById(cartId);
            const productExists = cart.products.find(p => p.product.toString() === productId);

            if(productExists){
                productExists.quantity += quantity;
            }else{
                cart.products.push({product : productId, quantity});
            }

            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            console.error("Error add product", error);
            throw error;
        }
    }
}

module.exports = CartManager;