export const start = (bot, ctx) => {
    console.log(ctx.from);

    bot.telegram.sendMessage(
      ctx.chat.id,
      "Hi there 🐤",
      {}
    );
    

}

   