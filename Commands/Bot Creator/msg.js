module.exports = {
    name: "msg",
    aliases: ["say"],
    description: "Sends the message as a bot",
    usage: "msg <message>",
    permissions: ["Bot Creator"],
    execute(message, args){
        if(message.author.id !== "470277450551656459") return;

        message.delete();
        message.channel.send(args.join(" "));
    }
}