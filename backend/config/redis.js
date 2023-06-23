require("dotenv").config()
const Redis = require("ioredis")
let configuration = {
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password: process.env.Redis_Lab_Pass
}
const client = new Redis(configuration)

module.exports = {client}