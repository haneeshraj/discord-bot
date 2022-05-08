const { MessageEmbed } = require("discord.js");

function embedResponse(
  color = "WHITE",
  title = "",
  desc = "",
  fields = [],
  url = "",
  tn = ""
) {
  const embedMsg = new MessageEmbed()
    .setURL(url)
    .setThumbnail(tn)
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setFields(fields);
  return embedMsg;
}

module.exports = embedResponse;
