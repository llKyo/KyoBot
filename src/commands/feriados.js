import axios from "axios"
import moment from "moment"
import { generarLog } from "../includes/audit.js"

export const feriados = (bot, ctx) => {
    
    generarLog(ctx)

    const URL_FERIADOS = process.env.URL_FERIADOS

    const anoActual = moment().format("YYYY")

    axios.get(URL_FERIADOS + anoActual).then(resp => {

        if (resp.data.error) {
            console.log(`Mensaje de retorno: ${resp.data.message}`)
            return 
        }

        let mensaje = `Próximos Feriados: \n\n`

        resp.data.forEach(d => {
            if (moment(d.fecha) >= moment()) {
                
                const sIrrenunciable = d.irrenunciable == 1 ? "🚫" : ""
                const sFecha = moment(d.fecha).format("DD MMM").toUpperCase()
                const sTipo = d.tipo == "Religioso" ? "✝️" : "✳️"

                mensaje += `${sTipo} ${sFecha} ${d.nombre} ${sIrrenunciable} \n`
            }
        })

        mensaje += "\n✳️ Civil"
        mensaje += "\n✝️ Religioso"
        mensaje += "\n🚫 Irrenunciable"

        ctx.reply(mensaje)
    })
}
