const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "coin-flip",
    usage: ["Flip a coin.```{prefix}coin-flip ```"],
    enabled: true,
    aliases: ["cf", "flip", "50/50"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 1000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            const n = Math.floor(Math.random() * 2);
            if (n === 1) {
                message.reply("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2006_Quarter_Proof.png/780px-2006_Quarter_Proof.png")
                message.channel.send('**HEADS**')
            } else {
                message.reply("https://www.nicepng.com/png/full/146-1464848_quarter-tail-png-tails-on-a-coin.png")
                message.channel.send('**TAILS**')
            }
        }catch(err){
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
            console.log(err)
            return client.embed.send(message, {
                description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
                color: `RED`,
                author: {
                    name: `Uh Oh!`,
                    icon_url: `${message.author.displayAvatarURL()}`,
                    url: "",
                }
            });
        }
    }
}