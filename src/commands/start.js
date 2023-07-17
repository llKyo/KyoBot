import sqlite3 from "sqlite3"
import path from "path"

import { generarLog } from "../includes/audit.js"

export const start = (bot, ctx) => {
    generarLog(ctx)

    const USER_MASTER = process.env.USER_MASTER
    const ROOT_PATH = process.env.ROOT
    const rutaDB = path.join(ROOT_PATH, "database", "test.db")

    const id = ctx.from.id
    const name = ctx.from.first_name
    const username = ctx.from.username

    const db = new sqlite3.Database(rutaDB)

    let qUuarioC = `SELECT COUNT(1) FROM USUARIO `
    qUuarioC += `WHERE ID = ${id}`

    db.all(qUuarioC, (err, data) => {
        if (err) return

        const count = data[0]["COUNT(1)"]

        if (count == 0) {
            let values = ` ${id}, '${name}', '${username}', ${id}`
            let qUsuarioI = `INSERT INTO USUARIO (ID, NAME, USERNAME, R_USUARIO) VALUES (${values})`

            db.all(qUsuarioI)

            let msjMaster = `🆕 Nuevo Usuario:\n\n`
            msjMaster += `Id: ${id}\n`
            msjMaster += `Nombre: ${name}\n`
            msjMaster += `Username: ${username}`

            bot.telegram.sendMessage(USER_MASTER, msjMaster)
            bot.telegram.sendMessage(ctx.chat.id, `Hi there ${name} 😁`)
            bot.telegram.sendMessage(ctx.chat.id, `👋`)
        } else {
            bot.telegram.sendMessage(ctx.chat.id, `Hi there denuevo ${name} 🙃`)
            bot.telegram.sendMessage(ctx.chat.id, "😁")

        }
    })

    db.close()
}
