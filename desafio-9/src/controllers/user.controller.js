const UserModel = require("../models/user.model.js");
const passport = require("passport");
const UserDTO = require("../dto/user.dto.js");

class UserController {
    async register (request, response) {
        const {first_name, last_name, email, password, age} = request.body;

    try{
        response.redirect("/products");
    } catch (error){
        console.log("Error creating the user: ", error);
        response.status(500).send({error: "Error saving the new user"});
    }
    }

    async profile(request, response){
        const userDTO = new UserDTO(request.user.first_name, request.user.last_name, request.user.role);
        const isAdmin = request.user.role === "admin";
        response.render("profile", {user: userDTO, isAdmin});
    }

    async admin(request, response) {
        if (request.user.user.role !== "admin") {
            return response.status(403).send("Denied Access");
        }
        response.render("admin");
    }
}

module.exports = UserController;