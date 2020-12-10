const { MessageEmbed } = require("discord.js");
module.exports = { 
    config: {
        name: "ping",
        description: "get bots ping",
        usage: " ",
        category: "utilities",
        cooldown: 5,
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, args) => {
const em = new MessageEmbed()
.setDescription("Client Latency = " +
          client.ws.ping)
    message.channel.send(em)
    
  }
}

