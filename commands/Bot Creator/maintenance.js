const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "maintenance",
    data: new SlashCommandBuilder()
        .setName("maintenance")
        .setDescription("BOT CREATOR Toggles the maintenance mode")
        .setDefaultPermission(false),
    async execute(interaction){
        const { client } = require("../../main");
        
        if(interaction.user.id !== "470277450551656459") return;

        if(client.maintenance === 0){
            client.maintenance = 1;
            interaction.reply({ content: "Maintenance mode turned on", ephemeral: true });
        } else if(client.maintenance === 1){
            client.maintenance = 0;
            interaction.reply({ content: "Maintenance mode turned off", ephemeral: true });
        }
    }
}