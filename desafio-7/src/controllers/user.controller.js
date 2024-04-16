const UserModel = require("../models/user.model.js");
const { createHash } = require("../utils/hashbcryp.js");
const passport = require("passport");

class UserController {
    async register (request, response) {
        const {first_name, last_name, email, password, age} = request.body;

    try{
        response.redirect("/products");
    } catch (error){
        console.log("Error creating the user: ", error);
        response.status(500).send({error: "Error saving the new user"});
    }
    };
}

module.exports = UserController;