const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "shuffle",
        description: "shuffles the queue",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, guild, args) => {


     const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);
    if (!serverQueue)
      return message.channel.send("Playlist is empty.").catch(console.error);

    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * (i));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    serverQueue.textChannel.send(`${message.author} 🔀 shuffled the queue`).catch(console.error);
  }

    }
  
