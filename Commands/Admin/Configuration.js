const Discord = require('discord.js')

module.exports = {
  name: "configuration",
  usage: [
    "Get the current configurations for this server.",
    "Get list of configurations ```{prefix}configuration```",
  ],
  enabled: true,
  aliases: ["config"],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      let welcome = !data.guild.addons.welcome
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.welcome.channel}>\nImage: ${data.guild.addons.welcome.image}\nEmbed: ${data.guild.addons.welcome.embed}`;
      let goodbye = !data.guild.addons.goodbye
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.goodbye.channel}>\nImage: ${data.guild.addons.goodbye.image}\nEmbed: ${data.guild.addons.goodbye.embed}`;
      return client.embed.send(message, {
        description: `Use admins commands to change these settings`,
        fields: [
          {
            name: `Prefix`,
            value: `${data.guild.prefix}`,
            inline: true,
          },
          {
            name: `Welcome settings`,
            value: welcome,
            inline: true,
          },
          {
            name: `Goodbye settings`,
            value: goodbye,
            inline: true,
          },
        ],
        author: {
          name: `Guild Configurations`,
          icon_url: `${message.guild.iconURL()}`,
          url: "",
        },
      });
    } catch (err) {  
      const currentDate = new Date();
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
            value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`
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
    }
  },
};
