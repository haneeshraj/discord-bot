module.exports = {
  name: "say",
  description: "Says back whatever the user entered!",
  type: "fun",
  async run(client, message, args) {
    return message.channel.send(args.join(" "));
  },
};
