module.exports = async (client) => {
    const guild = await client.guilds.fetch("864529121874018374");
    const unverifiedRole = await guild.roles.fetch("864709553672683540");
    const unverified = unverifiedRole.members;

    setInterval(() => {
        const date = new Date();
        
        unverified.forEach(async member => {
            if((date.getUTCMilliseconds() - member.joinedTimestamp) > 86400000) await member.kick("Didn't register on time.");
        });
    }, 60000)
}