const embedResponse = require("../functions/embedMessage.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ig",
  description: "Responds with Formante's instagram",
  type: "basic",
  async run(client, message, args) {
    const embedMsg = embedResponse(
      "ORANGE",
      "Instagram",
      "Check out Candy Heist's Spotify!\n Click on the link above to redirect!",
      [],
      "https://www.instagram.com/candyheist",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/8de1e877-e549-431d-92fb-c7a4006b34ce-profile_image-300x300.png"
    );
    await message.react("✅");
    return message.channel.send({ embeds: [embedMsg] });
  },
};
