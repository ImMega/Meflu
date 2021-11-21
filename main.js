require("dotenv").config();

const { Client, Intents } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

module.exports = { client }

client.prefix = "m!";
client.maintenance = 0;

fs.readdirSync("./Handlers").filter(file => file.endsWith(".js"))
.forEach(handler => require(`./handlers/${handler}`)(client));

mongoose.connect(process.env.MONGO_SRV)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(err));

client.login(process.env.TOKEN);