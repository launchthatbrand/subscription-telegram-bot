import { Bot, Context, Keyboard, session, SessionFlavor } from 'grammy'
import { Menu, MenuRange } from '@grammyjs/menu'

import { db, auth } from '/firebase'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'

/** This is how the dishes look that this bot is managing */
interface Dish {
    id: string
    name: string
}

interface ProjectSettings {
    id: string
    name: string
}

interface SessionData {
    favoriteIds: string[]
}
type MyContext = Context & SessionFlavor<SessionData>

/**
 * All known dishes. Users can rate them to store which ones are their favorite
 * dishes.
 *
 * They can also decide to delete them. If a user decides to delete a dish, it
 * will be gone for everyone.
 */
const dishDatabase: Dish[] = [
    { id: 'pasta', name: 'Technical Prosperity Signals' },
    { id: 'pizza', name: 'Project 2' },
]
const settingDatabase: ProjectSettings[] = [
    { id: '1', name: 'Edit Project' },
    { id: '2', name: 'Channels & Groups' },
    { id: '3', name: 'Subscription Plans' },
    { id: '4', name: 'Payment Options' },
    { id: '5', name: 'Telegram Bot' },
    { id: '6', name: '< Go Back' },
]

const bot = new Bot<MyContext>('5654354659:AAEvCq6XanY-V9KQlsKiCsEwVFgxevkwKBM')

bot.use(
    session({
        initial() {
            return { favoriteIds: [] }
        },
    })
)

// Create a dynamic menu that lists all dishes in the dishDatabase,
// one button each
const mainText = 'Here are your projects...'
const mainMenu = new Menu<MyContext>('food')
mainMenu.dynamic(() => {
    const range = new MenuRange<MyContext>()
    for (const dish of dishDatabase) {
        range
            .submenu(
                { text: dish.name, payload: dish.id }, // label and payload
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
const dishText = (dish: string) => `<b>${dish}</b>\n\nYour settings:`
const dishMenu = new Menu<MyContext>('dish')
dishMenu.dynamic(() => {
    const range = new MenuRange<MyContext>()
    for (const setting of settingDatabase) {
        range
            .submenu(
                { text: setting.name, payload: setting.id }, // label and payload
                'setting', // navigation target menu
                ctx =>
                    ctx.editMessageText(dishText(setting.name), {
                        parse_mode: 'HTML',
                    }) // handler
            )
            .row()
    }
    return range
})
/** Creates a menu that can render any given dish */
function createDishMenu(dish: string) {
    return new MenuRange<MyContext>()
        .text(
            {
                text: ctx =>
                    ctx.session.favoriteIds.includes(dish) ? 'Yummy!' : 'Meh.',
                payload: dish,
            },
            ctx => {
                const set = new Set(ctx.session.favoriteIds)
                if (!set.delete(dish)) set.add(dish)
                ctx.session.favoriteIds = Array.from(set.values())
                ctx.menu.update()
            }
        )
        .row()
        .back({ text: 'X Delete', payload: dish }, async ctx => {
            const index = dishDatabase.findIndex(d => d.id === dish)
            dishDatabase.splice(index, 1)
            await ctx.editMessageText('Here are your projects...')
        })
        .row()
        .back({ text: 'Back', payload: dish })
}

const keyboard = new Keyboard().text('Pay For Plan').resized()

mainMenu.register(dishMenu)

bot.use(mainMenu)

bot.command('start', async ctx => {
    await handleStartCommand(ctx)
})

export async function handleStartCommand(ctx: any) {
    try {
        const COMMAND = '/start'
        const { message } = ctx
        let tid: string = message.from.id
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

export async function handleBotsCommand(ctx: any) {
    try {
        const COMMAND = '/bots'
        var ctx = ctx
        let botsSnaphot = await getDocs(collection(db, 'bots'))
        console.log('bot_data', botsSnaphot)
        /*
         var bots: any = []
        botsSnaphot.forEach(item => {
            bots.push(item.data())
        })
        */
        // console.log('bot_data_after', bots)

        // var didReply = await ctx.reply(bots)
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

bot.command('help', async ctx => {
    const text =
        'Send /start to see and rate dishes. Send /fav to list your favorites!'
    await ctx.reply(text)
})
bot.command('fav', async ctx => {
    const favs = ctx.session.favoriteIds
    if (favs.length === 0) {
        await ctx.reply('You do not have any favorites yet!')
        return
    }
    const names = favs
        .map(id => dishDatabase.find(dish => dish.id === id))
        .filter((dish): dish is Dish => dish !== undefined)
        .map(dish => dish.name)
        .join('\n')
    await ctx.reply(`Those are your favorite dishes:\n\n${names}`)
})

bot.catch(console.error.bind(console))
bot.start()
