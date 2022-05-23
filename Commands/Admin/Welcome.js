const Discord = require('discord.js');
const { Client, Message, WebhookClient, MessageEmbed } = require('discord.js');
const { Webhooks, ownerid } =require("../../config.json");
const DB = require("../../Database/Schema/Guild");

module.exports = {
  name: "welcome",
  usage: [
    "When a user joins the server, send message to channel.",
    "Set channel for the welcome message```{prefix}welcome set #channel```",
    "Set up a custom welcome message```{prefix}welcome custom <text>```",
    "Disable the welcome message```{prefix}welcome disable```",
    "Disable the welcome message```{prefix}welcome disable```",
    "Test the welcome message```{prefix}welcome test```",
    "Give a user a role when they join the server. ```{prefix}welcome role <@role>```",
    "Available variables: ```{user.ping} - @-Tyler#7922\n{user.name} - -Tyler#7922\n{user.id} - 249955383001481216\n{user.tag} - -Tyler#7922#2487\n{guild.name} - rainy\n{guild.id} - 597797831478214696\n{guild.totalUser} - 123```",
  ],
  enabled: true,
  aliases: ["join"],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   */

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      // If no arguments then return usage error
      if (!args[0]) {
        return client.embed.usage(message, data);
      }

      // If addon for welcome is missing create it
      if (!data.guild.addons.welcome) {
        data.guild.addons.welcome = {
          enabled: false,
          channel: "",
          message: "",
          image: false,
          embed: false,
        };
        data.guild.markModified("addons.welcome");
        await data.guild.save();
      }

      // Disable welcome messages
      if (args[0].toLowerCase() === "disable") {
        // Disable the welcome messages
        data.guild.addons.welcome.enabled = false;
        data.guild.markModified("addons.welcome");
        await data.guild.save();
        return client.embed.send(message, {
          color: client.config.color,
          title: "Welcome disabled",
          description: `Welcome messages have been disabled.`,
        });
      }

      if (args[0].toLowerCase() === "test") {
        // If welcome messages are disabled or channel isn't set return error
        if (
          !data.guild.addons.welcome.enabled ||
          data.guild.addons.welcome.channel.trim() === ""
        ) {
          return message.channel.send(
            "Welcome messages are currently disabled."
          );
        }

        // Find the channel
        let channel = await client.tools.resolveChannel(
          data.guild.addons.welcome.channel,
          message.guild
        );
        let welcomeMsg =
          data.guild.addons.welcome.message === null ||
          data.guild.addons.welcome.message === "" ||
          data.guild.addons.welcome.message === " "
            ? "{user.ping} has joined the server!"
            : data.guild.addons.welcome.message; // Get the custom message or use the preset one

        // Replace all valid tags
        let fmsg = await welcomeMsg
          .replace("{user.ping}", `${message.author}`)
          .replace("{user.name}", `${message.author.username}`)
          .replace("{user.id}", `${message.author.id}`)
          .replace("{user.tag}", `${message.author.tag}`)
          .replace("{guild.name}", `${message.guild.name}`)
          .replace("{guild.id}", `${message.guild.id}`)
          .replace("{guild.totalUser}", `${message.guild.memberCount}`);

        return channel.send(fmsg);
      }

      // Return usage error as users missing arguments
      if (!args[1]) {
        return client.embed.usage(message, data);
      }

      // Set up welcome messages
      if (args[0].toLowerCase() === "set") {
        // Find the mentioned channel
        let channel = await client.tools.resolveChannel(args[1], message.guild);
        if (!channel)
          return message.channel.send("Unable to find the mentioned channel");

        // Enable welcome message and save channel
        data.guild.addons.welcome.enabled = true;
        data.guild.addons.welcome.channel = channel.id;
        data.guild.markModified("addons.welcome");
        await data.guild.save();

        // Return success message to user
        return client.embed.send(message, {
          color: client.config.color,
          title: "Channel set",
          description: `Welcome messages will be sent to ${channel}`,
        });
      }

      // Set up custom message for welcome messages
      if (args[0].toLowerCase() === "custom") {
        // Join arguments into a string
        let msg = args.slice(1).join(" ");
        // Save the message to the database
        data.guild.addons.welcome.message = msg;
        data.guild.markModified("addons.welcome");
        await data.guild.save();

        // Return success message to user
        return client.embed.send(message, {
          color: client.config.color,
          title: "Message set",
          description: `Welcome message has been set to: \`${msg}\``,
        });
      }

      if(args[0].toLowerCase() === "role") {
        if(args[1].toLowerCase() === "remove") {
          await DB.findOneAndUpdate({ id: message.guild.id }, {"addons.welcome.role": null});
          return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Removed the welcome role.`).setColor(client.config.color)] });
        }
        const mentionedRole = message.mentions.roles.first();
        let checkedRole = message.guild.roles.cache.find(x => x.id === mentionedRole.id);
        if (typeof checkedRole  === undefined) {
          return message.reply("you must mention a real role.");
         return;
        } else {
          if(message.guild.roles.cache.has(checkedRole.id)) {
            await DB.findOneAndUpdate({ id: message.guild.id }, {"addons.welcome.role": checkedRole.id});
            return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Set the welcome role to: <@&${checkedRole.id}>.`).setColor(client.config.color)] });
           }
        }
      }

      // None of the requirements were met so return usage error
      return client.embed.usage(message, data);
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      const currentDate = new Date();
      const keygen = require('keygen');
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
      return;
    }
  },
};
