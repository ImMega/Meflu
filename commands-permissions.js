const { client } = require("./main");

module.exports = async (message) => {
    console.log("segs")
    const fullPermissions = [
        {
            id: "912016408777478187",
            permissions: [
                {
                    id: "470277450551656459",
                    type: "USER",
                    permission: true
                }
            ]
        },
        {
            id: "912016408777478186",
            permissions: [
                {
                    id: "470277450551656459",
                    type: "USER",
                    permission: true
                }
            ]
        },
        {
            id: "912016408777478188",
            permissions: [
                {
                    id: "412584103481704448",
                    type: "USER",
                    permission: true
                },
                {
                    id: "864532450151628860",
                    type: "ROLE",
                    permission: true
                },
                {
                    id: "864533085458268210",
                    type: "ROLE",
                    permission: true
                }
            ]
        }
    ]

    fullPermissions.forEach(async (cmd) => {
        const perms = cmd.permissions;

        if(perms) client.application.commands.permissions.set({ guild: message.guild.id, command: cmd.id, permissions: perms }).then(console.log).catch(console.error);
    });
}