import { VercelRequest, VercelResponse } from "@vercel/node"
import { Telegraf } from "telegraf"
import { TelegrafContext } from "telegraf/typings/context"

export const BOT_TOKEN = "5352985079:AAHd8LSeiKMTEmGG8r0uF2uqcCQBWK7HzSk"
const SECRET_HASH = "32e58fbahey833349df3383dc910e180"
// Note: change to false when running locally
const BASE_PATH =
  process.env.VERCEL_ENV === "production"
    ? "<https://yourdomain.com>"
    : "https://held-cold-suggestion.glitch.me/"
const bot = new Telegraf(BOT_TOKEN)


export async function handleOnMessage(ctx: TelegrafContext) {
  const { message } = ctx
  
  const telegramUsername = message?.from?.username
  const reply = "a message was sent"

  await ctx.reply(reply, {
    reply_to_message_id: message.message_id,
  })
  console.log("test")
}

bot.on("message", async (ctx) => {
  console.log("test")
  await handleOnMessage(ctx)
})

export default async ( req ) => {
  try {
    // Retrieve the POST request body that gets sent from Telegram
    const { body, query } = req

    if (query.setWebhook === "true") {
      const webhookUrl = `${BASE_PATH}/api/telegram-hook?secret_hash=${SECRET_HASH}`

      // Would be nice to somehow do this in a build file or something
      const isSet = await bot.telegram.setWebhook(webhookUrl)
      console.log(`Set webhook to ${webhookUrl}: ${isSet}`)
    }

    if (query.secret_hash === SECRET_HASH) {
      await bot.handleUpdate(body)
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message")
    console.log(error.toString())
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  res.status(200).send("OK")
}