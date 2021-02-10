const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "rip",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run = async (client, message, args ) => {

var list = [
    'https://media1.tenor.com/images/58f72d6a4dc64bcca0755849a3ef95c0/tenor.gif?itemid=4949736',
    'https://i.gifer.com/TzZ7.gif',
    'https://media1.tenor.com/images/d5288ab38105ac1f6ad50c17e5fd798c/tenor.gif?itemid=13648662',
    'https://media1.tenor.com/images/683d45d57abb7ec45bccc501cabc4d07/tenor.gif?itemid=17319187'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
    return message.reply('Voce precisa mencionar alguem que morreu');
}
/*
message.channel.send(`${message.author.username} **acaba de bater** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new MessageEmbed()
        .setTitle('😭 Morreu 😭')
        .setColor('00f6cb')
        .setDescription(`**${user} Morreu**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
} 