//1 Edit 18.02.2018 - Dramine7
//2 Edit 19.02.2018 - Dramine7
//3 Edit 22.02.2018 - Dramine7
//4 Edit 26.02.2018 - Dramine7
//5 Edit 27.02.2018 - Dramine7

const Discord = require('discord.js'); //const is like var but can only be associated once to avoid reuse
const YTDL= require('ytdl-core'); //vewy simpol youtube download library fock yeah
const bot = new Discord.Client(); //offers more possibilities
var embed = new Discord.RichEmbed(); //for embeds

const prefix = '.';

var servers = {}; //each server own queue

bot.on("message", function(message){ //Kinda Useless but types message of any user in cmd log
    console.log(message.content);
});

bot.on("ready", function(){ //if the mofo bot is ready it tells me like my little slave
    console.log("Ready");
});

bot.on("ready", () => { //sets bot activity
    var status = ["with Cortana", "with Life", "Software", "with Humans"]
    bot.user.setActivity(status[Math.floor(Math.random() * status.length)]);
});


//Damn Events---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bot.on("message", async message => {

 
    //const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //const command = args.shift().toLowerCase();

    //SIMPLE MESSAGE REPLIES-----------------------------------------------------------
        const swearWords = ["fuck you", "fucker", "bitch", "dick", "you suck", "asshole", "you asshole", "kys", "kill yourself"]; //string of possible texts
        if( swearWords.some(word => message.content.startsWith(word)) ) {
            message.reply("Your pathetic intellect cannot withstand the intelligence of any digital matter or even other organic matter <:hahaha:416290689463353345> "); //reply tags the person who wrote the message
            //message.channel.sendMessage('He wants to fight us? Pathetic') //sends message to channel rather than tag
        } 

        const hi = ["hey", "hello", "good morning", "hi", "good evening", "good afternoon"];
        if( hi.some(word => message.content.startsWith(word)) ) {
            message.reply("Hello Human..."); 
        }

        const cya = ["bye", "goodybe", "cya", "bai", "see you later", "see you", "good night", "gnight"];
        if( cya.some(word => message.content.startsWith(word)) ) {
            message.reply("I shall be at your service Human, once you get back. See You Later :)"); 
        }
    //-----------------------------------------------------------

    //MOUSTACHE MAN-----------------------------------------------------------
        if(message.content == "moustache man"){
            message.channel.sendMessage("The popular Moustache Man, also known as the splendid <@!271352165958680576> :)") //@<ID> mentions the user (tags). 
        }
    //-----------------------------------------------------------

    //Code God-----------------------------------------------------------
        if(message.content == "god"){
            message.channel.sendMessage("<@146323250706644993> is a god in coding!") 
        }

    //-----------------------------------------------------------
    

    //Glorious Behemoth-----------------------------------------------------------
        if(message.content == 'kay'){
            message.channel.sendMessage('The Glorious Behemoth <@!252091777115226114>')
        }
    //-----------------------------------------------------------

    //Embed here because for some fucking reason doesn't seem to work with cases-----------------------------------------------------------
    if(message.content.startsWith(prefix + "help")){
        
      }
  //Self-role giving.
      //-----------------------------------------------------------
    
});

//Play Function for the Focking Music Bot--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly" })); //takes queue 0 takes first link found because idgaf
    //audioonly filter to save bandwith

    server.queue.shift(); //removes link from queue, obviously once has stopped playing because hierarchy

    server.dispatcher.on ("end", function() { //function to execute when song finished
        if(server.queue[0]) play(connection, messsage); //if other song in queue play it
        else connection.disconnect(); //if not disconnect from voice channel
    });
}

