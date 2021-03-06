module.exports = {
    name: "help",
    usage: ["Get a list of the currently available commands ```{prefix}help```", "Get information about a specific command```{prefix}help <command>```"],
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
            let cmd = args[0] ? (await client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : null;
            if(cmd){
                let aliaseList = (cmd.aliases.length < 1) ? "None" : cmd.aliases.join("\n")
                return client.embed.send(message, {
                    color:'RANDOM',
                    title: `${cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)} Command`,
                    author: {
                        name: `rainy's help menu`,
                        icon_url: `${message.client.user.displayAvatarURL()}`,
                        url: "",
                    },
                    fields: [
                    {
                        name: '__Aliases__',
                        value: `${aliaseList}`
                    },
                    {
                        name: '__Cooldown__',
                        value: `${cmd.cooldown / 1000} Seconds`
                    },
                    {
                        name: '__Usage__',
                        value: `${cmd.usage.map(x => x.replace(/{prefix}/g, data.guild.prefix)).join("\n")}`
                    },
                    ]
                });
            }
            let categories = await client.commands.map(x => x.category).filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            });
            let cmdArr = []
            for(let i=0; i < categories.length; i++){
                let category = categories[i];
                let commands = await client.commands.filter(x => x.category === category).map(x => x.name);
                let cmdsCount = await client.commands.filter(x => x.category === category).size
                var totalCmds = await client.commands.size
                let cmdText = commands.length < 1 ? "None" : commands.join(", ");
                let obj = {
                    name: `${category} (${cmdsCount})`,
                    value: `\`\`\`${cmdText}\`\`\``
                }
                cmdArr.push(obj);
            }
            return client.embed.send(message, {
                author: {
                    name: `Rainy's Help Menu | Total Commands: ${totalCmds}`,
                    icon_url: message.client.user.displayAvatarURL()
                },
                description: `Type \`${data.guild.prefix}help [command]\` for more help. For example, ${data.guild.prefix}help blacklist`,
                fields: cmdArr,
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
              .setTitle("?????? Rainy | Errors ??????")
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
              .setTitle("?????? Rainy | Errors ??????")
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