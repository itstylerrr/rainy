const chalk = require('chalk')
const { discordjsVersion } = require('discord.js')

module.exports = async (client) => {
  const statusArray = [
    `help | 'help, WATCHING`,
    "the Discord bot scene, COMPETING",
    "over your server :), WATCHING",
    "tyler develop me, WATCHING",
  ];

  client.user.setStatus("idle");
  setInterval(() => {
    const random =
      statusArray[Math.floor(Math.random() * statusArray.length)].split(", ");
    const status = random[0];
    const mode = random[1];
    client.user.setActivity(status, { type: mode });
  }, 10000);

  console.log(chalk.red.bold("——————————[Details]——————————"));
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  );
  console.log(chalk.white(`Prefix:` + chalk.red(`'`)));
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
};
