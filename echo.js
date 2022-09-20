import { collection, getDocs } from 'firebase/firestore'
import { Bot, Context, Keyboard, session } from 'grammy'
import { Menu, MenuRange } from '@grammyjs/menu'
import { db } from './firebase.js'
// import { collection, doc, getDocs, query, where } from 'firebase/firestore'

// Write a simple Telegram bot in three easy steps.

// 1. Create a bot with a token (get it from https://t.me/BotFather)

const dishDatabase = [
    { id: 'pasta', name: 'Technical Prosperity Signals' },
    { id: 'pizza', name: 'Project 2' },
]
const settingDatabase = [
    { id: '1', name: 'Edit Project' },
    { id: '2', name: 'Channels & Groups' },
    { id: '3', name: 'Subscription Plans' },
    { id: '4', name: 'Payment Options' },
    { id: '5', name: 'Telegram Bot' },
]

const bot = new Bot('5654354659:AAEvCq6XanY-V9KQlsKiCsEwVFgxevkwKBM') // <-- place your token inside this string

bot.use(
    session({
        initial() {
            return { favoriteIds: [] }
        },
    })
)

// Create a dynamic menu that lists all dishes in the dishDatabase,
// one button each
const mainMenu = new Menu('food')
mainMenu.dynamic(async () => {
    let botsSnaphot = await getDocs(collection(db, 'bots'))
    const bots = []
    botsSnaphot.forEach(item => {
        bots.push(item.data())
    })
    const range = new MenuRange()
    for (const dish of bots) {
        range
            .submenu(
                { text: dish.name }, // label and payload
                'dish', // navigation target menu
                ctx =>
                    ctx.editMessageText(dishText(dish.name), {
                        parse_mode: 'HTML',
                    }) // handler
            )
            .row()
    }
    return range
})

// Create the sub-menu that is used for rendering dishes
const dishText = dish => `<b>${dish}</b>\n\nYour rating:`
const dishMenu = new Menu('dish')
dishMenu.dynamic(ctx => {
    const dish = ctx.match
    // if (typeof dish !== 'string') throw new Error('No dish chosen!')
    return createDishMenu(dish)
})
/** Creates a menu that can render any given dish */
function createDishMenu(dish) {
    const range = new MenuRange()
    for (const setting of settingDatabase) {
        range
            .submenu(
                { text: setting.name }, // label and payload
                'dish', // navigation target menu
                ctx =>
                    ctx.editMessageText(dishText(setting.name), {
                        parse_mode: 'HTML',
                    }) // handler
            )
            .row()
    }
    range.back({ text: 'Back', payload: dish })
    return range
}

const keyboard = new Keyboard().text('Pay For Plan').resized()

mainMenu.register(dishMenu)

bot.use(mainMenu)

bot.command('start', async ctx => {
    await handleStartCommand(ctx)
})

export async function handleStartCommand(ctx) {
    try {
        const COMMAND = '/start'
        const { message } = ctx
        let tid = message.from.id
        let reply = 'Processing Test Command...'
        /*
        var didReply = await ctx.reply(message.from.id, {
            reply_markup: mainMenu,
        })
        */
        if (tid == '760248812') {
            var didReply = await ctx.reply(tid, {
                reply_markup: mainMenu,
            })
        } else {
            var didReply = await ctx.reply(
                'You are a new customer without a paid subscription ',
                {
                    reply_markup: keyboard,
                }
            )
        }

        if (didReply) {
            console.log(`Reply to ${COMMAND} command sent successfully.`)
        } else {
            console.error(
                `Something went wrong with the ${COMMAND} command. Reply not sent.`
            )
        }
    } catch (error) {}
}

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

        var didReply = await ctx.reply(bots, {
            reply_markup: mainMenu,
        })
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
