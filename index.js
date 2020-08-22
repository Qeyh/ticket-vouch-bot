const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log("The bot is online, Pog!");
});

client.on('message', msg => {
    if (msg.content === '-head') {
      msg.channel.send('ass!');
    }
  });

client.login('NzQ2ODI1NTM3NDAxNjUxMzU0.X0F9ew.DUJKXpbvNSFyj04d7cdMmgVP3J0');