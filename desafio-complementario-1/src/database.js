const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bguardines:coderhouse@cluster0.iuhkdwd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Successful connection"))
    .catch((error) => console.log(error))