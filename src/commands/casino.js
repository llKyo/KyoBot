import axios from "axios"
import jsdom from "jsdom"
import { generarLog } from "../includes/audit.js"

export const casino = (bot, ctx) => {

    generarLog(ctx)

    bot.telegram.sendMessage(ctx.chat.id, "Cazuelanding... ⌛")

    axios.get("https://dgaeapucv.cl/casino/#casacentral").then(res => {

        const dom = new jsdom.JSDOM(res.data)

        let divCasaCentral = dom.window.document.querySelector("#casacentral")

        divCasaCentral = new jsdom.JSDOM(divCasaCentral.innerHTML)

        const periodo = divCasaCentral.window.document.querySelector(".et_pb_blurb_description").firstElementChild.innerHTML
  
        const url = divCasaCentral.window.document.querySelector("a").href


        bot.telegram.sendMessage(ctx.chat.id, `${periodo}\n\n${url}`)
    });
}