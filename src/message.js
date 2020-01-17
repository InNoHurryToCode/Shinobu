const users = {
    "shinobu": 667734811439267860,
    "senko-san": 218399895302832128
};
const channels = {
    "help-en": 602532199228637185,
    "help-ru": 626151491282927627,
    "help-fr": 664914591368871936
};
const msgHello = [
    "hello!",
    "hi!",
    "goodday!",
    "nice to see you here",
    "glad to see you here"
];
const msgGoodnight = [
    "oyasumi!",
    "sleep tight",
    "goodnight!",
    "nighty night night",
    "see you soon!",
    "sleep well"
];
const msgSleepnow = [
    "sleep now, you've worked hard enough already",
    "get some sleep, you deserve it",
    "you should sleep...",
    "you deserve some rest",
    "sleep now, I'll watch over you",
    "it's already late, time to go to bed"
];
const msgHelp = [
    "please use discord search and check the #help channel!",
    "ask questions in the #help channel!",
    "try searching your question first and ask it in the #help channel",
    "can you please ask your question in the #help channel?"  
];
const staticMessages = {
    // hello
    "hello": replyHello,
    "hi": replyHello,

    // goodnight
    "gn": replyGoodnight,
    "night": replyGoodnight,
    "goodnight": replyGoodnight,
    "good night": replyGoodnight,
    "nighty night night": replyGoodnight,
};
const helpMessages = {
    "can somebody": replyHelp,
    "how do i": replyHelp,
    "what do i": replyHelp,
    "when do i": replyHelp,
    "why do i": replyHelp,
    "somebody help me": replyHelp,
    "!help": replyHelp
}

function getRandomValue(array)
{
    return array[Math.floor(Math.random() * array.length)];
}

function replyHello(msg)
{
    msg.reply(getRandomValue(msgHello));
}

function replyGoodnight(msg)
{
    msg.reply(getRandomValue(msgGoodnight));
}

function replySleepnow(msg)
{
    msg.reply(getRandomValue(msgSleepnow));
}

function replyHelp(msg)
{
    const channel = msg.channel.id;

    if (channel === channels["help-en"]
    || channel === channels["help-ru"]
    || channel === channels["help-fr"]) {
        return;
    }

    msg.reply(getRandomValue(msgHelp));
}

async function onUpdate(msg)
{
    const hour = new Date().getHours();

    if (parseInt(msg.member.user.id) === users["senko-san"] && (hour < 7))
    {
        replySleepnow(msg);
    }

    for (key in staticMessages) {
        if (msg.content.toLowerCase().split(" ").includes(key) && parseInt(msg.member.user.id) !== users["shinobu"]) {
            staticMessages[key](msg);
            return;
        }
    }

    for (key in helpMessages) {
        if (msg.content.toLowerCase().includes(key) && parseInt(msg.member.user.id) !== users["shinobu"]) {
            helpMessages[key](msg);
            return;
        }
    }
}

module.exports.onUpdate = onUpdate;