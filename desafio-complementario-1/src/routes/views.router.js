const express = require("express");
const router = express.Router();


router.get("/", async (request, response) => {
    response.render("chat");
})

module.exports = router; 