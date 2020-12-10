require('dotenv').config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const { play } = require("../../include/play.js"); 
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const { MessageEmbed } = require('discord.js');
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
module.exports = { 
    config: {
        name: "play",
        description: "plays music",
        usage: "song name or link",
        category: "music",
        accessableby: "Members",
        aliases: ["p"]
    },
    run: async (client, message, args, guild) => {
      const { channel } = message.member.voice;
      const user = message.guild.member(client.user)

    if (!args.length)
      return message
        .reply(`Usage: f!play <YouTube URL | Video Name>`)
        .catch(console.error);
    if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Cannot connect to voice channel: Missing Permissions");
    if (!permissions.has("SPEAK"))
      return message.reply("I cannot speak in this voice channel: Missing Permissions");
	

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 55,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          img: songInfo.videoDetails.video_image,
          duration: songInfo.videoDetails.lengthSeconds
        };

        const embed = new MessageEmbed()
        .setTitle(songInfo.videoDetails.title)
        .setURL(song.img)
        .setImage(songInfo.videoDetails.video_image)

      } catch (error) {
        if (error.message.includes("copyright")) {
          return message
            .reply("⛔ The video could not be played due to copyright protection ⛔")
            .catch(console.error);
        } else {
          console.error(error);
          return message.reply(error.message).catch(console.error);
        }
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
        };
      } catch (error) {
        console.error(error);
        return message.reply("There was an error trying to fetch that song, please redo the command.").catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(`✅ **${song.title}** has been added to the queue by ${message.author.username}`)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
      }
    }
    await user.voice.setSelfDeaf(true).catch(e => {
      console.log(`${message.guild.name} won't let me deafen myself.`)
    });
  }
};
