const fs = require("fs");
class CartManager{
    constructor(path){
        this.carts = [];
        this.path = path;
        this.lastId = 0;
        this.addCart();
    }

    async addCart(){
        const newCart = {
            id: ++this.lastId,
            products: []
        };

        this.carts.push(newCart);

        await this.saveCart();
        return newCart;
    }


    async getCartById(cartId){
        try{
            const cart = this.carts.find(c => c.id === cartId);

            if(!cart){
                throw new Error (`Doesn't exists cart with id ${cartId}`)
            }

            return cart;
        } catch (error){
            console.log("Error getting cart by id", error);
            throw error;
        }

    }

    async addProductToCart(cartId, productId, quantity = 1){
        const cart = await this.getCartById(cartId);
        const productExists = cart.products.find(p => p.product === productId);

        if(productExists){
            productExists.quantity += quantity;
        }else{
            cart.products.push({product : productId, quantity});
        }

        await this.saveCart();
        return cart;
    }

    async loadCart(){
        try {
            const answer = await fs.promises.readFile(this.path, "utf-8");
            const arrayCarts = JSON.parse(answer);
            
            if(arrayCarts.length > 0){
                this.lastId = Math.max(...arrayCarts.map(cart => cart.id));
            }

        } catch (error) {
            console.log("Error loading the carts from file", error);
            await this.saveCart();
        } 
    }
    async saveCart(){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error){
            console.log("Error saving file", error);
        }
    }

}

module.exports = CartManager;