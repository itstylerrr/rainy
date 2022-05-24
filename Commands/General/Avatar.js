module.exports = {
    name: "avatar",
    usage: ["Get a users avatar```{prefix}avatar <@user>```"],
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
            // Find user from guild cache
            let member = !args[0] ? null : await client.tools.resolveMember(args[0], message.guild);
            // Load the user
            let user = (!args[0] || !member) ? message.author : member.user;

            return client.embed.send(message, {
                title: `Avatar to ${user.username}`,
                fields: [
                    {
                        name: 'Links as',
                        value: `[png](${user.displayAvatarURL()}.png?size=1024]) | [jpg](${user.displayAvatarURL()}.jpg?size=1024) | [webp](${user.displayAvatarURL()}.webp?size=1024)`,
                    }
                ],
                image: {
                    url: `${user.displayAvatarURL()}?size=1024`
                }
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