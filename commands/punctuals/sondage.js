const { Command } = require('discord.js-commando');
const config = require("../../config.json");
const Discord = require('discord.js')


module.exports = class SondageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sondage',
      memberName: 'sondage',
      group: 'punctuals',
      description: 'Instancie un sondage',
        args: [{
            key: 'choix',
            prompt: 'Ajouter un choix ? ',
            type: 'string',
            infinite: true
        }]
    });
  }
  async run(message,args) {
      console.log(args);
      console.log(message);
      args['choix'].forEach(element => {
          message.say('choix n°' + i +' = ' + element)
          i++;
      });
  }
};

