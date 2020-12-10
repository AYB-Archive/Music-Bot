require("dotenv").config();
const { MessageEmbed, Collection } = require("discord.js");
const { readdirSync } = require("fs")
const  prefix = process.env.PREFIX
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "utilities",
        cooldown: { time: 3, users: [] },
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        



        let user = message.author;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${message.guild.me.displayName}'s Commands`, user.displayAvatarURL)
            

        if(!args[0]) {
            const categories = readdirSync("./commands/")


            embed.setFooter(`© ${message.guild.me.displayName}`);
          embed.setTimestamp()

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`> **${capitalise}** **(${dir.size})**`, dir.map(c => "`" + c.config.name + "`").join(", \n "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage."}
            **Cooldown:** 
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}
