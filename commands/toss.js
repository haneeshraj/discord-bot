const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "toss",
  description: "Flips a coin!",
  type: "fun",
  async run(client, message, args) {
    let coinNum = Math.floor(Math.random() * 2);
    let chance = ["Heads", "Tails"];
    const embedMsg = embedResponse(
      "GREY",
      `${chance[coinNum]}!`,
      `Coin shows it's **${chance[coinNum].toLowerCase()}**, Senpai 🙇`
    );
    await message.channel.send({ embeds: [embedMsg] });
    return message.react("✅");
  },
};
