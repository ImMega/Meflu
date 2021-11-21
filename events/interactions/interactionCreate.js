const { client } = require("../../main");
const profileModel = require("../../models/profileSchema");

module.exports = async (interaction) => {
    if(client.maintenance === 1 && interaction.user.id !== "470277450551656459") return;

    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    let profileData;
    try {
        profileData = await profileModel.findOne({userID: message.author.id});

        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                mainSkin: {"name" : "", "link" : ""},
                skins: []
            });

            profile.save();
        }
    } catch(err){
        console.log(err);
    }

    if(command) command.execute(interaction);
}