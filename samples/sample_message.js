// Load Agent & Node SDK
const ChatBot = require("../index");
const NodeSDK = require("rainbow-node-sdk");

// Load bot identity
const bot = require("./bot.json");          // Load bot identity
const scenario = require("./sample_message.json");  // Load scenario

let chatbot = null;
let nodeSDK = null;



// Start the SDK
nodeSDK = new NodeSDK(bot);
nodeSDK.start().then( () => {
    // Start the bot
    chatbot = new ChatBot(nodeSDK, scenario);
    return chatbot.start();
}).then( () => {
    chatbot.onMessage((tag, step, content, from, done) => {
        console.log("::: On answer>", tag, step, content, from);
        console.log(nodeSDK.connectedUser);
        if(tag === "routing" && step === "choice" && content === "yes") {
            done("end_no");   
        } else {
            done();
        }
    }, this);
    
    chatbot.onTicket((tag, history, from, start, end, state, id) => {
        console.log("::: On ticket>", tag, history, from, start, end, state, id);
    }, this);
});

nodeSDK.events.on('rainbow_onready', function() {
    // do something when the connection to Rainbow is up
    let bubbles = nodeSDK.bubbles.getAll();
    console.log(bubbles)
});

nodeSDK.bubbles._eventEmitter.on('rainbow_invitationreceived', (info) => {
    console.log('#############')
    console.log('Bubble invitation received', info)
    console.log('#############')
})

nodeSDK.bubbles._eventEmitter.on('rainbow_affiliationchanged', (info) => {
    console.log('#############')
    console.log('Bubble rainbow_affiliationchanged received', info)
    console.log('#############')
})

nodeSDK.bubbles._eventEmitter.on('rainbow_ownaffiliationchanged', (info) => {
    console.log('#############')
    console.log('Bubble rainbow ownaffiliation changed received', info)
    console.log('#############')
})

nodeSDK.bubbles._eventEmitter.on('rainbow_customdatachanged', (info) => {
    console.log('#############')
    console.log('Bubble rainbow_customdatachanged received', info)
    console.log('#############')
})

nodeSDK.bubbles._eventEmitter.on('rainbow_topicchanged', (info) => {
    console.log('#############')
    console.log('Bubble rainbow_topicchanged received', info)
    console.log('#############')
})

nodeSDK.bubbles._eventEmitter.on('rainbow_namechanged', (info) => {
    console.log('#############')
    console.log('Bubble rainbow_namechanged received', info)
    console.log('#############')
})

