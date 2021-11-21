const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "msg",
    data: new SlashCommandBuilder()
        .setName("msg")
        .setDescription("BOT CREATOR Sends the message as a bot")
        .addStringOption(option => option.setName("message").setDescription("Message to send").setRequired(true))
        .addChannelOption(option => option.setName("channel").setDescription("Channel to send message in"))
        .setDefaultPermission(false),
    async execute(interaction){
        if(interaction.user.id !== "470277450551656459") return;
        
        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");

        if(channel){
            channel.send(message);
            interaction.reply({ content: "Message should be sent", ephemeral: true });
        } else {
            await interaction.channel.send(message);
            interaction.reply({ content: "Message should be sent", ephemeral: true });
        }
    }
}