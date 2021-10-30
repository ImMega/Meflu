const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "verify",
    aliases: [],
    description: "Verifies a new member",
    usage: "verify <mention user>",
    permissions: ["Moderator"],
    async execute(message, args, client){
        if(!message.mentions.members.first()) return message.reply({ content: "You need to mention a user you want to verify!", allowedMentions: { repliedUser: false } });

        const memberID = args[0].replace("<@!", "").replace("<@", "").replace(">", "");
        const target = message.guild.members.cache.get(memberID);

        if(!target) return message.reply({ content: "Couldn't find that member!", allowedMentions: { repliedUser: false } });

        if(target.user.bot) return message.reply({ content: "You can't verify bots!", allowedMentions: { repliedUser: false } });

        let kocho = message.member.roles.cache.some(role => role.id === `864532450151628860`);
        let kyoto = message.member.roles.cache.some(role => role.id === `864533085458268210`);
        
        if(!kocho && !kyoto) return message.reply({ content: "You can't do that!", allowedMentions: { repliedUser: false } });

        if(message.author.id === memberID) return message.reply({ content: "You can't verify yourself!", allowedMentions: { repliedUser: false } });

        let unverifiedHas = target.roles.cache.some(role => role.id === `864709553672683540`);

        if(!unverifiedHas) return message.reply({ content: "That member is already verified!", allowedMentions: { repliedUser: false } });

        const unverifiedRole = message.guild.roles.cache.find(role => role.id === "864709553672683540");
        const gakuseiRole = message.guild.roles.cache.find(role => role.id === "864536328937668638");

        await target.roles.remove(unverifiedRole)
        await target.roles.add(gakuseiRole);

        const clientRoleClr = message.guild.members.cache.get(client.user.id).roles.highest.hexColor;

        const embed = new MessageEmbed()
            .setColor(clientRoleClr)
            .setDescription(`${target} has been verified!`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })
    }
}