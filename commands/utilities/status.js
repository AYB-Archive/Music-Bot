const { MessageEmbed } = require("discord.js");
module.exports = { 
    config: {
        name: "status",
        description: "Sets bots status",
        usage: " ",
        category: "owner",
        accessableby: "Bot Dev",
        aliases: ["setstatus"]
    },
    run: async (client, message, args) => {
if (message.author.id !== "268843733317976066")
      return message.reply(
        "This command is used for Developers."
      );
      let nick = args.join(" ");
    client.user.setStatus(nick);
    message.channel.send("I changed my status!");
  
    }
  }