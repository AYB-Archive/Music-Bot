const { MessageEmbed } = require("discord.js");
const { queue } = require('./play.js')
module.exports = { 
    config: {
        name: "pause",
        description: "pauses the music",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, guild, args) => {
	
    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel first!").catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
    return message.reply("There is nothing playing.").catch(console.error);
    }
  }
