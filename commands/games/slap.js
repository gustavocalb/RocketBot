const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "slap",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: ['bater']
        })
    }
    run = async (client, message, args ) => {

var list = [
  'https://cdn.discordapp.com/attachments/744905673044656218/751968813905477652/slap_007.gif',
  'https://cdn.nekos.life/slap/slap_001.gif',
  'https://media1.tenor.com/images/c7dece5cdd4cee237e232e0c5d955042/tenor.gif?itemid=4902914',
  'https://media.tenor.com/images/7f65326a907d57d2fa5e80c046c8b42b/tenor.gif',
  'https://tenor.com/view/spank-tomandjerry-gif-5196956'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('Voce precisa mencionar alguem para poder bater');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new MessageEmbed()
        .setTitle(`Tampa`)
        .setColor('f62500')
        .setDescription(`**${message.author} deu um Tapa em ${user}**`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter(`${message.author.tag}`)
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
}