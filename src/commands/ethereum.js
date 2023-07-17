import axios from "axios"
import { generarLog } from "../includes/audit.js"

export const ethereum = (bot, ctx) => {

    generarLog(ctx)

    let rate

    axios
        .get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        .then( response => {
            
            rate = response.data.ethereum

            const message = `El precio de Ethereum es: ${rate.usd}USD`

            bot.telegram.sendMessage(ctx.chat.id, message, {})
        })
}
