const { MessageEmbed } = require("discord.js");
const { client } = require("../../main");

module.exports = {
    name: "help",
    aliases: [],
    description: "Shows the command list or info about a specific command",
    usage: "help (command)",
    permissions: [],
    async execute(message, args){
        if(!args[0]){
            const embed = new MessageEmbed()
            .setColor(message.guild.members.cache.get(client.user.id).displayHexColor)
            .setTitle(`Yo, here's the command list`)
            .setDescription(`DM or ping <@470277450551656459> if anything goes wrong`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`${client.user.username} Command List`, client.user.displayAvatarURL({ dynamic: true }))

            const list = await client.categories.map(c => embed.addField(c.name, c.cmds.map(v => `\`${v}\``).join(` • `)));

            message.channel.send({ embeds: [embed] }) 
        } else {
            const cmd = client.commands.get(args[0]) || client.commands.get(client.cmdA.get(args[0]));

            if(!cmd) message.reply({ content: "That command doesn't exist!", allowedMentions: { repliedUser: false } });

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(message.guild.members.cache.get(client.user.id).displayHexColor)
                    .setTitle(client.prefix + cmd.name)
                    .setDescription(`${cmd.description}\n\n`
                                + `${cmd.aliases.length !== 0 ? `**Aliases:** \`${cmd.aliases.join(", ")}\`\n\n` : ` `}`
                                + `**Usage**\n\`${cmd.usage}\`\n\n`
                                + `${cmd.details ? `**Details**\n ${cmd.details}\n\n` : ` `}`
                                + `${cmd.permissions.length !== 0 ? `**Permissions:** \`${cmd.permissions.join(", ")}\`` : ``}`)
                ]
            })
        }
    }
}