import { generarLog } from "../includes/audit.js"
import { Usuario } from "../../database/classes/Usuario.js";
import { conexionDB } from "../includes/sqlite3.js";

export const start = (bot, ctx) => {
    generarLog(ctx)

    const USER_MASTER = process.env.USER_MASTER;

    const db = conexionDB()

    const usuario = new Usuario()
    usuario.id          = ctx.from.id;
    usuario.first_name  = ctx.from.first_name;
    usuario.username    = ctx.from.username;

    db.all(usuario.siExiste(), (err, data) => {
        if (err) return

        if (data[0]["COUNT(1)"] == 0) {
            db.all(usuario.registrar())

            let msjMaster = `🆕 Nuevo Usuario:\n\n`
            msjMaster += `Id: ${usuario.id}\n`;
            msjMaster += `Nombre: ${usuario.first_name}\n`;
            msjMaster += `Username: ${usuario.username}`;

            bot.telegram.sendMessage(USER_MASTER, msjMaster)

            bot.telegram.sendMessage(
              usuario.id,
              `Hi there ${usuario.first_name} 😁\n\nEn caso de ayuda utilizar comando /help`
            )

            bot.telegram.sendMessage(usuario.id, `👋`)
        } else {
            bot.telegram.sendMessage(
              usuario.id,
              `Hi there denuevo ${usuario.first_name} 🙃\n\nRecordar comando /help para ayuda`
            );

            bot.telegram.sendMessage(usuario.id, "😁");

        }
    })

    db.close()
}
