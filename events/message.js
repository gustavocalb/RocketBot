const Guild = require('../models/Guild.js');
const Profile = require('../models/Profile')
const Discord = require('discord.js');

const timexp = new Set();

module.exports = async (client, message, member) => {
  Guild.findOne({guildID: message.guild.id}, (err, doc) => { 
      if(!doc){
        return new Guild({
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: '!'
      })
    }
    let prefix = doc.prefix;

    const mentionsbot = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`
    **Olá Tripulante!!**
    **Me chamo ${client.user.username} e sou um simples Bot para Discord focado em Moderação e Diversão de todas as comunidades!!**
    
    **Meu prefix nesse servidor é \`${prefix}\`**

    **Tem alguma duvida sobre meus comandos ou funções? Basta acessar meu site [Rocket | Home](https://rocketz.glitch.me) !**
    `)
    .setThumbnail(client.user.displayAvatarURL())
 if (message.content == (`<@!${client.user.id}>`)) return message.channel.send(`${message.author}`, mentionsbot)
  })

  Profile.countDocuments({userID: message.author.id}, (err, doc) => { 
    if(message.author.bot) return;
    if (!doc) {     
      new Profile({
        guildID: message.guild.id, 
        userID: message.author.id,
        username: message.author.username
        }).save().then(() => {
            console.log("[LOGS] Um novo membro foi registrado!"); 
        })
     }
 })

  if (timexp.has(message.author.id)) return;
  timexp.add(message.author.id);
  setTimeout(() => {
    timexp.delete(message.author.id);
  }, 5000);
  Profile.findOne({
      userID: message.author.id
    },
    function (erro, doc) {
      if (doc) {
        doc.xp += Math.floor(Math.random() * 9) + 1;
        if (doc.xp > doc.level * 1000) {
          doc.level += 1
          doc.xp = 0
          const levelup = new Discord.MessageEmbed()
        .setTitle('Novo Level')
        .setDescription(`**${message.author} Você acaba de subir para o level ${doc.level} 🎉**`)
        .setColor('RANDOM')
        message.channel.send(levelup)
            .then(msg => msg.delete({timeout: 8000}));
        }
        doc.save();
      }
    }
  );
  
}