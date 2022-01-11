const Discord = require("discord.js");
const rainy = require("../rainy");
const rainyConfig = require("../rainy.json");
const chalk = require("chalk");
const mongoose = require('mongoose')
const { version: discordjsVersion } = require("discord.js");


rainy.on("ready", async (interaction) => {
  const invite = rainy.generateInvite({
    scopes: ["applications.commands", "bot"],
    permissions: Discord.Permissions.FLAGS.ADMINISTRATOR,
  });

  //[ Status ]

  const statusArray = [
    `help | 'help, WATCHING`,
    "the Discord bot scene, COMPETING",
    "over your server :), WATCHING",
    "tyler develop me, WATCHING",
  ];

  rainy.user.setStatus("idle");
  setInterval(() => {
    const random =
      statusArray[Math.floor(Math.random() * statusArray.length)].split(", ");
    const status = random[0];
    const mode = random[1];
    rainy.user.setActivity(status, { type: mode });
  }, 10000);

  //[ Ready Event ]

  console.log(chalk.red.bold("——————————[Details]——————————"));
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${rainy.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${rainy.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        rainy.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${rainy.guilds.cache.size}`),
    chalk.white(`${rainy.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  );
  console.log(chalk.white(`Prefix:` + chalk.red(` ${rainyConfig.prefix}`)));
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`Simplicity : https://discord.gg/gjVjvwXBfQ`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
  console.log("");
  console.log(chalk.red.bold("——————————[MONGO]——————————"));
  mongoose.connect(rainyConfig.mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(
      chalk.gray(
        `Rainy connected to MONGO database.`
      )
    )
  }).catch((err) => {
    console.log(
      chalk.gray(
        `MONGO ERR: ${err}`
      )
    )
  })
});
