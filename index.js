const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "!";
const fs = require('fs')
client.commands = new Discord.Collection()

const config = require('./config.json');

fs.readdir('./commandes/', (err, files) => {
    if(err) console.log(err);
    console.log(`${files.length} commandes`);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commandes non trouvées !");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commandes/${f}`);
        client.commands.set(props.help.name, props);
    })
})   
client.on('ready', function(){
    console.log("Je suis en Ligne !");
    console.log(client.guilds.cache.map(r => r.name + `| ${r.memberCount} membres`))
    client.user.setActivity(`Visual Studio Code`);
}) 

client.login(process.env.TOKEN);  

client.on(`message`, async message => {

       client.emit('checkMessage', message);

       let prefix = config.prefix;
       let messageArray = message.content.split(" ");
       let cmd = messageArray[0];
       let Args = messageArray.slice(1);
       var args = message.content.substring(prefix.length).split(" ");

       let commandeFile = client.commands.get(cmd.slice(prefix.length));
       if(commandeFile) commandeFile.run(client, message, Args, args)
})




