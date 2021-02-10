const Discord = require('discord.js')
const Guild = require('../models/Guild');
const Profile = require('../models/Profile')

module.exports = async (client, member) => {
  // Profile.findOne({_id: member.guild.io}, function (err, doc) {
  //   if (!doc) {     
  //     new Profile({
  //        _id: member.guild.id, 
  //       userID: member.user.id,
  //       username: member.user.username
  //       }).save().then(() => {
  //         console.log("[LOGS] Um novo membro foi registrado!"); 
  //         })
  //   }
  // })
  let membros = client.guilds.cache.map((g) => g.memberCount).reduce((p, c) => p + c);
    Guild.findOne({
        guildID: member.guild.id
    }, function (err, doc) {
        if (doc.welcome.enabled === true) {
                let messageDescription = doc.welcome.messageDescription
                    .replace(
                      /{usuario}/g,
                      `${member}`
                    )
                    .replace(
                        /{usuario.id}/g,
                        `<@${member.user.id}>`
                      )
                    .replace(
                      /{usuario.tagnome}/g,
                      `${member.user.tag}`
                    )
                    .replace(
                      /{usuario.tag}/g,
                      `${member.user.discriminator}`
                    )
                    .replace(
                      /{servidor}/g,
                      `${member.guild.name}`
                    )
                    .replace(
                      /{usuario.nome}/g,
                      `${member.user.username}`
                    )
                    .replace(
                      /{usuarios}/g,
                      `${membros}`
                    ) 
                    let messageColor = doc.welcome.messageColor
                    .replace(
                      /{branco}/g,
                      `#ffffff`) 
                    .replace(
                      /{vermelho}/g,
                      `#ff0000`
                    ) 
                    .replace(
                      /{azul-claro}/g,
                      `#00d9ff`
                    ) 
                    .replace(
                      /{laranja}/g,
                      `#ff7b00`
                    ) 
                    .replace(
                      /{amarelo}/g,
                      `#fffb00`
                    ) 
                    .replace(
                      /{azul}/g,
                      `#0066ff`
                    ) 
                    .replace(
                      /{azul-escuro}/g,
                      `#0800ff`
                    ) 
                    .replace(
                      /{roxo}/g,
                      `#9500ff`
                    ) 
                    .replace(
                      /{roxo-escuro}/g,
                      `#8400ff`
                    ) 
                    .replace(
                      /{rosa}/g,
                      `#f700ff`
                    ) 
                    .replace(
                      /{verde}/g,
                      `#00ff22` 
                    )
                    .replace(
                      /{verde-escuro}/g,
                      `#089e00`
                    )
                    .replace(
                      /{verde-claro}/g,
                      `#88ff00`
                    )

                      let canal = member.guild.channels.cache.get(doc.welcome.channel)
                      if(!canal) {
                        return
                      }
                      if(!messageDescription){
                        return
                      }
                      if(!messageColor){
                        return
                      }
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${doc.welcome.messageTitle}`)
                    .setDescription(`**${messageDescription}**`)
                    .setColor(`${messageColor}`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setFooter(member.guild.name, member.guild.iconURL())
                    canal.send(`${member}`,embed)
        }
      })
    let doc = await Guild.findOne({
      guildID: member.guild.id,
    }, function (err, doc) {
      if (doc.config.autoRole.enabled) {
        let role = doc.config.autoRole.roleID
        if(!role) {
          return
        }
    member.roles.add(role)
      }
    })
}