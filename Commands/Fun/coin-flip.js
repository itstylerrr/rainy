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
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
            console.log(err);
            const { WebhookClient, MessageEmbed } = require("discord.js");
            const { Webhooks } = require("../../config.json");
            const currentDate = new Date();
            const keygen = require("keygen");
            const errKey = keygen.url(10);
            const errorLog = new WebhookClient({
              url: Webhooks.errors,
            });
            const devEmbed = new MessageEmbed()
              .setTitle("⛈️ Rainy | Errors ⛈️")
              .setDescription(`**Error:**\n\n${err}\n`)
              .addFields(
                { name: "Command:", value: data.cmd.name },
                { name: "Error Key:", value: `\`${errKey}\`` },
                {
                  name: "Guild:",
                  value: `Name: ${message.guild.name} | ID: ${message.guild.id}`,
                  inline: true,
                },
                {
                  name: "Author:",
                  value: `Name: ${message.author.tag} | ID: ${message.author.id}`,
                  inline: true,
                },
                {
                  name: "Created:",
                  value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`,
                }
              )
              .setColor("RED");
      
            const userEmbed = new MessageEmbed()
              .setTitle("⛈️ Rainy | Errors ⛈️")
              .setDescription(
                `An error has occured running this command. Please DM <@${ownerid}> with the following error key: \`${errKey}\``
              )
              .setColor("RED");
            message.reply({ embeds: [userEmbed] });
            errorLog.send({ embeds: [devEmbed] });
            return;
        }
    }
}