import path from "path"
import moment from "moment"
import fs from "fs"
import sqlite3 from "sqlite3"


const generarLogCSV = (now, id, name, username, mensaje) => {
    const ROOT_PATH = process.env.ROOT

    moment.locale("es-mx")

    const nameDirAno = moment().format("YYYY")
    const nameDirMes = moment().format("MM MMMM").toUpperCase()
    const fileLog = moment().format("YYYYMMDD")

    const dirLog = path.join(ROOT_PATH, "logs")
    const dirAno = path.join(dirLog, nameDirAno)
    const dirMes = path.join(dirAno, nameDirMes)
    const ruta = path.join(dirMes, fileLog + ".csv")

    if (!fs.existsSync(dirLog)) fs.mkdirSync(dirLog)
    if (!fs.existsSync(dirAno)) fs.mkdirSync(dirAno)
    if (!fs.existsSync(dirMes)) fs.mkdirSync(dirMes) 

    const registro = `${now};${id};${name};${username};${mensaje}\n`

    fs.appendFile(ruta, registro, (err) => {
      if (err) console.log(err)
    })
}

const generarLogDB = (id, name, username, mensaje) => {

    const ROOT_PATH = process.env.ROOT
    const DATABASE = process.env.DATABASE;

    const rutaDB = path.join(ROOT_PATH, "database", DATABASE);
    const db = new sqlite3.Database(rutaDB)

    const qInsert = "INSERT INTO LOG_CONSULTA"
    const qParam = "(CONSULTA, ID_USUARIO, NAME_USUARIO, USERNAME_USUARIO, R_USUARIO)"
    const qValues = ` '${mensaje}', ${id}, '${name}', '${username}', '${id}'`

    const qLog_I = `${qInsert} ${qParam} VALUES (${qValues})`

    db.all(qLog_I, err => {
        if (err) console.log(err)
    })
}

export const generarLog = (ctx) => {

    const now = moment().format("YYYY-MM-DD HH:mm:ss")

    const id = ctx.from.id ? ctx.from.id : -1
    const name = ctx.from.first_name ? ctx.from.first_name : ""
    const username = ctx.from.username ? ctx.from.username : ""
    const mensaje = ctx.message.text

    generarLogCSV(now, id, name, username, mensaje)
    generarLogDB(id, name, username, mensaje)

    console.log(now, id, name, username, mensaje)

    
    
}