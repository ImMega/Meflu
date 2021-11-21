const { client } = require("../../main");

module.exports = async () => {
    console.log(`${client.user.username} is now online!`);

    require("../../activities/statuses")();
}