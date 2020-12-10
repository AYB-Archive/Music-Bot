const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "np",
        description: "shows what song is currently playing",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: [ ]
    },
    run: async (client, message, args) => {
      
	
        if (!message.member.voice.channel)
        return message.reply("You need to join a voice channel first!").catch(console.error);

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

        serverQueue.songs.map(song => { 

            const song_now = new MessageEmbed()
            .setTitle("Currently playing: ")
            .setDescription(`[${song.title}](${song.url})`)
            message.channel.send(song_now)
        });
    }
}
    
      
      
    
