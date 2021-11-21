const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "verify",
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("MODERATORS Verifies the member")
        .addUserOption(option => option.setName("member").setDescription("An unverified member").setRequired(true))
        .setDefaultPermission(false),
    async execute(interaction){
        const { client } = require("../../main");

        await interaction.deferReply();

        const target = interaction.options.getUser("member");

        const member = interaction.guild.members.cache.get(target.id)

        if(!member) return interaction.editReply("Couldn't find that member!");

        if(member.user.bot) return interaction.editReply("You can't verify bots!");

        if(interaction.user.id === member.id) return interaction.editReply("You can't verify yourself!");

        const unverified = member.roles.cache.some(role => role.id === "864709553672683540");
        const verified = member.roles.cache.some(role => role.id === "864536328937668638");

        if(!unverified && verified) return interaction.editReply("That member is already verified!");

        const unverifiedRole = interaction.guild.roles.cache.find(role => role.id === "864709553672683540");
        const gakuseiRole = interaction.guild.roles.cache.find(role => role.id === "864536328937668638");

        await member.roles.remove(unverifiedRole);
        await member.roles.add(gakuseiRole);

        const clientRoleClr = interaction.guild.members.cache.get(client.user.id).displayHexColor;

        interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setColor(clientRoleClr)
                    .setDescription(`${member} has been verified!`)
                    .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
            ]
        });
    }
}