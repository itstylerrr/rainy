const chalk = require("chalk");
const fs = require("fs");
const { readdirSync } = fs;
const rainy = require("../rainy");
const rainyConfig = require('../rainy.json')

const slashCommands = [];

//SLASH COMMANDS
readdirSync("./slashCommands").forEach(async (dir) => {
  const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  commands.map(async (cmd) => {
    let file = require(`../slashCommands/${dir}/${cmd}`);

    let name = file.name || "No command name.";
    let description = file.description || "No description.";

    const data = {
      name,
      description,
    };

    let option = name == "No command name." ? "❌" : "✅";

    console.log(`Loaded Slash Command ${option} | ${name}`);

    if (option == "✅") {
      rainy.slash_commands.set(name, {
        ...data,
        run: file.run,
      });

      slashCommands.push(data);
    }
  });
});

rainy.guilds.fetch(rainyConfig.supportServer).then(async (g) => {
  if (rainy.isReady()) {
    await g.commands.set(slashCommands);
    console.log(chalk.blue.bold("(/) Update:"), chalk.grey("Commands set..."));
  } else {
    setTimeout(async () => {
      await g.commands.set(slashCommands);
      console.log(chalk.blue.bold("(/) Update:"), chalk.grey("Commands set..."));
    }, 3100);
  }
});

console.log("┈┈┈┈┈MAIN┈┈┈┈┈");
