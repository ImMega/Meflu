const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "verify",
    description: "Verifies new member",
    async execute(message, args, client){
        const memberID = args[0].replace("<@!", "").replace("<@", "").replace(">", "");
        const target = message.guild.members.cache.get(memberID);

        if(target.user.bot) return message.reply({ content: "You can't verify bots!", allowedMentions: { repliedUser: false } });

        let kocho = message.member.roles.cache.some(role => role.id === `764241114575536148`);
        let kyoto = message.member.roles.cache.some(role => role.id === `877853144334368778`);
        
        if(!kocho && !kyoto) return message.reply({ content: "You can't do that!", allowedMentions: { repliedUser: false } });

        if(message.author.id === memberID) return message.reply({ content: "You can't verify yourself!", allowedMentions: { repliedUser: false } });

        let unverifiedHas = target.roles.cache.some(role => role.id === `859820754723668028`);

        if(!unverifiedHas) return message.reply({ content: "That member is already verified!", allowedMentions: { repliedUser: false } });

        const unverifiedRole = message.guild.roles.cache.find(role => role.id === "859820754723668028");
        const gakuseiRole = message.guild.roles.cache.find(role => role.id === "859820807165706270");

        target.roles.remove(unverifiedRole)
        await target.roles.add(gakuseiRole);

        const clientRoleClr = message.guild.members.cache.get(client.user.id).roles.highest.hexColor;

        const embed = new MessageEmbed()
            .setColor(clientRoleClr)
            .setDescription(`${target} has been verified!`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] })
    }
}