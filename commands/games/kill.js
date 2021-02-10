const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "attack",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: ['ataque', 'atacar']
        })
    }
    run = async (client, message, args ) => {

var list = [
  'https://media.tenor.com/images/fe987ba87dea8c9ac5f76123cee11358/tenor.gif',
  'https://media1.tenor.com/images/2291d3d08dd10a5fce38688f5ec77abb/tenor.gif?itemid=3581186',
  'https://i.imgur.com/tAYO7Sf.gif',
//   'https://i.imgur.com/Rox8rp5.gif',
//   'https://i.imgur.com/uuwDGQF.gif'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('Voce precisa mencionar alguem para poder mata-lo');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new MessageEmbed()
        .setTitle(`🔫 Matou 🔫`)
        .setColor('f62500')
        .setDescription(`**${message.author} Acaba de matar ${user} 🔫**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
}