const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');

client.once('ready', () => {
    console.log("The bot is online, Pog!");
});

client.on('message', msg => {
  let role = msg.guild.roles.cache.find(r => r.name === "Tickets");
  let ticketsCategory = msg.guild.channels.cache.find(r => r.name === "open tickets");
  let ticketID = 0;

  if(msg.content === `${prefix}setup`) { 
    if(!role && !ticketsCategory && msg.member.hasPermission('MANAGE_CHANNELS')) { 
      msg.reply('Setting up the bot.');
      //Create a new role with the name "Tickets".
      msg.guild.roles.create({
        data: {
          name: 'Tickets',
          color: 'BLUE',
        },
        reason: 'The role is needed for the bot.'
      }).then(console.log("The role was created.")).catch(console.error);
      //Create a new category with the name "open tickets"
      msg.guild.channels.create("open tickets", {
        type: 'category',
        reason: 'We need a category for open tickets.'
      }).then(console.log("The category has been created.")).catch(console.error);
    }else if(!msg.member.hasPermission('MANAGE_CHANNELS')){
      msg.reply(`You don't have premissions to setup the bot!`);
    } else if(ticketsCategory && role){
      msg.reply(`The bot is already setup.`);
    } else {
      msg.reply(`Please make sure the role "Tickets" and the category "Open-tickets" were created. If not, delete the Role/Category and try again.`);
    }
  }



  if (msg.content === `${prefix}head`) {
    msg.channel.send('ass!');
  }
});


client.login(token);