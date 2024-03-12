const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { isValidPassword } = require("../utils/hashbcrypt.js");

router.post("/login", async (request, response) => {
    const {email, password} = request.body;
    try{
        const user = await UserModel.findOne({email: email});
        if(user){
            if(isValidPassword(password,user)){
                request.session.login = true;
                request.session.user = {...user._doc};

                response.redirect("/products");
            }else{
                response.status(401).send({error: "Invalid password"});
            }
        }else{
            response.status(404).send({error: "User not found"});
        }
    } catch(error){
        response.status(404).send({error: "Error in login"});
    }
    
})

router.get("/logout", (request, response) => {
    if(request.session.login){
        request.session.destroy();
    }
    response.redirect("/login");
 })
 
 module.exports = router;