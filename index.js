const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');

client.once('ready', () => {
    console.log("The bot is online, Pog!");
});

client.on('message', msg => {
  if (msg.content === `${prefix}head`) {
    msg.channel.send('ass!');
  }
});

client.login(token);