const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcryp.js");
const passport = require("passport");

router.post("/", passport.authenticate("register", {failureRedirect: "/failedregister"}), async (request, response) => {
    const {first_name, last_name, email, password, age} = request.body;

    try{
        response.redirect("/products");
    } catch (error){
        console.log("Error creating the user: ", error);
        response.status(500).send({error: "Error saving the new user"});
    }
});

router.get("/failedregister", (request, response) => {
    response.send({error: "Failed register"});
})

module.exports = router; 