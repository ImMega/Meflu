const fs = require("fs");

module.exports = (client) => {
    const loadir = (dir) => {
        const eventFiles = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));

        for(const file of eventFiles){
            const event = require(`../events/${dir}/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, event.bind(null));
        }

        if(eventFiles.length !== 0) console.log(`${dir} events loaded`)
    }

    ["client", "guild", "interactions", "message", "user"].forEach(e => loadir(e));
}