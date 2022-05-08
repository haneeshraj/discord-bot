const embedResponse = require("../functions/embedMessage.js");

module.exports = {
  name: "kick",
  description: "kicks a user from the server!",
  type: "fun",
  async run(client, message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      const embedMsg = embedResponse(
        "RED",
        "Unauthorised!",
        "You do not have the permission to kick a user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    } else if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      const embedMsg = embedResponse(
        "RED",
        "Unauthorised!",
        "I do not have the permission to kick a user!"
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
        "Please mention a user you want to kick!"
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
        "Please mention a reason as to why you want to kick the user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }

    if (userPosition <= mentionedUserPosition) {
      const embedMsg = embedResponse(
        "RED",
        "Error while kicking user!",
        "Cannot kick this user as the role of the mentioned user has a higher hierarcy!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    } else if (botPosition <= mentionedUserPosition) {
      const embedMsg = embedResponse(
        "RED",
        "Error while kicking user!",
        "Cannot kick this user as the role of the mentioned user has a higher hierarcy!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }

    try {
      let embedMsg = embedResponse("GREEN", "Kicked a user!", "", [
        { name: "User", value: `${mentionedUser.user.tag}`, inline: true },
        { name: "Reason", value: `${reason}`, inline: true },
      ]);
      await message.channel.send({ embeds: [embedMsg] });
      embedMsg = embedResponse("GREEN", "You have been kicked!", "", [
        { name: "Server", value: `${message.guild.name}`, inline: true },
        { name: "Reason", value: `${reason}`, inline: true },
      ]);
      await mentionedUser.send({ embeds: [embedMsg] });
      await mentionedUser.kick(reason);
      return message.react("✅");
    } catch (error) {
      const embedMsg = embedResponse(
        "RED",
        "Error while kicking user!",
        "An error has occured while kicking the user!"
      );
      await message.channel.send({ embeds: [embedMsg] });
      return message.react("❌");
    }
  },
};
