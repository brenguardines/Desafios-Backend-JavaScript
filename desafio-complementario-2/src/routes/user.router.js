const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcryp.js");
const passport = require("passport");

router.post("/", passport.authenticate("register", {failureRedirect: "/failedregister"}), async (request, response) => {
    const {first_name, last_name, email, password, role} = request.body;

    try{
        const userExists = await UserModel.findOne({email: email});
        if(userExists){
            return response.status(400).send({error: "Error the email is already registered"});
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: "user"
        });

        request.session.login = true;
        request.session.user = {...newUser._doc};

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