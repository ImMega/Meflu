const fs = require("fs");
const { Collection } = require("discord.js");

module.exports = {
    load(client){
        client.commands = new Collection();

        const folder = ["./commands/"];
        
        // client.categories = [];
        
        this.fileLoad(client, folder);
    },

    fileLoad(client, folder){
        const files = fs.readdirSync(folder.join("")).filter(file => file.endsWith(".js"));

        for (const file of files){
            const cmd = require("." + folder.join("") + file);
            
            if(cmd.name && cmd.execute) client.commands.set(cmd.name, cmd);
        }

        this.folderSearch(client, folder);
    },

    folderSearch(client, folder){
        const files = fs.readdirSync(folder.join(""));
            
        for (const file of files){
            if(fs.existsSync(folder.join("") + file)){
                const stats = fs.lstatSync(folder.join("") + file);

                if(stats.isDirectory()){
                    folder.push(file + "/");
                    this.fileLoad(client, folder);
                }
            }
        }
    }
}