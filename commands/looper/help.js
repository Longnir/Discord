const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js')


module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hel',
      memberName: 'hel',
      group: 'looper',
      description: 'Lance une boucle de rappel sur le message',

    });
  }
  async run(message) {
    let tabMessageToClear = [];
    const boucle = setInterval(
      () => {
        const embed = new Discord.MessageEmbed();
        embed.setColor(15158332)
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField("Bah alors ?! Personne veut traiter ce message : ", message.content)
        .setTimestamp(new Date())
        .setFooter("© ITEA", message.author.avatarURL());

        message.embed(embed).then((msg) => {
          tabMessageToClear.push(msg);
        });

      },
      config.help_time_loop
    );
    const filter = (reaction, user) => reaction.emoji.name == "✅" || reaction.emoji.name == "⛔" || reaction.emoji.name == "👀";
    const collector = message.createReactionCollector(filter);
    collector.on('collect', () => {
      clearInterval(boucle);
      tabMessageToClear.forEach(element => {
        element.delete();
      });
    });
  }
};

