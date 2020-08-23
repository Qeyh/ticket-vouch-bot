const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');

client.once('ready', () => {
    console.log("The bot is online, Pog!");
});

client.on('message', msg => {
  let role = msg.guild.roles.cache.find(r => r.name === "Tickets");
  let ticketsCategory = msg.guild.channels.cache.find(r => r.name === "open tickets");

  if(msg.content === `${prefix}setup`) { 
    //Checks if there isn't a role, a category and if the member typing the command has permissions to manage channels.
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
      //Checks if the member typing the command has presmissions to manage channels aka create, edit, delete etc.
    }else if(!msg.member.hasPermission('MANAGE_CHANNELS')){
      msg.reply(`You don't have premissions to setup the bot!`);
      //Checks if the server has the role and the category by their names.
    } else if(ticketsCategory && role){
      msg.reply(`The bot is already setup.`);
      //Else if non of the above true.
    } else {
      msg.reply(`Please make sure the role "Tickets" and the category "Open-tickets" were created. If not, delete the Role/Category and try again.`);
    }
  }

  //Making a new ticket
  if(msg.content.startsWith(`${prefix}new`)) {
    let randomID = Math.floor(Math.random() * Math.floor(99999));
    let reason = msg.content.substr(`${prefix}new`.length+1);
    if(reason == "") {
      msg.channel.send("Please make sure to add a reason for your ticket."); 
    } else {
      console.log("Ticket number: "+randomID);
      msg.guild.channels.create(`ticket-${randomID}`, {
        type: 'text',
        parent: `${ticketsCategory.id}`,
      });
      setTimeout(() => {
        let ticketChannel = msg.guild.channels.cache.find(r => r.name === `ticket-${randomID}`);
        ticketChannel.send(`${role} , The reason for the ticket is: **${reason}**. Please check it out.`);
      }, 1500);
    }

  }

  //Closing the ticket
  if(msg.content === `${prefix}closeTicket`) { 
    if(msg.member.hasPermission('MANAGE_CHANNELS')) {
      if(msg.channel.name.split('-')[0] === "ticket") {
        msg.channel.delete();
      } else {
        msg.reply("This channel isn't a ticket channel!");
      }
    } else {
      msg.reply("You don't have premissions to close this ticket!");
    }
  }

  if (msg.content === `${prefix}head`) {
    msg.channel.send('ass!');
  }
});


client.login(token);