const fs = require("fs");
const { Collection } = require("discord.js");

module.exports = {
    load(client){
        client.commands = new Collection();

        const cmdFiles = fs.readdirSync("./commands/")
        for (const file of cmdFiles){
            const cmd = require(`../commands/${file}`);

            client.commands.set(cmd.name, cmd);
        }
    }
}