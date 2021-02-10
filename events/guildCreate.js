const Guild = require('../models/Guild.js');
const Discord = require('discord.js');

module.exports = (client, guild, member) => {
  Guild.findOne({guildID: guild.id}, (err, doc) => {
    if(doc) {
      try {
        Guild.deleteOne({guildID: guild.id}).then(() => {
            console.log(`[LOGS] O bot acaba de ser adicionado em ${guild.name}`);
        }).then(() => {
              return new Guild({
                guildID: guild.id,
                guildName: guild.name,
                prefix: '!'
            }).save().then(() => {
              console.log(`[LOGS] O bot acaba de ser adicionado em ${guild.name}`);
            })
        })
      } catch (e) {
        console.log(e);
      }
    } else {
        return new Guild({
            guildID: guild.id,
            guildName: guild.name,
            prefix: '!'
      }).save().then(() => {
          console.log(`[LOGS] O bot acaba de ser adicionado em ${guild.name}`);
      }).catch((err) => {
          console.log(err);
      });
    }
  })

  const canal = client.channels.cache.get("738127224066277466");
  canal.setName("💻 | Servidores: " + client.guilds.cache.size);

  const registro = new Discord.MessageEmbed()
  .setTitle('Nova Guild Registrada')
  .setDescription(`**O bot acaba de ser adicionado em \`${guild.name}\`**`)
  .addField('Nome da Guild:', `**> ${guild.name}**`)
  .addField('ID da Guild:', `**> ${guild.id}**`)
  .addField('Dono:', `**> ${guild.owner}**`)
  .setColor('#00ffd0')
   const logs = client.channels.cache.get("738126641192239202");
   logs.send(registro)
}