const Discord = require("discord.js");
const { CanvasRenderService } = require("chartjs-node-canvas");
const { Webhooks, ownerid } =require("../../config.json");
const DB = require("../../Database/Schema/Guild");

const width = 1200;
const height = 375;
const chartCallback = (ChartJS) => {
  ChartJS.defaults.global.elements.rectangle.borderWidth = 2;

  ChartJS.plugins.register({});
  ChartJS.controllers.MyType = ChartJS.DatasetController.extend({});
};
const canvasRenderService = new CanvasRenderService(
  width,
  height,
  chartCallback
);
// White color and bold font
const ticksOptions = [
  { ticks: { fontColor: "white", fontStyle: "bold", fontSize: "12" } },
];
const options = {
  // Hide legend
  legend: { display: false },
  scales: { yAxes: ticksOptions, xAxes: ticksOptions },
};

module.exports = {
  name: "invites",
  usage: [
    "See the dates at which the most amount of users have joined your server```{prefix}invites <days>```",
  ],
  enabled: false,
  aliases: [],
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
      const guildDb = await DB.findOne({
        id: message.guild.id,
      });
      chFromDb = guildDb.addons.settings.loggingId;
      const findCh = await client.tools.resolveChannel(chFromDb, message.guild);
      if (!findCh) {
      } else {
        const currentDate = new Date();
        const logEmbed = new Discord.MessageEmbed()
          .setTitle("📜 rainy's logging 📜")
          .addFields(
            { name: "Command Name:", value: data.cmd.name },
            { name: "Command Type:", value: data.cmd.category },
            { name: "Ran By:", value: `<@${message.author.id}>` },
            { name: "Ran In:", value: `<#${message.channel.id}>` },
            { name: "Time Ran:", value: `${currentDate.toLocaleString()} CST` },
            { name : "Timestamp:", value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`}
          )
          .setFooter(
            `Ran by: ${message.member.displayName}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        findCh.send({ embeds: [logEmbed] });
      }
      let days = isNaN(Number(args[0])) ? 30 : Number(args[0]);
      let times = await fetchTimes(message.guild, days);

      if (times === false)
        return message.channel.send(
          "No members have joined your server within this time frame"
        );

      let lastXDays = await times.map((x) => x.date);
      let amountJoined = await times.map((x) => x.amount);
      var userAmount = 0;
      for (let i = 0; i < amountJoined.length; i++) {
        userAmount += amountJoined[i];
      }
      let colorArr = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF",
      ];
      let color = await colorArr[Math.floor(Math.random() * colorArr.length)];
      const image = await canvasRenderService.renderToBuffer({
        type: "line",
        data: {
          labels: lastXDays,
          datasets: [
            {
              data: amountJoined,
              borderColor: `${color}`,
              fill: true,
              backgroundColor: `${color}80`,
            },
          ],
        },
        options,
      });

      const attachment = new Discord.MessageAttachment(image, "image.png");
      console.log(image);
      let embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name} Joined Users`,
          message.guild.iconURL()
        )
        .setDescription(
          `In the past ${args[0]} days ${userAmount} users have joined this server`
        )
        .setFooter(data.config.footer)
        .setColor(color);
      return message.reply({ embeds: [embed]});
      async function fetchTimes(guild, days) {
        let limit = Date.now() - days * 86400000;
        let memberTimes = await guild.members.cache
          .filter((x) => x.user.bot !== true)
          .map((x) => x.joinedTimestamp)
          .filter((x) => x > limit)
          .filter((x) => x);
        await memberTimes.sort((a, b) => a - b);
        if (memberTimes.length < 1) return false;
        let date = new Date();
        let data = {};
        for (let i = 0; i < memberTimes.length; i++) {
          let joinedDate = new Date(memberTimes[i]);
          let verify = await checkDate(date, joinedDate);
          if (verify.check) {
            if (!data[verify.secondDate]) {
              data[verify.secondDate] = {
                date: verify.secondDate,
                amount: 1,
              };
              date = joinedDate;
            } else {
              data[verify.secondDate].amount++;
              date = joinedDate;
            }
          } else {
            date = joinedDate;
            if (!data[verify.secondDate]) {
              data[verify.secondDate] = {
                date: verify.secondDate,
                amount: 1,
              };
            } else {
              data[verify.secondDate].amount++;
              date = joinedDate;
            }
          }
        }

        let arrData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            let newData = { date: data[key].date, amount: data[key].amount };
            arrData.push(newData);
          }
        }

        return arrData;
      }

      async function checkDate(firstDate, secondDate) {
        let first = `${firstDate.getDate()}-${firstDate.getMonth()}-${firstDate.getFullYear()}`;
        let second = `${secondDate.getDate()}-${secondDate.getMonth()}-${secondDate.getFullYear()}`;
        let check = first === second;
        let checkedData = {
          check: check,
          firstDate: first,
          secondDate: second,
        };
        return checkedData;
      }
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      const currentDate = new Date();
      const keygen = require('keygen');
      const errKey = keygen.url(10);
      const errorLog = new Discord.WebhookClient({
        url: Webhooks.errors,
      });
      const devEmbed = new Discord.MessageEmbed()
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
  
      const userEmbed = new Discord.MessageEmbed()
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
