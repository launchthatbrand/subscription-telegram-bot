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