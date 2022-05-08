const { MessageEmbed } = require("discord.js");
const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "roll",
  description: "Rolls a dice",
  type: "fun",
  async run(client, message, args) {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    const diceEmoji = [
      ":one:",
      ":two:",
      ":three:",
      ":four:",
      ":five:",
      ":six:",
    ];

    const embedMsg = embedResponse(
      "BLUE",
      "Get rolled, senpai",
      `Senpai rolled a ${diceEmoji[diceNum - 1]}`
    );
    await message.channel.send({ embeds: [embedMsg] });
    return message.react("✅");
  },
};
