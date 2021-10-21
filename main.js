require("dotenv").config();

const { Client, Intents } = require("discord.js");
const mongoose = require("mongoose");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

module.exports = { client }

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
.on("userUpdate", (oldUser, newUser) => {
    if(oldUser.id === "888876737914601472"){
        client.activities.find(m => m.type === "PLAYING").name.pop();

        client.activities.find(m => m.type === "PLAYING").name.push("with " + newUser.username);
    }
})

mongoose.connect(process.env.MONGO_SRV)
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.log(err);
})

client.login(process.env.TOKEN)