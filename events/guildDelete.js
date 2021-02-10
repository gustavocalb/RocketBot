const Guild = require('../models/Guild.js');
const Discord = require('discord.js')
module.exports = (client, guild) => {
    try {
        Guild.deleteOne({guildID: guild.id}).then(() => {
            console.log(`[LOGS] O bot acaba de ser retirado da guild ${guild.name} `);
        });
    } catch (e) {
        console.log(e);
    }
    const canal = client.channels.cache.get("738127224066277466");
   canal.setName("💻 | Servidores: " + client.guilds.cache.size);
   const registro = new Discord.MessageEmbed()
  .setTitle('Uma Guild foi Deletada')
  .setDescription(`**O bot acaba de ser retirado da Guild \`${guild.name}\`**`)
  .addField('Nome da Guild:', `**> ${guild.name}**`)
  .addField('ID da Guild:', `**> ${guild.id}**`)
  .setColor('#00ffd0')
   const logs = client.channels.cache.get("738126641192239202");
   logs.send(registro);
}