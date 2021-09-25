require("dotenv").config();

const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.prefix = "m!";

client
.on("ready", () => {
    console.log(`${client.user.username} is now online!`);

    require("./utils/filesLoad").load(client);
})
.on("messageCreate", message => {
    require("./events/messageCreate").run(message, client);
})

client.login(process.env.TOKEN)