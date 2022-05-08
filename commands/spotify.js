const embedResponse = require("../functions/embedMessage.js");
module.exports = {
  name: "spotify",
  description: "Responds with Formante's spotify!",
  type: "fun",
  async run(client, message, args) {
    const embedMsg = embedResponse(
      "GREEN",
      "Spotify",
      "Check out Candy Heist's Spotify!\n Click on the link above to view his discography!",
      [],
      "https://open.spotify.com/artist/4FdwQi5zjjEQDUCGSQLjRz?si=027240886caf496e",
      "https://static-cdn.jtvnw.net/jtv_user_pictures/8de1e877-e549-431d-92fb-c7a4006b34ce-profile_image-300x300.png"
    );
    await message.channel.send({ embeds: [embedMsg] });
    return message.react("✅");
  },
};
