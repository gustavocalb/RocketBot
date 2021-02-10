const { Comando } = require('../../utils/command')
const Profile = require('../../models/Profile')
const emoji = require('../../utils/emojis.json')
const { MessageEmbed } = require('discord.js')
const Guild = require('../../models/Guild')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "Loja",
            description: "Lojinha do servidor",
            aliase: ['shop']
        })
    }
    run(client, message, args ) {
        Guild.findOne({ guildID: message.guild.id }, async (err, doc) => {
        const loja = new MessageEmbed()
        .setTitle(` 🛒 Rocket Store 🛒`)
        .setDescription(`
        ** Seja Bem-Vindo(a) a Rocket Store!**

        **Aqui você encontrará tudo que precisa para seu dia a dia!**

        ** Produtos:**

        **🎣 Vara de pescar**

        **${emoji.coins} Coins: 5,000**

        **⛏️ Picareta**

        **${emoji.coins} Coins: 5,000**

        **Concessionária Rocket:**

           **🚗 Carro**
           
           **${emoji.coins} Coins: 25,000**

           **Para comprar algum item em nossa loja utilize ${doc.prefix}loja comprar <item>**
        `)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setColor('#f945ff')
        if(!args[0]) return message.channel.send(`${message.author}`, loja)
    })
        switch (args[0]) {
        case 'comprar':
        Profile.findOne({ userID: message.author.id }, async (err, doc) => {
            let comprarpicareta = 5000
            let comprarcarro = 15000
            let compravara = 5000

            if(args.slice(1).join(" ").toLowerCase() === 'vara'){
                if(doc.money < compravara){
                    return message.channel.send(`${message.author} Você não tem coins suficientes para comprar uma Vara de pescar!`)
                } else {
                    if(doc.vara === 5){
                        return message.channel.send(`${message.author} Você ja possui uma vara em seu inventario!`) 
                    }
                    doc.money -= compravara
                    doc.pescaria = true
                    doc.vara += 5
                    doc.save()
                    return message.channel.send(`${message.author} Você acaba de comprar uma vara de pescar!`)
                }
            } else {
                if(args.slice(1).join(" ").toLowerCase() === 'picareta'){
                    if(doc.money < comprarpicareta){
                        return message.channel.send(`${message.author} Você não tem coins suficientes para comprar uma picareta!`)
                    } else {
                        doc.money -= comprarpicareta
                        doc.minerador = true
                        doc.save()
                        return message.channel.send(`${message.author} Você acaba de comprar uma picareta!`)
                    }
                } else {
                    if(args.slice(1).join(" ").toLowerCase() === 'carro'){
                        if(doc.money < comprarcarro){
                            return message.channel.send(`${message.author} Você não tem coins suficientes para comprar um carro`)
                        } else {
                            if(doc.carro === 7){
                                return message.channel.send(`${message.author} Seu carro ainda não precisa de uma revisão!`) 
                            }
                            doc.money -= comprarcarro
                            doc.uber = true
                            doc.carro += 7
                            doc.save()
                            return message.channel.send(`${message.author} Você acaba de comprar uma carro! Parabéns!`)
                        }
                }
            }
        }
    })
}
    }
}