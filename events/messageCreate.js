module.exports = {
    run(message, client){
        if(!message.content.startsWith(client.prefix) || message.author.bot) return;

        const args = message.content.slice(client.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if(cmd){
            cmd.execute(message, args, client);
        }
    }
}