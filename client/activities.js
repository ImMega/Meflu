module.exports = async (client) => {
    const activities = [
        {
            type: "LISTENING",
            name: [
                `daddy`,
                `bangers`
            ]
        },
        {
            type: "PLAYING",
            name: [
                `osu!droid`,
                `with oni-chan`
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

    setInterval(() => {
        const random = Math.floor(Math.random() * (activities.length + 1));

        if(random > 0){
            const random2 = Math.floor(Math.random() * (activities[random - 1].name.length + 1));

            if(random2 > 0) client.user.setActivity(activities[random - 1].name[random2 - 1], {type: activities[random - 1].type});
        }
    }, 7000)
}