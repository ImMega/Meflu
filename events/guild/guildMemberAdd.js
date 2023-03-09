const { MessageEmbed } = require("discord.js");
const { client } = require("../../main");

module.exports = async (member) => {
    if(member.guild.id !== "864529121874018374") return;

    member.roles.add("864709553672683540");
    
    const registrations = await member.guild.channels.fetch("864531949644021810");

    registrations.send({
        content: `<@${member.user.id}> Welcome!!!`,
        embeds: [
            new MessageEmbed()
            .setColor(member.displayHexColor)
            .setTitle(`🎉 ${member.user.username} Welcome to Skin Academy!!!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setImage("https://cdn.discordapp.com/attachments/913061950248861696/1083469666938261504/wbg.png")
            .setDescription("Before you can access the rest of the server, you first have to register here.\n\n"
            + "**How to register?**\nSimply send your osu!droid UID and in-game screenshot, cuz we don't want bots in here\n\n"
            + "And remember, you have 24h to register")
            .setTimestamp()
        ]
    })
}