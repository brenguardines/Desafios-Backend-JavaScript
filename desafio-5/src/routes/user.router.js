const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcrypt.js");

router.post("/", async (request, response) => {
    const {first_name, last_name, email, password} = request.body;

    try{
        const userExists = await UserModel.findOne({email: email});
        if(userExists){
            return response.status(400).send({error: "Error the email is already registered"});
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password)
        });

        request.session.login = true;
        request.session.user = {...newUser._doc};

        response.redirect("/products");
    } catch (error){
        console.log("Error creating the user: ", error);
        response.status(500).send({error: "Error saving the new user"});
    }
});

module.exports = router; 