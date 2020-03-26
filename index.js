const Discord = require('discord.js'); //Ce que le bot à besoin /
const client = new Discord.Client(); //Que votre Bot est un nouvel utilisateur
var prefix = "*"; //Prefix de votre Bot ( *play www.youtube.com/ )
client.login("NjkyNDI2NjMzMzIzMjE2OTA3.XnvIWQ.cApumdR6RG0pEHWcGniDW33DNTI"); //Token (Série de chiffre) propre a chaque Bot
client.on('ready', () => init())


function getVocalChannel() {
    var channel;
    client.channels.cache.each(element => {
        console.log(element)

        if (element.type === 'voice' && element.name === 'Général') {
            channel = element;
        }
    })
    return channel;
}

function getTextChannel() {
    var channel;
    client.channels.cache.each(element => {
        console.log(element)
        if (element.type === 'text' && element.name === 'général') {

            channel = element;
        }
    })
    return channel;
}
function init() {
    console.log('init');
    const voiceChannel = getVocalChannel();
    voiceChannel.join();
    client.on('message', msg => {
        if (msg.content === 'vivant?') {
            msg.reply('Evidemment !!')
        }
        if (msg.content === '!parrain') {
            action(msg.guild)
        }
        if(msg.content.match(/bot, envoi message/)){
            msg.mentions.users.each(member=>{
                member.createDM().then(dm=>{
                    dm.send(msg.author.username + ' te dis : "'+ msg.content.match(/:.*$/).replace(':','') + '"')
                });
            })
        }

    })
}
function getParrain(guild) {
    var parrains;
    guild.roles.cache.each(role => {
        if (role.name === 'Roi') {
            parrains = role.members
        }
    })
    return parrains
}


function action(guild) {
    client.user.setUsername('Roi bot');
    client.removeAllListeners('message')
    var channel = getTextChannel();
    var parrains = getParrain(guild);
    var txt;
    parrains.each(parrains => {
        txt = 'Le parrain est ' + parrains.user.username + "\n"
    })
    const texteParrain = new Discord.MessageEmbed()
        .setTitle('Parrain')
        .setColor('#0099ff').setDescription(txt).addField('Souhaitez-vous être le parrain ? ', '1. Oui  \n 2. Pas du tout')

    channel.send(texteParrain)
    client.on('message', msg => {
        var guild = msg.guild;
        var member = guild.member(msg.author);
        if (member.user.username === client.user.username) {
            return;
        }

        

        if (msg.content === '1') {
            //var promesse = member.setNickname('Roi');
            //promesse.catch(erreur => console.log('erreur nickname', erreur))           
            guild.roles.cache.each(role => {
                if (role.name === 'Roi') {
                    parrains.each(parrain => {
                        parrain.roles.remove(role)
                    })
                    member.roles.add(role)

                }
            });
            msg.reply('Vous êtes le roi');
        } else if (msg.content === '2') {
            guild.roles.cache.each(role => {
                if (role.name === 'Roi') {
                    member.roles.remove(role);
                }
                if (role.name === 'Pion') {
                    member.roles.add(role);
                }
            });
            member.setNickname('Pion');
            member.edit({ roles: guild.roles.cache.last });

            msg.reply('Vous êtes le pion');
        } else {
            msg.reply('Aucune action effectuée');
        }

        //client.on('message', msg => {});
        client.removeAllListeners('message')
        init();
    });
    //        channel.send("1. Je veux être le roi de ce serveur \n" + "2. as du tout")


}