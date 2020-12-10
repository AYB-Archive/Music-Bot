const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "skip",
        description: "skips a song",
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
      return message.channel.send("There is nothing playing that I could skip for you.").catch(console.error);

    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error);
    }
}