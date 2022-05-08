// Requirements and Imports
const { Client, Intents, Collection } = require("discord.js");
const colors = require("colors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const connectDB = require("./config/db.js");
const embedResponse = require("./functions/embedMessage.js");

// .env Config
dotenv.config();

// Db connect
connectDB();

// Client Config
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// Comamnd Handler Setup
client.commands = new Collection();

const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Prefix
const prefix = "!";

client.on("messageCreate", async (message) => {
  // Command Response
  if (message.content.startsWith(prefix)) {
    const [cmd, ...args] = message.content
      .substring(prefix.length)
      .split(/\s+/);
    try {
      await client.commands.get(cmd).run(client, message, args);
    } catch (error) {
      console.error(error);
      return message.react("❌");
    }
  }

  // Custom Responses
  let customResponse = message.content;

  switch (customResponse) {
    case "ayy":
      message.channel.send("lmao");
      break;
    case "L":
      message.channel.send(
        `what is this + L + ratio + wrong + get a job + unfunny + you fell off + never liked you anyway + cope + ur allergic to gluten + don't care + cringe ur a kid + literally shut the fuck up + galileo did it better + your avi was made in MS Excel + ur bf is kinda ugly + i have more subscribers + owned + ur a toddler + reverse double take back + u sleep in a different bedroom from your wife + get rekt + i said it better + u smell + copy + who asked + dead game + seethe + ur a coward + stay mad + you main yuumi + aired + you drive a fiat 500 + the hood watches xqc now + yo mama + ok + currently listening to rizzle kicks without u. plus ur mind numbingly stupid plus ur voice is ronald mcdonald.`
      );
      break;
    case "W":
      message.channel.send(
        `W + Unratio + Fatherfull + Motherfull + Yes bitches + My mom + GG!👍 + Unreported + Ur good + My opinion enjoyer vs your opinion enjoyer + Sucessed ratio + You coped harder + Giga Chad moment + W + H0es not mad + Stay smiling + Dont kys`
      );
      break;
    case "ur gay":
      message.reply("candy heist moment");
      break;
    case "ok":
      message.channel.send("ok");
      break;
    case "mist":
      message.channel.send("he's sucking 5 cocks");
      break;
    case "candy":
      message.channel.send("who?");
      break;
    case "bvdlvd":
      message.channel.send("gay lad u mean?");
      break;
    case "gay":
      message.reply("candy heist moment");
      break;
    case "hi":
      message.channel.send(
        "https://ahseeit.com/telugu-meme-templates/king-include/uploads/2020/11/thumb_123173693_352581459363513_4045801601744452016_n-523137127.jpghttps://ahseeit.com/telugu-meme-templates/king-include/uploads/2020/11/thumb_123173693_352581459363513_4045801601744452016_n-523137127.jpg"
      );
      break;
    case "yo":
      message.channel.send("oh no he's here");
      break;

    default:
      break;
  }
});

// Client on error
client.on("error", (err) => console.error(err));

// Client on ready
client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: "with ur mom" }],
    status: "dnd",
  });
  console.log(`${client.user.tag} is now online!`.magenta.underline);
});

// Client login
client.login(process.env.DISCORD_CLIENT_TOKEN);
