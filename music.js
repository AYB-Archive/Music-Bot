require('dotenv').config()
const { Client, Collection } = require("discord.js");
const client = new Client();
client.queue = new Map();


["aliases", "commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(process.env.TOKEN);