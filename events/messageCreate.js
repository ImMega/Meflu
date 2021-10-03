const profileModel = require("../Models/profileSchema");

module.exports = {
    async run(message, client){
        if(!message.content.startsWith(client.prefix) || message.author.bot) return;

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

        const args = message.content.slice(client.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = require("../utils/cmdFind").exeFind(client, command);

        if(cmd){
            cmd.execute(message, args, client);
        }
    }
}