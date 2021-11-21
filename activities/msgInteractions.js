module.exports = {
    execute(message){
        const wysi = message.guild.emojis.cache.find(e => e.name === "WYSI");
        const segs = message.guild.emojis.cache.find(e => e.name === "segs")
        const interactions = [
            {
                name: ["727"],
                responses: [
                    "when you see it",
                    "WYSI",
                    "funi number",
                    "wysi moment",
                    `${wysi}`,
                    `WYSI ${wysi}`
                ]
            },
            {
                name: ["segs"],
                responses: [
                    "segs?!?!!",
                    `${segs}`,
                    "yep, definitely segs",
                    "I love segs"
                ]
            }
        ]

        const found = interactions.find(i => i.name.includes(message.content.toLowerCase()));
        if(!found) return;

        const random = Math.floor(Math.random() * found.responses.length);

        if(random < found.responses.length) {
            message.channel.sendTyping();
            setTimeout(() => {message.channel.send(found.responses[random]); }, 2000);
        }
    }
}