const { Command } = require('discord.js-commando');
const { User, Messages } = require('../../dbObjects');
const Discord = require('discord.js')


module.exports = class RolesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roles',
      memberName: 'roles',
      group: 'parametrage',
      description: 'Permet de selectionner son rôle ',
      args: [{
        key: 'nom',
        prompt: 'Quel personne voulez vous chercher ?',
        type: 'string',
        default: ''
      }],
    });
  }

  async run(message, args) {
    if (args.nom) {
      User.findAll().then(allUsers => {
        allUsers.forEach(user => {
          var member = message.channel.members.get(user.id_user.toString())
          if (member !== undefined && member.user.username === args.nom) {
            if (user.teletravail) {
              var reponse = ' est ';
            } else {
              var reponse = ' n\'est pas ';
            }
            message.channel.send(args.nom + reponse + 'en télétravail');
          }
        });
      })
    } else {
      initialisation(message.channel);
    }
  }
}


function initialisation(channel) {

  channel.send(
    `Ce salon permet de choisir des "statuts" de manière automatique. Pour cela, il faut cliquer sur la réaction souhaitée. Certains statuts sont automatiques (donc pas de réaction)
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    `
  )


  channel.send(
    `- teletravail : `
  ).then(async (m) => {
    m.react("👍");
    m.react("👎").then(assigneReactionCollector(m))
  });

}

async function setTeletravail(member, emoji) {
  console.log(member);
  if (emoji === '👎') {
    value = false;
  } else {
    value = true;
    member.setNickname("🏡 " + user.username);

  }

  var user = await User.findOne({ where: { id_user: member.id } })
    .then(function (user) {
      if (user) {
        user.update({ teletravail: value })
      } else {
        User.create({
          id_user: member.id,
          teletravail: value
        });
      }
    });
}

function assigneReactionCollector(message) {
  const filter = (reaction, user) => (reaction.emoji.name == "👍" || reaction.emoji.name == "👎") && !user.bot;
  const collector = message.createReactionCollector(filter);
  collector.on('collect', async (reaction, member) => {
    setTeletravail(member, reaction.emoji.name);
    reaction.users.remove(member);
  })
}