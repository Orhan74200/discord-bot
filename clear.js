const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

const {colorError, colorSucces} = require('../config.json');


        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
            const notpermm = new Discord.MessageEmbed()
            notpermm.setAuthor('❌ Erreur')
            notpermm.setColor(colorError)
            notpermm.setDescription(`${message.author}, tu n'as pas la permission de supprimer des messages !`)
            return message.channel.send(notpermm)
        }

        if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
            const paperm = new Discord.MessageEmbed()
            paperm.setAuthor('❌ Erreur')
            paperm.setColor(colorError)
            paperm.setDescription(`${message.author}, je n'ai pas la permission de supprimer des messages !`)
            return message.channel.send(paperm)
        }

        if (!args[0]) {
            const msgsupp = new Discord.MessageEmbed()
            msgsupp.setAuthor('❌ Erreur')
            msgsupp.setColor(colorError)
            msgsupp.setDescription(`${message.author}, tu n'as pas indiquer de valeur !`)
            return message.channel.send(msgsupp)
        }

        if (isNaN(args[0])) {
            const msglettre = new Discord.MessageEmbed()
            msglettre.setAuthor('❌ Erreur')
            msglettre.setColor(colorError)
            msglettre.setDescription(`${message.author}, tu n'as pas indiquer une valeur acceptable !`)
            return message.channel.send(msglettre)
        }

        if (args[0] > 100 || args[0] < 1) {
            const msglimit = new Discord.MessageEmbed()
            msglimit.setAuthor('❌ Erreur')
            msglimit.setColor(colorError)
            msglimit.setDescription(`${message.author}, je ne peux pas effacer plus de 100 messages ou moins de 1 message !`)
            return message.channel.send(msglimit)
        }

        await message.channel.bulkDelete(args[0]);

        const embeded = new Discord.MessageEmbed()
        embeded.setAuthor(`✅ Suppressions`)
        embeded.setDescription(`${args[0]} Message(s) ont été supprimé(s)`)
        embeded.setColor(colorSucces)
        message.channel.send(embeded)
    }
    module.exports.help = {
        name: "clear"
    }