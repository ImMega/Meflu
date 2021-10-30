const profileModel = require("../../Models/profileSchema");
const { client } = require("../../main");

module.exports = async (message) => {
    if(!message.content.startsWith(client.prefix) || message.author.bot) return require("../../actions/msgInteractions").execute(message);

    if(client.maintenance === 1 && message.author.id !== "470277450551656459") return;

    const args = message.content.slice(client.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.cmdA.get(command));

    if(cmd.name === "msg") return cmd.execute(message, args);

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

    if(cmd){
        cmd.execute(message, args, client);
    }
}