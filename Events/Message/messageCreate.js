module.exports = (message) => {
    if(message.content.startsWith("m!cmdperms") && message.author.id === "470277450551656459") return require("../../commands-permissions")(message);

    require("../../activities/msgInteractions").execute(message);
}