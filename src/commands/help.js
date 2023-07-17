import { generarLog } from "../includes/audit.js"

export const help = (bot, ctx) => {
    generarLog(ctx)

    let mensaje = `🤖 Listado de Comandos:\n\n`

    mensaje += `/start - Inicia el bot\n`
    mensaje += `/ethereum - Entrega valor del Ethereum en dólares\n`
    mensaje += `/zoom - Compara las IPs de Zoom con un respaldo\n`
    mensaje += `/casino - Muestra el calendario de casino PUCV\n`
    mensaje += `/timesheet - Entrega el link del time💩\n`
    mensaje += `/feriados - Muestra los próximos feriados\n`

    bot.telegram.sendMessage(ctx.chat.id, mensaje)
}