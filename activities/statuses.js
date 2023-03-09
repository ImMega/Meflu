const { client } = require("../main")

module.exports = async () => {
    client.activities = [
        {
            type: "LISTENING",
            name: [
                `daddy`,
                `bangers`,
                `silence`
            ]
        },
        {
            type: "PLAYING",
            name: [
                `osu!droid`,
                `with oni-chan`,
                `Arcaea`,
                `in basement`
            ]
        },
        {
            type: "WATCHING",
            name: [
                `anime`,
                `very appropriate stuff`,
                `skinning tutorials`,
                `souless in his room`
            ]
        }
    ]

    const skinAcademy = await client.guilds.fetch("864529121874018374");

    skinAcademy.members.fetch("910129237581774879").then((member) => {
        client.activities.find(m => m.type === "PLAYING").name.push("with " + member.user.username);
    })

    setInterval(() => {
        const random = Math.floor(Math.random() * (client.activities.length + 1));

        if(random > 0){
            const random2 = Math.floor(Math.random() * (client.activities[random - 1].name.length + 1));

            if(random2 > 0) client.user.setActivity(client.activities[random - 1].name[random2 - 1], {type: client.activities[random - 1].type});
        }
    }, 7000)
}