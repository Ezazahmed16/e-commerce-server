require("dotenv").config();
const port = process.env.SERVER_PORT || 5002
const mongodburl = process.env.MONGODB_URL

module.exports = {
    port,
    mongodburl
}