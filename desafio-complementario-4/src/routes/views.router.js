const express = require("express");
const router = express.Router();

const ViewController = require("../controllers/view.controller.js");
const viewController = new ViewController();


router.get("/products", viewController.renderProducts);
router.get("/carts/:cid", viewController.renderCart);
router.get("/login", viewController.renderLogin);
router.get("/register", viewController.renderRegister);
router.get("/realtimeproducts", viewController.renderRealTimeProducts);
router.get("/chat", viewController.renderChat);
router.get("/", viewController.renderHome);
router.get("/reset-password", viewController.renderResetPassword);
router.get("/password", viewController.renderChangePassword);
router.get("/confirmationsend", viewController.renderConfirmation);

module.exports = router; 