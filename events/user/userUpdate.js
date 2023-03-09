const { client } = require("../../main");

module.exports = (oldUser, newUser) => {
    if(oldUser.id === "910129237581774879"){
        client.activities.find(m => m.type === "PLAYING").name.pop();

        client.activities.find(m => m.type === "PLAYING").name.push("with " + newUser.username);
    }
}