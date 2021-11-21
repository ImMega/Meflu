const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows the command list"),
    async execute(interaction){
        const { client } = require("../../main");
        
        const embed = new MessageEmbed()
            .setColor(interaction.guild.members.cache.get(client.user.id).displayHexColor)
            .setTitle(`Yo, here's the command list`)
            .setDescription(`DM or ping <@470277450551656459> if anything goes wrong`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`${client.user.username} Command List`, client.user.displayAvatarURL({ dynamic: true }))

        const list = await client.categories.map(c => embed.addField(c.name, c.cmds.map(v => `\`${v}\``).join(" • ")));

        interaction.reply({ embeds: [embed] });
    }
}