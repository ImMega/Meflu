const profileModel = require("../Models/profileSchema");
const { MessageEmbed } = require("discord.js");
const { default: isImageURL } = require("image-url-validator");
const validUrl = require("valid-url");

module.exports = {
    name: "skin",
    async execute(message, args, client){
        let profile = await profileModel.findOne({userID: message.author.id});

        if(args[0] === "set") return this.mainSet(message, args, client);

        const target = message.mentions.users.first();

        if(!args[1] && target) profile = await profileModel.findOne({userID: target.id});

        if(!profile) return message.reply({ content: "That user didn't set their main skin!\nActually... they didn't use me at all... sad face", allowedMentions: { repliedUser: false } });

        if(profile.mainSkin.name === "") return message.reply({ content: `${profile.userID === message.author.id ? `You didn't set your main skin!` : `That user didn't set their main skin!`}`, allowedMentions: {repliedUser: false} });
        const clientRoleClr = message.guild.members.cache.get(client.user.id).roles.highest.hexColor;

        const isImage = await isImageURL(profile.mainSkin.screenshots[0]);

        const embed = new MessageEmbed()
            .setColor(clientRoleClr)
            .addField(`${profile.userID === message.author.id ? `${message.author.username}` : `${target.username}`}'s main skin`, `\u200b\n**${profile.mainSkin.name}**\n[Download Link](${profile.mainSkin.link})\n\n${isImage ? `**Screenshot**` : ``}`)
        if(isImage) embed.setImage(profile.mainSkin.screenshots[0]);

        message.channel.send({ embeds: [embed] })
    },
    

    async mainSet(message, args, client){
        if(!args[1] || !args[2]) return message.reply({ content: "You do the command like this:\n`"+client.prefix+"skin set <skin link> <skin name>`\n\nAlso if you want you can attach a screenshot", allowedMentions: { repliedUser: false } });

        let skinLink = args[1];
        let skinName = args.slice(2).join(" ");
        let screenshot = message.attachments.map(file => file.url)[0] ? `${message.attachments.map(file => file.url)[0]}` : ``;

        if(!validUrl.isUri(skinLink)) return message.reply({ content: "The skin link is not valid!", allowedMentions: { repliedUser: false } });

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            mainSkin: {name: skinName, link: skinLink, screenshots: [screenshot]}
        });

        return message.reply({ content: "Succesfully set your new main skin!", allowedMentions: { repliedUser: false } });
    }
}