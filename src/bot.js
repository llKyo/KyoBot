
import { Telegraf } from "telegraf"
import { start } from "./commands/start.js"

export const iniciarBot = (TOKEN, port = 3000) => {
    
    const bot = new Telegraf(TOKEN);

    bot.command("start", ctx => start(bot, ctx))

    bot.launch()
    
}
