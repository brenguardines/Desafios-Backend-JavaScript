const dotenv = require("dotenv");

dotenv.config();

const configObject = {
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;