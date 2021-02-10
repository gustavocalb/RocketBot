const { Comando } = require('../../utils/command')
const { MessageEmbed, MessageFlags } = require('discord.js')
const Profile = require('../../models/Profile')
const emoji = require('../../utils/emojis.json')
const moment = require('moment')
const Guild = require('../../models/Guild')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "work",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run(client, message, args ) { 
      Guild.findOne({ guildID: message.guild.id }, async (err, doc) => {

      const trabalhos = new MessageEmbed()
      .setTitle('💼  Menu de Trabalhos  💼')
      .setDescription(` 
        **Seja Bem-Vindo(a) a central de Trabalhos Rocket! 
        
        Aqui você poderá trabalhar para ganhar seus coins para poder gastar em nossa Loja!**

        **Alguns dos nossos trabalhos irá ter alguns requisitos para você poder trabalhar! Caso não tenha os itens necessarios poderá trabalhar como Lixeiro sem preocupação de requisitos!**

        **Temos Disponibilidades nos empregos:**

        ** > ${emoji.lixeiro} Lixeiro**
        ** > 🚗 Uber**
        ** > 🎣 Pescaria**
        ** > ⛏️ Minerador**

        **Para trabalhar utilize ${doc.prefix}Work <trabalho> Exemplo: ${doc.prefix}Work Pescaria**
      `)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setColor('#ff9100')
      if(!args[0]) return message.channel.send(`${message.author}`, trabalhos)
      switch (args[0].toLowerCase()) {
        case 'uber':
          Profile.findOne({ userID: message.author.id }, async function(err, doc) {
            if(doc.uber === false){
              Guild.findOne({ guildID: message.guild.id }, async (err, doc) => {
              return message.channel.send(`${message.author} Você precisa de um carro para trabalhar como Uber! Compre em nossa loja utilizando ${doc.prefix}Loja`)
              })
            } else {
            if (doc.uber === true) {
              let corridas = Math.round(Math.random() * 15);
              if(corridas === 0){
                return corridas = 1
              }
              let valorcorrida = 100
             let ganhou = valorcorrida * corridas
              const time = moment.duration.format(
                [moment.duration(parseInt(doc.work) + 86400000 - Date.now())],
                "D MMMM YYYY, h:mm:ss"
              );
              if (parseInt(doc.work) + 86400000 <= Date.now()) {
                if(doc){
                  if(doc.carro === 0){
                    doc.uber = false
                    doc.save()
                    return message.channel.send(`${message.author} Seu carro está precisando fazer uma revisão! Vai até a nossa loja e faça a revisão do seu carro! `)
                  }
                  doc.money += ganhou;
                  doc.work = Date.now();
                  doc.carro -= 1
                  doc.save();
                  message.channel.send(`${message.author} Você fez ${corridas} corridas e ganhou ${ganhou} coins!`)
                }
              } else {
                message.reply(
                  `Ops.. Você está cansado de mais para trabalhar novamente! Espere ${time} para trabalhar novamente!`
                );
              }
            } else {
              const newUser = new Profile ({
                guildID: message.guild.id,
                guildName: message.guild.name,
                userID: message.author.id,
                username: message.author.tag,
                vip: false
              });
      
              try {
                newUser.save();
                console.error(`Perfil de ${message.author.tag} foi criado`)
              } catch (err) {
                console.error(err);
              }
              message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
            }
          }
          }
        );
              break

              case 'pescaria':
                Profile.findOne({ userID: message.author.id }, async function(err, doc) {
                  if(doc.pescaria === false){
                    Guild.findOne({ guildID: message.guild.id }, async (err, doc) => {
                    return message.channel.send(`${message.author} Você precisa de uma vara de pescar para trabalhar na pescaria! Compre em nossa loja utilizando ${doc.prefix}Loja`)
                    })
                  } else {
                  if (doc.pescaria === true) {
                    let peixes = Math.round(Math.random() * 20);
                    if(peixes === 0){
                      return peixes = 1
                    }
                    let valorpeixe = 30
                   let ganhoupeixescoins = valorpeixe * peixes
                    const time = moment.duration.format(
                      [moment.duration(parseInt(doc.work) + 86400000 - Date.now())],
                      "D MMMM YYYY, h:mm:ss"
                    );
                    if (parseInt(doc.work) + 86400000 <= Date.now()) {
                      if(doc){
                        if(doc.vara === 0){
                          doc.pescaria = false
                          doc.save()
                          return message.channel.send(`${message.author} Sua vara acabou quebrando em sua ultima prescaria! Compre outra em nossa loja para poder pescar novamente!`)
                        }
                        doc.money += ganhoupeixescoins;
                        doc.work = Date.now();
                        doc.vara -= 1
                        doc.save();
                        message.channel.send(`${message.author} Você pescou ${peixes} peixes e acabou ganhando ${ganhoupeixescoins} coins!`)
                      }
                    } else {
                      message.reply(
                        `Ops.. Você está cansado de mais para trabalhar novamente! Espere ${time} para trabalhar novamente!`
                      );
                    }
                  } else {
                    const newUser = new Profile ({
                      guildID: message.guild.id,
                      guildName: message.guild.name,
                      userID: message.author.id,
                      username: message.author.tag,
                      vip: false
                    });
            
                    try {
                      newUser.save();
                      console.error(`Perfil de ${message.author.tag} foi criado`)
                    } catch (err) {
                      console.error(err);
                    }
                    message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
                  }
                }
                }
              );
                    break

                    case 'minerador':
                Profile.findOne({ userID: message.author.id }, async function(err, doc) {
                  if(doc.minerador === false){
                    Guild.findOne({ guildID: message.guild.id }, async (err, doc) => {
                    return message.channel.send(`${message.author} Você precisa ter uma picareta para trabalhar na mineradora! Compre em nossa loja utilizando ${doc.prefix}Loja`)
                    })
                  } else {
                  if(doc) {
                    let esmeraldas = Math.round(Math.random() * 5);
                    let ouro =  Math.round(Math.random() * 10);
                    let ferro =  Math.round(Math.random() * 15);
                    if(esmeraldas === 0){
                      return esmeraldas = 1
                    }
                    if(ouro === 0){
                      return ouro = 1
                    }
                    if(ferro === 0){
                      return ferro = 1
                    }
                    let valoresmeralda = 25
                    let valorouro = 15
                    let valorferro = 10

                   let ganhouporesmeralda = esmeraldas * valoresmeralda
                   let ganhouporouro = ouro * valorouro
                   let ganhouporferro = ferro * valorferro
                   let ganhouminerando = ganhouporferro + ganhouporesmeralda + ganhouporouro
                    const time = moment.duration.format(
                      [moment.duration(parseInt(doc.work) + 86400000 - Date.now())],
                      "D MMMM YYYY, h:mm:ss"
                    );
                    if (parseInt(doc.work) + 86400000 <= Date.now()) {
                      if(doc){
                        if(doc.picareta === 0){
                          doc.minerador = false
                          doc.save()
                          return message.channel.send(`${message.author} Sua picareta acabou quebrando em sua ultima prescaria! Compre outra em nossa loja para poder minerar novamente!`)
                        }
                        doc.money += ganhouminerando;
                        doc.work = Date.now();
                        doc.picareta -= 1
                        doc.save();
                        message.channel.send(`${message.author} Você minerou e encontrou ${esmeraldas} esmeralda(s), ${ouro} ouro(s) e ${ferro} ferro(s) e acabou ganhando ${ganhouminerando} coins!`)
                      }
                    } else {
                      message.reply(
                        `Ops.. Você está cansado de mais para trabalhar novamente! Espere ${time} para trabalhar novamente!`
                      );
                    }
                  } else {
                    const newUser = new Profile ({
                      guildID: message.guild.id,
                      guildName: message.guild.name,
                      userID: message.author.id,
                      username: message.author.tag,
                      vip: false
                    });
            
                    try {
                      newUser.save();
                      console.error(`Perfil de ${message.author.tag} foi criado`)
                    } catch (err) {
                      console.error(err);
                    }
                    message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
                  }
                }
              }
              );
                    break

                    case 'lixeiro':
                      Profile.findOne({ userID: message.author.id }, async function(err, doc) {
                        if (doc) {
                          let sacodelixo = Math.round(Math.random() * 25);
                          if(sacodelixo === 0){
                            return peixes = 1
                          }
                          let valorsacodelixo = 35
                         let ganhousacodelixo = valorsacodelixo * sacodelixo
                          const time = moment.duration.format(
                            [moment.duration(parseInt(doc.work) + 86400000 - Date.now())],
                            "D MMMM YYYY, h:mm:ss"
                          );
                          if (parseInt(doc.work) + 86400000 <= Date.now()) {
                              doc.money += ganhousacodelixo;
                              doc.work = Date.now();
                              doc.save();
                              message.channel.send(`${message.author} Você pegou ${sacodelixo} saco(s) de lixo e acabou ganhando ${ganhousacodelixo} coins!`)
                          } else {
                            message.reply(
                              `Ops.. Você está cansado de mais para trabalhar novamente! Espere ${time} para trabalhar novamente!`
                            );
                          }
                        } else {
                          const newUser = new Profile ({
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                            userID: message.author.id,
                            username: message.author.tag,
                            vip: false
                          });
                  
                          try {
                            newUser.save();
                            console.error(`Perfil de ${message.author.tag} foi criado`)
                          } catch (err) {
                            console.error(err);
                          }
                          message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
                        }
                      }
                    );
                          break
            }
              })
            }
            }
