const fastifyPlugin = require('fastify-plugin') 
const { Client } = require('pg') 
require('dotenv').config() 
const client = new Client({ 
    host: process.env.POSTGRES_HOST, 
    port: process.env.POSTGRES_PORT, 
    user: process.env.POSTGRES_USER, 
    password:process.env.POSTGRES_PASSWORD, 
    database: process.env.POSTGRES_DB,
    ssl: true 
}) 
async function dbconnector(fastify, options) { 
    try { 
        await client.connect() 
        console.log("db connected succesfully") 
        fastify.decorate('db', {client}) 
    } catch(err) { 
        console.error(err) 
    } 
} 
module.exports= fastifyPlugin(dbconnector)