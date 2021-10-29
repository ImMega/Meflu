module.exports = {
    name: "msg",
    execute(message, args){
        if(message.author.id !== "470277450551656459") return;

        message.delete();
        message.channel.send(args.join(" "));
    }
}