module.exports = {
    name: "ping",
    description: "Shows bot's message ping",
    execute(message){
        message.channel.send("Measuring message ping...").then(msg => {
            msg.edit(`My message ping is **${msg.createdTimestamp - message.createdTimestamp}ms**`);
        })
    }
}