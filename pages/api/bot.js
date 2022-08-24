const { Telegraf } = require('telegraf');

var bot = new Telegraf('5352985079:AAHd8LSeiKMTEmGG8r0uF2uqcCQBWK7HzSk') // We saved our bot token to the bot variable 

bot.start(ctx => ctx.reply(`
   Hi, I'm a simple bot
`)
  console.log("text"))

bot.launch();