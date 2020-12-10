const { MessageEmbed } = require("discord.js");
module.exports = { 
    config: {
        name: "queue",
        description: "Shows the queue of songs",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, args) => {
 const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

    

    let queueEmbed = new MessageEmbed()
      .setTitle("AYB Music's Music Queue")
      .setDescription(serverQueue.songs.map((song, index) => `${index + 1}. [${song.title}](${song.url})`))
      .setColor("#F8AA2A");

    queueEmbed.setTimestamp();

    if(queueEmbed.description.length > 2000) return message.channel.send("The Queue can only go to 40-50 songs, so to add more let the queue go by.");

    message.channel.send(queueEmbed);
  
  }
};
