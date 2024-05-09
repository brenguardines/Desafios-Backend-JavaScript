const passport = require("passport");

function isAuthenticated(request, response, next){
    passport.authenticate("session", {session:false}, (error, user, infor) => {
        if(error) return next(error);
        if(!user){
            request.user = null;
        }else {
            request.user = user;
        }
        next();
    })(request, response, next);
}

module.exports = isAuthenticated;