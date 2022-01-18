const simplydjs = require("simply-djs");

module.exports = {
    name: "calculator",
    usage: ["Do basic calculations```{prefix}calculator <operation>```", "Examples:```5 * 8\n3 / 3\n8 ~ 2```"],
    enabled: true,
    aliases: ["calc"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        simplydjs.calculator(message, {
            embedColor: "a0bff6"
          });
    }
}