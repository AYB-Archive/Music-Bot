
const { MessageEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        category: "utilities",
        usage: `<input>`
    },
    run: async (client, message, args) => {
                let hrStart = process.hrtime()
                hrDiff = process.hrtime(hrStart); 
	if (message.author.id !== "268843733317976066") return message.channel.send(`This command is used for Developers.`)
		try {
			let codein = args.join(" ");
			let code = eval(codein);
			if (typeof code !== 'string')
			code = require('util').inspect(code, { depth: 0 });
			let embed = new MessageEmbed()
			.setAuthor('Evaluate')
			.setColor("RANDOM")
			.addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
			.addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``);

			message.channel.send(embed);
		}
		catch (e) {
		message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
		}	
	
    }
}
