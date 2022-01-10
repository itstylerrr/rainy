const fs = require("fs");
const { readdirSync } = fs;
const rainy = require("../rainy");
const chalk = require("chalk");

console.log(chalk.red.bold("︴﹏﹏﹏﹏﹏RAINY COMMANDS﹋﹋﹋﹋﹋﹋︴"));

// COMMANDS
readdirSync("./commands").forEach(async (dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  commands.map((cmd) => {
    let file = require(`../commands/${dir}/${cmd}`);

    let name = file.name || "No command name.";
    let aliases = file.aliases || [];

    let option = name == "No command name." ? "❌" : "✅";

    if (name != "No command name.") {
      rainy.commands.set(name, file);
      if (aliases.length < 1) return;
      aliases.forEach((alias) => {
        rainy.aliases.set(alias, file);
      });
    } else {
      if (aliases.length < 1) return;
      aliases.forEach((alias) => {
        rainy.aliases.set(alias, file);
      });
    }

    console.log(`Loaded Command ${option} | ${name}`);
  });
});

console.log(chalk.red.bold("︴﹏﹏﹏﹏﹏RAINY EVENTS﹋﹋﹋﹋﹋﹋﹋︴"));

//EVENTS
readdirSync("./events").forEach(async (event) => {
  const eventName = event.replace(".js", "");
  require(`../events/${event}`);
  console.log("Loaded Event ✅ | " + eventName);
});

console.log(chalk.red.bold("︴﹏﹏﹏﹏﹏RAINY (/)COMMANDS﹋﹋﹋﹋﹋︴"));
