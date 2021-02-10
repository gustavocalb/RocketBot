const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "kiss",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: ['beijo', 'beijar']
        })
    }
    run = async (client, message, args ) => {

var list = [
  'https://cdn.nekos.life/kiss/kiss_035.gif',
  'https://i.imgur.com/lYQt9rx.gif',
  'https://i.imgur.com/w1TU5mR.gif',
  'https://tenor.com/view/kisses-despicableme-gif-3575060',
  // ''
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('Voce precisa mencionar alguem para poder beija-lo');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new MessageEmbed()
        .setTitle(`💋 Beijim 💋`)
        .setColor('f62500')
        .setDescription(`**${message.author} Beijou ${user}**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
}