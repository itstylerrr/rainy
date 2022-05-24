module.exports = {
    name: "botstats",
    usage: ["Information about the current statitics of the bot```{prefix}botstats```"],
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let uptime = await client.tools.convertTime(message.client.uptime);
            let ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
                return client.embed.send(message, {
                    color: 'RANDOM',
                    author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: 'Developers',
                            value: '```-Tyler#7922```',
                        },
                        {
                            name: 'Channels',
                            value: `\`\`\`${client.channels.cache.size}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Users',
                            value: `\`\`\`${client.guilds.cache.reduce((x, guild) => x + guild.memberCount, 0)}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Guilds',
                            value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'RAM usage',
                            value: `\`\`\`${ram}MB\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'API latency',
                            value: `\`\`\`${client.ws.ping} ms\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Uptime',
                            value: `\`\`\`${uptime}\`\`\``,
                        },
                    ],
                    footer: {
                        icon_url: client.user.displayAvatarURL(),
                    },
                })

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