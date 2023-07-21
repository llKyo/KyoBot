import nodeCron from "node-cron"

import { zoom } from "../commands/zoom.js"


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

        const destinatariosCron = [];

        usuarioCron.message.text = "/zoom"
        zoom(bot, usuarioCron, true, destinatariosCron);
    })

}
