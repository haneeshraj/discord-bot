const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "youtube",
  description: "Responds with Formante's youtube!",
  type: "fun",
  async run(client, message, args) {
    const embedMsg = embedResponse(
      "RED",
      "Youtube",
      "Check out Candy Heist's youtube!\n Click on the link above to redirect!",
      [],
      "https://www.youtube.com/channel/UCJIFPDt4YfEDdgs9gvdCnUw",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/8de1e877-e549-431d-92fb-c7a4006b34ce-profile_image-300x300.png"
    );
    await message.channel.send({ embeds: [embedMsg] });
    return message.react("✅");
  },
};
