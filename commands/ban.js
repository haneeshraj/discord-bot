const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "ban",
  description: "bans a user from the server!",
  type: "fun",
  async run(client, message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      const embedMsg = embedResponse(
        "RED",
        "Unauthorised!",
        "You do not have the permission to ban a user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    } else if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      const embedMsg = embedResponse(
        "RED",
        "Unauthorised!",
        "I do not have the permission to ban a user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }

    // Reason
    let [userAttr, ...arg] = args;
    let reason = await arg.join(" ");

    if (!userAttr) {
      const embedMsg = embedResponse(
        "RED",
        "No user mentioned!",
        "Please mention a user you want to ban!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }
    // Role positions
    let mentionedUser = message.mentions.members.first();
    let mentionedUserPosition = mentionedUser.roles.highest.position;
    let userPosition = message.member.roles.highest.position;
    let botPosition = message.guild.me.roles.highest.position;

    if (!reason) {
      const embedMsg = embedResponse(
        "RED",
        "No reason specified!",
        "Please mention a reason as to why you want to ban the user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }

    if (userPosition <= mentionedUserPosition) {
      const embedMsg = embedResponse(
        "RED",
        "Error while baning user!",
        "Cannot ban this user as the role of the mentioned user has a higher hierarcy!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    } else if (botPosition <= mentionedUserPosition) {
      const embedMsg = embedResponse(
        "RED",
        "Error while banning user!",
        "Cannot ban this user as the role of the mentioned user has a higher hierarcy!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }

    try {
      let embedMsg = embedResponse("GREEN", "Banned a user!", "", [
        { name: "User", value: `${mentionedUser.user.tag}`, inline: true },
        { name: "Reason", value: `${reason}`, inline: true },
      ]);
      await message.channel.send({ embeds: [embedMsg] });
      embedMsg = embedResponse("GREEN", "You have been banned!", "", [
        { name: "Server", value: `${message.guild.name}`, inline: true },
        { name: "Reason", value: `${reason}`, inline: true },
      ]);
      await mentionedUser.send({ embeds: [embedMsg] });
      await mentionedUser.ban({ reason });
      return message.react("✅");
    } catch (error) {
      const embedMsg = embedResponse(
        "RED",
        "Error while banning user!",
        "An error has occured while banning the user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      console.log(error);
      return message.react("❌");
    }
  },
};
