const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')

module.exports = { 
    config: {
        name: "lyrics",
        description: "Shows lyrics for songs",
        usage: " ",
        category: "music",
        accessableby: "Members",
        aliases: ["lyric"]
    },
    run: async (client, message, args) => {
        const song = args.join(" ");
        if(!song) return message.channel.send(":x: You need to send a song's name for me to search for!")
        const res = await fetch(`https://some-random-api.ml/lyrics?title=${song}}`)
        const lyrics = await res.json()
        if (lyrics.error) return message.edit(':x: I was unable to get that song!')
        const lyricembed = new MessageEmbed()
        .setTitle(lyrics.title + " lyrics | By: " + lyrics.author)
        .setURL(lyrics.links.genius)
        .setThumbnail(lyrics.thumbnail.genius)
        .setDescription(lyrics.lyrics)
        .setColor("RANDOM")
        if(lyricembed.description.length > 2000) {
        lyricembed.setDescription(lyrics.lyrics.slice(0, 1994) + "...")
        }
        message.channel.send(lyricembed) 

    }
}
