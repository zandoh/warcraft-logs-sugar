const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const Client = new Discord.Client();

Client.once('ready', () => {
	console.log(`Bot ready... ${new Date().toString()}`);
});

Client.login(process.env.BOT_TOKEN);

Client.on('message', message => {
    const isMessageFromWarcraftLogs =
        message.author.bot
        && message.webhookID
        && message.author.username.includes('Warcraft');
    
    if (!isMessageFromWarcraftLogs) {
        return;
    }

    const logReportId = message.embeds[0].url.split('/reports/')[1];
    const wipefestLink = `https://www.wipefest.gg/report/${logReportId}`;
    const wowAnalyzerLink = `https://wowanalyzer.com/report/${logReportId}`;
    const embeddedMessage = new Discord.MessageEmbed()
        .addFields(
            { name: 'Wipefest: ', value: wipefestLink, inline: true },
            { name: 'WoWAnalyzer: ', value: wowAnalyzerLink, inline: true },
        );

    message.channel.send(embeddedMessage);
});
