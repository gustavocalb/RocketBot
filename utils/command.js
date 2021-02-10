const {ownerID} = require("../config.json")

module.exports.Comando = class Comando {
    constructor(client, cmd = {}) {
        this.client = client;
        this.name = cmd.name || "Inválido"
        this.aliases = cmd.aliases || []
        this.description = cmd.description || "Nenhuma"
        this.usage = (cmd.usage) ? cmd.name + " " + cmd.usage : cmd.name
        this.needPermissions = cmd.needPermissions || false
        this.botPermissions = cmd.botPermissions || false
        this.onlyOwner = cmd.ownlyOwner || false
        this.enable = cmd.enabled || false
        this.needArguments = cmd.needArguments || false
    }

    hasPermission(message) { 
        if(this.needPermissions) return message.channel.permissionsFor(message.member).has(this.needPermissions) || message.member.hasPermission(this.needPermissions)
        return true
    }

    botHasPermission(message) {
        if(this.botPermissions) return message.guild.me.hasPermission(this.botPermissions) || message.channel.permissionsFor(message.guild.me).has(this.botPermissions)
        return true
    }

    exclusiveCommand(message) {
        if(this.onlyOwner) return ownerID.includes(message.author.id)
        return true
    }

    enabled(message) {
        if(this.enable) return ownerID.includes(message.author.id)
        return true
    }

    missArguments(args) {
        if(this.needArguments) return args.length
        return 
        
    }
}