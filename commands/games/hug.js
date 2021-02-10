const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "hug",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: ['abraçar']
        })
    }
    run = async (client, message, args ) => {

var list = [
    'https://i.pinimg.com/originals/02/7e/0a/027e0ab608f8b84a25b2d2b1d223edec.gif',
    'https://media1.tenor.com/images/8a4db61a1017d08731713cb112288926/tenor.gif?itemid=16247270',
    'https://media1.tenor.com/images/6a82afbd12b2c1f7be0922ed03be1b40/tenor.gif?itemid=15505649',
    'https://portal.educacao.go.gov.br/wp-content/uploads/2020/04/giphy-1-2.gif',
    'https://media3.giphy.com/media/Hp4lpOT1Ns60o/giphy.gif',
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
    return message.reply('Voce precisa mencionar alguem para poder abraçar');
}
/*
message.channel.send(`${message.author.username} **acaba de bater** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new MessageEmbed()
        .setTitle('🤤 Abraço 😊')
        .setColor('00f6cb')
        .setDescription(`**${message.author} Abraçou ${user}**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
}