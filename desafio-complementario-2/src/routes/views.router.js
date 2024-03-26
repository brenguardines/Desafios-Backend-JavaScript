const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager();
const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager();


router.get("/products", async (request, response) => {
    try{
        const {page = 1, limit = 2} = request.query;
        const products = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });

        const newArray = products.docs.map(product => {
            const {_id, ...rest} = product.toObject();
            return rest;
        });

        response.render("products", {
            products: newArray,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
            user: request.session.user 
         });

    }catch (error){
        console.log("Error add a new cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.get("/carts/:cid", async (request, response) => {
    const cartId = request.params.cid;

    try{
        const cart = await cartManager.getCartById(cartId);

      if (!cart) {
         console.log(`Doesn't exists cart with id ${cartId}`);
         return res.status(404).json({ error: "Cart not found" });
      }

      const productsInCart = cart.products.map(p => ({
         product: p.product.toObject(),
         quantity: p.quantity
      }));

      response.render("carts", { products: productsInCart });

    }catch (error){
        console.log("Error add a new cart", error);
        response.status(500).json({error: "Server error"});
    }
});

router.get("/login", (request, response) => {
    if (request.session.login) {
        return response.redirect("/products");
    }
    response.render("login");
});

router.get("/register", (request, response) => {
    if (request.session.login) {
        return response.redirect("/products");
    }
    response.render("register");
});

module.exports = router; 