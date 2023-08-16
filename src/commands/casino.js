import axios from "axios"
import jsdom from "jsdom"
import { generarLog } from "../includes/audit.js"
import { conexionDB } from "../includes/sqlite3.js"
import { MinutaCasino } from "../../database/classes/MinutaCasino.js"
import { Usuario } from "../../database/classes/Usuario.js"

export const casino = (bot, ctx, cron = false, destinatariosCron = []) => {

    generarLog(ctx)

    const usuario = new Usuario()
    usuario.id = ctx.chat.id

    const db = conexionDB()

    if (!cron) bot.telegram.sendMessage(ctx.chat.id, "Cazuelanding... ⌛")

    axios.get("https://dgaeapucv.cl/casino/#casacentral").then(res => {

        const dom = new jsdom.JSDOM(res.data)

        let divCasaCentral = dom.window.document.querySelector("#casacentral")
    
           
        if (divCasaCentral.getElementsByTagName("*").length == 0) {
            bot.telegram.sendMessage(
              usuario.id,
              "Murició el caballero del casino"
            );
            bot.telegram.sendMessage(
              usuario.id,
              "😥"
            );
            return
        }
        divCasaCentral = new jsdom.JSDOM(divCasaCentral.innerHTML)

        const periodo   = divCasaCentral.window.document.querySelector(".et_pb_blurb_description").firstElementChild.innerHTML
        const url       = divCasaCentral.window.document.querySelector("a").href

        const minutaCasino = new MinutaCasino()

        minutaCasino.periodo = periodo
        minutaCasino.url = url
        minutaCasino.r_usuario = usuario.id

        db.all(minutaCasino.siExisteURL(), (err, data) => {
            if (err) return

            if (data[0]["COUNT(1)"] == 0) db.all(minutaCasino.registrar())
        })

        const mensaje = `${periodo}\n\n${url}`

        if (!cron) {
            bot.telegram.sendMessage(usuario.id, mensaje)
        } else {
            destinatariosCron.forEach(destinatario => bot.telegram.sendMessage(destinatario, mensaje))
        }
        
    });
}