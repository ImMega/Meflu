const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../../models/profileSchema");
const isValidImage = require("everything-validator").isImageName;
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const validUrl = require("valid-url").isUri;

module.exports = {
    name: "skin",
    data: new SlashCommandBuilder()
        .setName("skin")
        .setDescription("Shows your or someone's main skin")
        .addSubcommand(subcommand =>
            subcommand
                .setName("view")
                .setDescription("Shows your or someone else's main skin")
                .addUserOption(option =>
                    option 
                        .setName("member")
                        .setDescription("The member you whose skin you want to see")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("set")
                .setDescription("Sets your main skin")
                .addStringOption(option =>
                    option
                        .setName("name")
                        .setDescription("The skin name")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("link")
                        .setDescription("The skin link")
                        .setRequired(false))),
    async execute(interaction){
        const { client } = require("../../main");

        const subcommand = interaction.options.getSubcommand();
        if(subcommand === "view") return this.view(interaction, client);
        if(subcommand === "set") return this.set(interaction);
    },

    async view(interaction, client){
        let profile = await profileModel.findOne({ userID: interaction.user.id });

        await interaction.deferReply();

        const target = interaction.options.getUser("member");

        if(target) profile = await profileModel.findOne({ userID: target.id });

        if(!profile) return interaction.editReply("That user didn't set their main skin!\nActually... they didn't use me at all... sad face");

        if(profile.mainSkin.name === "") return interaction.editReply(`${profile.userID === interaction.user.id ? `You didn't set your main skin!` : `That user didn't set their main skin!`}`);

        const isImage = await isValidImage(profile.mainSkin.screenshots[0]);

        const embed = new MessageEmbed()
            .setColor(interaction.guild.members.cache.get(client.user.id).displayHexColor)
            .addField(`${profile.userID === interaction.user.id ? `${interaction.user.username}` : `${target.username}`}'s main skin`, `\u200b\n**${profile.mainSkin.name}**\n[Download Link](${profile.mainSkin.link})\n\n${isImage ? `**Screenshot${profile.mainSkin.screenshots.length > 1 ? `s` : ``}**` : ``}`)
        if(isImage) embed.setImage(profile.mainSkin.screenshots[0]);

        if(!profile.mainSkin.screenshots.length > 1){
            interaction.editReply({ embeds: [embed] });
        } else {
            const getButtons = (pageNo) => {
                return new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId("prev")
                        .setEmoji("⏮️")
                        .setStyle("PRIMARY")
                        .setDisabled(pageNo === false || (pageNo < 0 || pageNo === 0)),
                    new MessageButton()
                        .setCustomId("next")
                        .setEmoji("⏭️")
                        .setStyle("PRIMARY")
                        .setDisabled(pageNo === false || !(pageNo < profile.mainSkin.screenshots.length - 1)))
            }

            const intrMsg = await interaction.editReply({ embeds: [embed], components: [getButtons(0)] })
            
            const collector = intrMsg.createMessageComponentCollector({ time: 60000, componentType: "BUTTON" });

            collector.pages = 0;

            collector.on("collect", i => {
                if(i.user.id !== interaction.user.id) return;

                if(i.customId === "next"){
                    collector.pages++
                } else if(i.customId === "prev"){
                    collector.pages--
                }

                if(!profile.mainSkin.screenshots[collector.pages]) return;

                embed.setImage(profile.mainSkin.screenshots[collector.pages])

                i.update({ embeds: [embed], components: [getButtons(collector.pages)] })
            });

            collector.on("end", i => {
                interaction.editReply({ embeds: [embed], components: [getButtons(false)] })
            })
        }
    },

    async set(interaction){
        await interaction.deferReply();

        const skinName = interaction.options.getString("name");
        const skinLink = interaction.options.getString("link");

        if(!validUrl(skinLink)) return interaction.editReply("The skin link is not valid!");

        const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("confirm")
                    .setLabel("Yes")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("cancel")
                    .setLabel("Nah")
                    .setStyle("DANGER"))

        const intrMsg = await interaction.editReply({ content: "Do you want to add some screenshots?", components: [row] });

        const collector = await intrMsg.createMessageComponentCollector({ time: 60000, componentType: "BUTTON" })

        collector.on("collect", async i => {
            if(i.user.id !== interaction.user.id) return;

            if(i.customId === "confirm"){
                const images = await i.update({ content: "Please send the screenshots within 2 minutes or respond with `nah` if you actually don't want to", components: [] })
                    .then(() => {
                        return interaction.channel.awaitMessages({ filter: r => { return r.author.id === interaction.user.id && (r.content.toLowerCase().startsWith("nah") || r.attachments.size > 0 && r.attachments.size < 11) }, max: 1, time: 120000, errors: ["time"] })
                            .then(collected => {
                                if(collected.first().content.toLowerCase().startsWith("nah")) return [false];
    
                                collected.first().delete();
    
                                return collected.first().attachments;
                            })
                            .catch(collected => {
                                return [false];
                            })
                    });
            
                const screenshots = await images.map(a => {
                    if(isValidImage(a.url)) return a.url;
                });

                const ssChannel = require("../../main").client.channels.cache.find(channel => channel.id === "913061950248861696");

                const msg = await ssChannel.send({ files: screenshots });

                const ss = await msg.attachments.map(a => {
                    return a.url;
                });
                
                upload(ss);
            }

            if(i.customId === "cancel"){
                upload([]);
            }
        })

        const upload = async (screenshots) => {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id
            }, {
                mainSkin: { name: skinName, link: skinLink, screenshots: screenshots }
            });
    
            interaction.editReply({ content: `Successfully set your main skin${screenshots[0] ? ` with ${screenshots.length} screenshots` : ``}!`, components: [] });
        }
    }
}