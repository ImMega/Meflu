module.exports = {
    exeFind(client, command){
        const cmd = client.commands.get(command);

        if(cmd) return cmd;
    }
}