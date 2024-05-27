const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcryp.js");
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

router.post("/", passport.authenticate("register", {failureRedirect: "/failedregister"}), userController.register);

router.get("/failedregister", (request, response) => {
    response.send({error: "Failed register"});
})

router.get("/profile", userController.profile);
router.get("/admin", userController.admin);
router.post("/requestPasswordReset", userController.requestPasswordReset);
router.post("/reset-password", userController.resetPassword);
router.put("/premium/uid", userController.changeRolPremium);



module.exports = router; 