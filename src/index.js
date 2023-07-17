import dotenv from "dotenv"
import moment from "moment"

import { iniciarBot } from "./bot.js"

dotenv.config()
moment.locale("es-mx")

console.clear()


process.env.ROOT = process.cwd()

iniciarBot()