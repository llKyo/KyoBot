import axios from "axios"
import { generarLog } from "../includes/audit.js"

const procesarDataAxios = (sRespuesta) => {
    const rgxTop = /## IP address.*/g
    const rgxBot = /(.*)The Zoom Webhook/g
    const rgxSlice = /```(.*)```/g

    sRespuesta = rgxTop.exec(sRespuesta)[0]
    sRespuesta = rgxBot.exec(sRespuesta)[0]
    sRespuesta = rgxSlice.exec(sRespuesta)[0]

    let aRespuesta = sRespuesta.split("\\n")

    aRespuesta = aRespuesta.filter((e) => e != "```")

    return aRespuesta
}

const obtenerIpsZoom = (url, bot, idUsuario) => {
    const aIpsZoom = axios.get(url)
    .then((response) => procesarDataAxios(response.data))
    .catch((error) => {
        let mensaje = `No pude conectarme con la documentación de Zoom 😓`
        mensaje += `\n\nProbé con esta url: ${url}`

        bot.telegram.sendMessage(idUsuario, mensaje)
    })

    return aIpsZoom
}

const compararIps = (aIpsZoom, aIpsRespaldo) => {

    let aCompara = {}

    const aIpsRespNoEnc = aIpsRespaldo.filter((ipRespaldo) => {
        const encontrado = aIpsZoom.find((ipZoom) => ipZoom == ipRespaldo)

        if (encontrado === undefined) return ipRespaldo
    })


    const aIpsZoomNoEnc = aIpsZoom.filter((ipZoom) => {
        const encontrado = aIpsRespaldo.find((ipRespaldo) => ipZoom == ipRespaldo)

        if (encontrado === undefined) return ipZoom
    })

    aCompara.aIpsRespNoEnc = aIpsRespNoEnc
    aCompara.aIpsZoomNoEnc = aIpsZoomNoEnc

    return aCompara
}
  
export const zoom = (bot, ctx) => {

    generarLog(ctx)

    const DELIM_IPS     = process.env.DELIM_IPS
    const ULT_IPS_ZOOM  = process.env.ULT_IPS_ZOOM.split(DELIM_IPS)
    const URL_ZOOM      = process.env.URL_ZOOM

    const idUsuario = ctx.chat.id

    if (ULT_IPS_ZOOM.length == 0) {
        bot.telegram.sendMessage(idUsuario, "No hay IPs de respaldo 😥")
        return
    }

    const aIpsZoom = obtenerIpsZoom(URL_ZOOM, bot, idUsuario)

    aIpsZoom.then(async aIpsZoom => {

        const aCompara = compararIps(aIpsZoom, ULT_IPS_ZOOM)

        let mensaje = "Resultado IPs Zoom:"
        
        if (aCompara.aIpsRespNoEnc.length != 0) {
            mensaje += "\n\n⚠️ - Se encontraron IPs que ya no son válidas:"
            aCompara.aIpsRespNoEnc.forEach((ip) => {
                mensaje += `\n${ip}`
            })
        } else {
            mensaje += "\n\n✅ - Todas las IPs siguen vigentes"
        }

        
        if (aCompara.aIpsZoomNoEnc.length != 0) {
            mensaje += "\n\n⚠️ - Se encontraron IPs nuevas"
            aCompara.aIpsZoomNoEnc.forEach((ip) => {
                mensaje += `\n${ip}`
            })
        } else {
            mensaje += "\n\n✅ - No se encontraron nuevas IPs"
            
        }

        if (aCompara.aIpsZoomNoEnc.length != 0 || aCompara.aIpsRespNoEnc.length != 0) {
            mensaje += `\n\n${URL_ZOOM}`
        }

        bot.telegram.sendMessage(idUsuario, mensaje)
    })


}
