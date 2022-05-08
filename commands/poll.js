const { MessageEmbed } = require("discord.js");
const emojies = require("../data/poll.js");
const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "poll",
  description: "Sets up a poll",
  type: "fun",
  async run(client, message, args) {
    const reactResponse = (mode) => {
      if (mode === "s") {
        return message.react("✅");
      } else if (mode === "f") {
        return message.react("❌");
      } else {
        return message.react(mode);
      }
    };

    // Embed Function
    reactResponse("s");
    let [pollDesc, ...options] = args
      .join(" ")
      .split('"')
      .filter((str) => {
        return str !== "" && str !== " ";
      });

    let jsonList = [];

    if (args.length > emojies.length) {
      reactResponse("f");
      const embedMsg = embedResponse(
        "RED",
        "Error!",
        `Please make sure that there are only ***${emojies.length}*** options for the poll!`
      );
      await message.channel.send({ embeds: [embedMsg] });
    } else {
      async function pollMessage() {
        try {
          for (let i = 0; i < options.length; i++) {
            jsonList.push({
              name: options[i],
              value: "Vote : `" + emojies[i] + "`",
            });
          }
          const pollEmbed = new MessageEmbed()
            .setColor("GOLD")
            .setTitle("Poll has begun!")
            .setDescription("**Poll** : `" + pollDesc + "`")
            .addFields(jsonList);
          let msg = await message.channel.send({ embeds: [pollEmbed] });
          for (let i = 0; i < options.length; i++) {
            await msg.react(emojies[i]);
          }
        } catch (err) {
          console.error(err);
        }
      }
      pollMessage();
    }
  },
};
