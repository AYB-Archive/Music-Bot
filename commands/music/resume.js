const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "resume",
        description: "resumes the music",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, guild, args) => {


     const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error);
    }
    return message.reply("There is nothing playing.").catch(console.error);
  }

    }
  
