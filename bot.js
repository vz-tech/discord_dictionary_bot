const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./tokens/auth.json');
const prefix = '!'; //Messages must begin with this variable
const Jisho = require('./commands/Jisho.js');

//LOGIN
client.login(auth.token);


//ON READY COMMAND
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
  //If message doesn't start with ! return nothing
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/\s+/);
  const command = args.shift().toLowerCase();

  //Start commands
  if (command == "jisho") {
    Jisho.index(message, args);
  }
  
});

