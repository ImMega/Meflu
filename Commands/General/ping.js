module.exports = {
    name: "ping",
    aliases: [],
    description: "Shows bot's message ping",
    usage: "ping",
    permissions: [],
    execute(message){
        message.channel.send("Measuring message ping...").then(msg => {
            msg.edit(`My message ping is **${msg.createdTimestamp - message.createdTimestamp}ms**`);
        })
    }
}