import dotenv from "dotenv"

import { iniciarBot } from "./bot.js"

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN


iniciarBot(BOT_TOKEN);