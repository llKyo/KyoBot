import { generarLog } from "../includes/audit.js"

export const timesheet = (bot, ctx) => {

    generarLog(ctx)
    
    const URL_TIMESHEET = process.env.URL_TIMESHEET

    const mensaje = `Recordar llegar Time 💩\n${URL_TIMESHEET}`

    bot.telegram.sendMessage(ctx.chat.id, mensaje)
}