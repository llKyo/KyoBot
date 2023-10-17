import nodeCron from "node-cron"

import { zoom } from "../commands/zoom.js"
import { casinoCron } from "../commands/casino.js"
import { generarLog } from "./audit.js"



export const cargarCrons = (bot) => {
    // https://cronexpressiontogo.com/every-minute
    const USER_MASTER = process.env.USER_MASTER

    let usuarioCron = {
        chat: {
            id: USER_MASTER,
        },
        from: {
            id: 0,
            first_name: "CRON",
            username: "CRON",
        },
        message: {
            text: "",
        },
    }

    // 0 9 * * *
    nodeCron.schedule("0 9 * * *", () => {

        const destinatariosCron = [USER_MASTER];

        usuarioCron.message.text = "/zoom"
        zoom(bot, usuarioCron, true, destinatariosCron);
    })

    nodeCron.schedule("01 9 * * *",  () => casinoCron(bot, usuarioCron));
    nodeCron.schedule("30 9 * * *",  () => casinoCron(bot, usuarioCron));
    nodeCron.schedule("0 10 * * *",  () => casinoCron(bot, usuarioCron));
    nodeCron.schedule("30 10 * * *", () => casinoCron(bot, usuarioCron));
    nodeCron.schedule("30 12 * * *", () => casinoCron(bot, usuarioCron));
    
    nodeCron.schedule("30 17 * * 1-4", () => {
        const destinatariosCron = [USER_MASTER, 6167462021, 1686140658];

        const URL_TIMESHEET = process.env.URL_TIMESHEET;

        let mensaje = `Ahora de irse a la miegda 👋\n\n`
        mensaje += `Recordar rellenar el Time 💩\n${URL_TIMESHEET}`;

        usuarioCron.message.text = "/timesheet";
        generarLog(usuarioCron);

        destinatariosCron.forEach((d) => bot.telegram.sendMessage(d, mensaje));
    });

    nodeCron.schedule("00 16 * * 5", () => {
        const destinatariosCron = [USER_MASTER, 6167462021, 1686140658];

        const URL_TIMESHEET = process.env.URL_TIMESHEET;

        let mensaje = `Ahora de irse a la ultra megda👋\n\n`
        mensaje += `Recordar rellenar el Time 💩\n${URL_TIMESHEET}`;
        mensaje += `\nFeliz Finde 😁`;

        usuarioCron.message.text = "/timesheet";
        generarLog(usuarioCron);

        destinatariosCron.forEach((d) => bot.telegram.sendMessage(d, mensaje));
    });
}
