const { MessageEmbed } = require("discord.js");
const { client } = require("../../main");

module.exports = (member) => {
    if(member.guild.id !== "864529121874018374") return;

    const unverified = member.roles.cache.some(role => role.id === "864709553672683540");
    const registrations = member.guild.channels.cache.find(channel => channel.id === "864531949644021810");

    if(unverified){
        console.log("is unverified");
        registrations.send({
            embeds: [
                new MessageEmbed()
                .setColor(member.guild.members.cache.get(client.user.id).displayHexColor)
                .setTitle("Someone Just Left")
                .setDescription(`**${member.user.username}** has left the server, also, they were not verified`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            ]
        });
    } else {
        console.log("is verified");
    }
}