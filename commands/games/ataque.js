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
    run(client, message, args ) {

var list = [
    'https://thumbs.gfycat.com/ContentNauticalAnura-size_restricted.gif',
    'https://pa1.narvii.com/6608/f3cb22f37184bad859a8990b874c428ea14742ab_hq.gif',
    'https://thumbs.gfycat.com/DisgustingCloudyEmperorpenguin-size_restricted.gif',
//     'https://portal.educacao.go.gov.br/wp-content/uploads/2020/04/giphy-1-2.gif',
//     'https://media3.giphy.com/media/Hp4lpOT1Ns60o/giphy.gif',
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
        .setTitle('👾 Ataquee 👾')
        .setColor('00f6cb')
        .setDescription(`**${message.author} Atacou ${user}**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
         message.channel.send(embed);
    }
  }  