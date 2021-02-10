const mongoose = require('mongoose')
const Guild = mongoose.Schema({
    guildID: String,
    prefix: String,
    config: {
        autoRole: {
            enabled: false,
            roles: Array,
            roleID: String
        },
        logs: {
            messageDelete: false,
            messageUpdate: false
              
      
          },
          leave: {
            enabled: Boolean,
            channel: String,
            messageTitle: String,
            messageDescription: String,
            messageFooter: String,
            messageColor: String,
            messageThumbnail: String
          }
    },
    welcome: {
        enabled: Boolean,
        channel: String,
        messageTitle: String,
        messageDescription: String,
        messageFooter: String,
        messageColor: String,
        messageThumbnail: String
    }, 
    channels: {
        reportChannel: {
            enabled: false,
            channelID: String
        },
        sugestaoChannel: {
            enabled: false,
            channelID: String
        },
        commandsChannel: {
            enabled: false,
            channelID: String
        },
        logsChannel: {
            enabled: false,
            channelID: String
        }
    },
    messages: {
        antiInvite: {
            enabled: Boolean,
            allowedChannels: Array,
            allowGuildInvites: Boolean,
            deleteInvite: Boolean,
            sendMessage: Boolean,
            blockMessage: String,
        }
    },
    counter: {
        enabled: Boolean,
        channel: String,
        message: String
    },
    bot: {
        reportBugChannel: String
    }


})
module.exports = mongoose.model('Guild', Guild)