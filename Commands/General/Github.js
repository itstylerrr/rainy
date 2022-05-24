const fetch = require('node-fetch');
module.exports = {
    name: "github",
    usage: ["Get basic information about a github repo```{prefix}github <username> <repo name>```"],
    enabled: false,
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

        let user = !args[0] ? "itstylerrr" : args[0];
        let repo = !args[1] ? "rainy" : args[1];
        
        let github = await fetch(`https://api.github.com/repos/${user}/${repo}`);

        if(github.status === 200){
            let repoJson = await github.json();
            return client.embed.send(message, {
                author: {
                    name: repoJson.owner.login,
                    icon_url: repoJson.owner.avatar_url,
                    url: '',
                },
                description: `${repoJson.description}\n[Repository Link](${repoJson.html_url})`,
                fields: [
                    {
                        name: 'Repo Name :notepad_spiral:',
                        value: repoJson.name,
                        inline: true
                    },
                    {
                        name: 'Stars :star:',
                        value: repoJson.stargazers_count,
                        inline: true,
                    },
                    {
                        name: 'Forks :gear:',
                        value: repoJson.forks,
                        inline: true,
                    },
                    {
                        name: 'Language :desktop:',
                        value: repoJson.language,
                        inline: true,
                    },
                ],
                image: {
                    url: repoJson.owner.avatar_url
                }
            });
        }else{
            return message.channel.send("Unable to find the mentioned github.")
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