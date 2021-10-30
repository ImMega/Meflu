const { client } = require("../../main");

module.exports = {
    name: "maintenance",
    aliases: [],
    description: "Toggles the maintenance mode",
    usage: "maintenance",
    permissions: ["Bot Creator"],
    execute(message, args){
        if(message.author.id !== "470277450551656459") return;

        if(client.maintenance === 0){
            client.maintenance = 1;
            message.reply("Enabled the maintenance mode");
        } else if(client.maintenance === 1){
            client.maintenance = 0;
            message.reply("Disabled the maintenance mode");
        }
    }
}