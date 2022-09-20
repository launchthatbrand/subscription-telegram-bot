import { collection, getDocs } from 'firebase/firestore'
import { Bot } from 'grammy'
import { db } from './firebase.js'
// import { collection, doc, getDocs, query, where } from 'firebase/firestore'

// Write a simple Telegram bot in three easy steps.

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const bot = new Bot('5654354659:AAEvCq6XanY-V9KQlsKiCsEwVFgxevkwKBM') // <-- place your token inside this string

bot.command('bots', async ctx => {
    console.log('Received /bots command')
    await handleBotsCommand(ctx)
})

export async function handleBotsCommand(ctx) {
    try {
        const COMMAND = '/bots'
        var ctx = ctx
        let botsSnaphot = await getDocs(collection(db, 'bots'))
        const bots = []
        botsSnaphot.forEach(item => {
            bots.push(item.data())
        })
        console.log('bot_data_after', bots)

        var didReply = await ctx.reply(bots)
        /*
        if (didReply) {
            console.log(`Reply to ${COMMAND} command sent successfully.`)
        } else {
            console.error(
                `Something went wrong with the ${COMMAND} command. Reply not sent.`
            )
        }
        */
    } catch (error) {}
}

// 2. Reply to text messages with the received text
bot.on('message:text', ctx => ctx.reply(ctx.message.text))

// 3. Start the bot
bot.start()
