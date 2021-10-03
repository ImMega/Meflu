require("dotenv").config();

const { Client, Intents } = require("discord.js");
const mongoose = require("mongoose");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.prefix = "m!";

const rpc = require("./client/activities");

client
.on("ready", () => {
    console.log(`${client.user.username} is now online!`);

    require("./utils/filesLoad").load(client);
    rpc(client);
})
.on("messageCreate", message => {
    require("./events/messageCreate").run(message, client);
})

mongoose.connect(process.env.MONGO_SRV)
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.log(err);
})

client.login(process.env.TOKEN)