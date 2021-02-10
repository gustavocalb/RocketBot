const { MessageMentions } = require("discord.js")

module.exports = {
    findMember: function(message, args = message.content.split(" ").slice(1)[0]) {
        return message.guild.members.cache.get(args.replace(/<|@|!|>/g, ""))
    },
    findUser: function(client, args) {
        return client.users.cache.get(args.replace(/<|@|!|>/g, ""))
    },
    findChannel: function(client, message, args = message.content.split(" ").slice(1)[0]) {
        return (args.match(MessageMentions.CHANNELS_PATTERN)) ? message.mentions.channels.first() : message.guild.channels.cache.get(args)
    }, 
    findAnimatedEmojis: function(message, emojiContent = message.content.split(" ").slice(1)) {
        let emojisInArgument = [];
        const emojiList = emojiContent.join(" ").match(/(:+[a-zA-Z]+:)+/g);
        if(!emojiList) return emojiContent;

        emojiList.forEach(argument => {
            message.guild.emojis.cache.filter(emoji => emoji.animated && `:${emoji.name}:` == argument).forEach(emoji => 
                emojisInArgument.push({
                    name: emoji.name,
                    mention: `<a:${emoji.name}:${emoji.id}>`
                })
            )
        });
        
        for(let emote of emojisInArgument) {
            emojiContent = emojiContent.map(emoji => 
                emoji.replace(new RegExp(`:${emote.name}:`, "g"), emote.mention)
            );
        }

        return emojiContent;
    }
}