const { MessageEmbed } = require("discord.js");
const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "ping",
  description: "Responds with pong",
  type: "basic",
  async run(client, message, args) {
    const embedMsg = embedResponse(
      "RANDOM",
      "",
      "**Pong** : `" + (message.createdTimestamp - Date.now()) + "ms`"
    );
    await message.react("🏓");
    return message.channel.send({ embeds: [embedMsg] });
  },
};
