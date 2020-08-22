const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');

client.once('ready', () => {
    console.log("The bot is online, Pog!");
});

client.on('message', msg => {

  let ticketID = 0;

  if(msg.content === `${prefix}setup`) {
    let role = msg.guild.roles.cache.find(r => r.name === "Tickets");
    if(!role && msg.member.hasPermission('MANAGE_CHANNELS')) { 
      msg.reply('Setting up the role.');
      msg.guild.roles.create({
        data: {
          name: 'Tickets',
          color: 'BLUE',
        },
        reason: 'The role is needed for the bot.'
      }).then(console.log("The role was created.")).catch(console.error);
    }else if(!msg.member.hasPermission('MANAGE_CHANNELS')){
      msg.reply(`You don't have premissions to setup the bot!`);
    } else{
      msg.reply(`The bot is already setup`);
    } 
  }

  if (msg.content === `${prefix}head`) {
    msg.channel.send('ass!');
  }
});


client.login(token);