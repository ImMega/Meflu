const fs = require("fs");
const { Collection } = require("discord.js");

module.exports = {
    load(client){
        client.commands = new Collection();

        function folderSearch(folder){
            const files = fs.readdirSync(folder.join(""));
            
            for (const file of files){
                if(fs.existsSync(folder.join("") + file)){
                    const stats = fs.lstatSync(folder.join("") + file);

                    if(stats.isDirectory()){
                        folder.push(file + "/");
                        fileLoad(folder);
                    }
                }
            }
        }

        function fileLoad(folder){
            // console.log(folder[folder.length - 1].replace(/\./g, "").replace(/\//g, ""))

            const files = fs.readdirSync(folder.join("")).filter(file => file.endsWith(".js"));

            for (const file of files){
                const cmd = require("." + folder.join("") + file);
                
                client.commands.set(cmd.name, cmd);
            }

            folderSearch(folder);
        }

        let folder = ["./commands/"];
        
        // client.categories = [];
        
        fileLoad(folder);

        // const cmdFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
        // for (const file of cmdFiles){
        //     const cmd = require(`../commands/${file}`);

        //     client.commands.set(cmd.name, cmd);
        // }
    }
}