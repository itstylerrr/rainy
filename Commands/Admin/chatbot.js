const Discord = require('discord.js');

module.exports = {
    name: "chatbot",
    usage: ["Set the channel that the chatbot will work in. ```{prefix}chatbot #<channel>``` To disable: ```{prefix}chatbot remove```"],
    enabled: false,
    aliases: [],
    category: "Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        const channelId = await client.tools.resolveChannel(args[0], message.guild)
        try{
            if (!args[0]) {
                message.reply('You must set a channel for the bot to interact in. To disable, make the first argument `remove`, ```{prefix}chatbot remove```')
            }

            if(!data.guild.addons.settings){
                data.guild.addons.settings = { cbChId: false }
                data.guild.markModified('addons.settings');
                await data.guild.save()
            };

            if (args[0].toLowerCase() === "remove") {
                data.guild.addons.settings.cbChId = false
                data.guild.markModified('addons.settings');
                await data.guild.save()
                message.reply('Removed chatbot.')
                return;
            }

            if (channelId.id) {
                data.guild.addons.settings.cbChId = channelId.id
                data.guild.markModified('addons.settings');
                await data.guild.save()
                message.reply(`I have set the chatbot to interact with the channel #<${channelId.id}>`)
            }
        }catch(err){
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
            console.log(err)
            message.reply('You must mention a channel such as... `#chatbot`. Please avoid general channels.')
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