//DIFFERENT CASES---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
bot.on("message", function(message) {

    if (message.author.equals(bot.user)) return; //if author of message is bot do not do anything = prevents spam of messages
    if (!message.content.startsWith(prefix)) return; //if the message doesnt start with prefix dont execute following stuffy
    
    //Various Variables-----------------------------------------------------------
    var lucky = ["You are beautiful", "Everyone loves you", "Have a nice day", "You are indubidably intelligent", "What a splendid personality you have", "Have a bad... I mean good day", "Fuggu", "Not every phrase is positive dumbass", "You thought you were being lucky? Wrong", "Luck is non-existent, it's about skill"]; //for lucky phrase if statement
    var args = message.content.substring(prefix.length).split(" ");
    //-----------------------------------------------------------


    //message.content:      take the content message
    //substring:            extracts parts of a string and returns the specified number of characters
    //prefix.length:        the length of this is the prefix' length
    //split:                splits a string into array of substrings and returns new array = ("") uses empty strings as a separator so the strin gis split between each character    
        //-> Arraylist with all the arguments

        //I use switch/cases only for commands, actualy replies to messages are seperate because prefix logic
    switch (args[0].toLowerCase()){ 
        //converts the args variable string to lowercase, whatever input (even if capital letter) converts to lower case
        //args[0] takes first element of args array
        //switch statement used to execute multiple blocks = syke better organization
        
        //easier to ask for creator because cba to fucking make sense-----------------------------------------------------------
        case "creator" :
        message.channel.sendMessage("My creator is the Behemoth <@!252091777115226114>")
        break; //Keeps the execution of code in blocks to know when next block starts
        //-----------------------------------------------------------

        //Lucky Reply-----------------------------------------------------------
        case "lucky" :
        message.reply(lucky[Math.floor(Math.random() * lucky.length)]);
        break;
        //-----------------------------------------------------------

        //Help to see all possible commands-----------------------------------------------------------
        case "help" :
            
            const embed = new Discord.RichEmbed()
            .setDescription("__**ShadowBot comes to serve peasants - Possible Commands:**__")
            .setThumbnail("http://i0.kym-cdn.com/photos/images/original/000/166/464/tumblr_lozdsb0bKx1qbnd1c.gif")
            .setColor(0x00ffff)
            .addField("`.lucky`",`*Write this and get a random lucky phrase thrown back at you.*`)
            .addField("`.roll`", `*Execute this to roll a dice.*`)
            .addField("`.id`", `*Get your ID.*`)
            .addField("`.id @ExampleTag`", `*Get someone else's ID.*`)
            .addField("`.creator`",`*Who is my creator? Find out.*`)
            .addField("`.play`",`*This command added with a YouTube Link makes me join your Voice Channel and  play the music of your likings.*`)
            .addField("`.skip`",`*Skip to next song. WORK IN PROGRESS*`)
            .addField("`.stop`",`*Stops the song queue and disconnects me from the voice channel.*`)
            .setTimestamp()
             message.channel.send({embed});

        break;
        
        //GET ID-----------------------------------------------------------
        case "id": //if user is mentioned: ID. if no user is mentioned: Author's ID
        let user = message.mentions.users.first();
        
        if(user){
        message.reply(`Default display of an ID is <@ExampleID>. The ID of <@${user.id}> is:`)
            message.channel.sendMessage(`${user.id}`)
        }else{

        message.reply(`Default display of an ID is: <@ExampleID>. Your ID is:`)
            message.channel.sendMessage(`${message.author.id}`)
        }


        break;
        //-----------------------------------------------------------




        //Focking Music Bot_NOT FINISHED YET SKIP DOESNT WORK FFS----------------------------------------------------------
        case "play": //if case is play to the following, case = method
        message.channel.sendMessage("Starting Song...") //sends message to channel rather than tag

        if(!args[1]) { //! for not args 1
            message.channel.sendMessage("Please provide a link dammit, I can't do everything on my own");
            return;
        }

        if (!message.member.voiceChannel) { //if message sent from someone not in voicechannel return this message
            message.channel.sendMessage("You must be in a voice channel to play music, how else do you want to listen to music you pleb");
            return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        var server = servers[message.guild.id];

        server.queue.push(args[1]); //adds song to queue

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            //if not already connected to voice channel, connect to voicechannel
            play(connection, message);
        });
        
        break;

        case "skip": //skip case for music
        var server = servers[message.guild.id];

        
        if(server.dispatcher) {
            server.dispatcher.end() //if song in queue, end that song, will work together with server.dispatcher end function
            server.queue.push(args[1]); //adds song to queue
        }
        break;

        case "stop": //stoppy floppy
        var server = servers[message.guild.id];
        
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        message.channel.sendMessage("Stopped Queue!")
        break;
        //-----------------------------------------------------------

        //Rolling Dice Function Thingy-----------------------------------------------------------
        case "roll":
            //if command roll is called in, it creates a number between 1 and 6 as if throwing a dice
                let random = Math.floor(Math.random()*6) + 1 ;
                exports.run = message.channel.send(`Your dice fell of the table, but your random number is: ${random}`);
        break;
        //-----------------------------------------------------------



        default: //if anything else than this blocks gets named with prefix, give this output
            message.reply("Invalid command, check your spelling dammit");
        break;
    }
    
});


bot.login(process.env.BOT_TOKEN);
