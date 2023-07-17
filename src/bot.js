
import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"

import { generarLog } from "./includes/audit.js"

import { start } from "./commands/start.js"
import { ethereum } from "./commands/ethereum.js"
import { zoom } from "./commands/zoom.js"
import { casino } from "./commands/casino.js"
import { timesheet } from "./commands/timesheet.js"
import { cargarCrons } from "./includes/cron.js"
import { help } from "./commands/help.js"
import { feriados } from "./commands/feriados.js"


export const iniciarBot = () => {

    const bot = new Telegraf(process.env.BOT_TOKEN)

    bot.command("start", (ctx) => start(bot, ctx))
    bot.command("ethereum", (ctx) => ethereum(bot, ctx))
    bot.command("zoom", (ctx) => zoom(bot, ctx))
    bot.command("casino", (ctx) => casino(bot, ctx))
    bot.command("timesheet", (ctx) => timesheet(bot, ctx))
    bot.command("feriados", (ctx) => feriados(bot, ctx))

    bot.command("help", (ctx) => help(bot, ctx))
    
    bot.on(message("text"), (ctx) => generarLog(ctx))
    
    cargarCrons(bot)

    bot.launch().catch(err => console.log(err))

    console.log("DONE! 🐤\n")
}
