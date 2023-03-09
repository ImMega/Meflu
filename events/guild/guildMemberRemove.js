const { MessageEmbed } = require("discord.js");
const { client } = require("../../main");

module.exports = async (member) => {
    if(member.guild.id !== "864529121874018374") return;

    const date = new Date();

    const unverified = await member.roles.cache.some(role => role.id === "864709553672683540");
    const registrations = await member.guild.channels.fetch("864531949644021810");

    if(unverified) {
        if((date.getUTCMilliseconds() - member.joinedTimestamp) < 86400000) {
            registrations.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(member.guild.members.cache.get(client.user.id).displayHexColor)
                    .setTitle("Someone Unverified Just Left")
                    .setDescription(`**${member.user.username}** has left the server and they were not verified`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                ]
            })
        } else {
            registrations.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(member.guild.members.cache.get(client.user.id).displayHexColor)
                    .setTitle("An unverified person kicked")
                    .setDescription(`**${member.user.username}** has been kicked for not being registered after 24h`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                ]
            })
        }
    }
}