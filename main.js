const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
const ayarlar = require("./ayarlar.json")
const { Database } = require("ark.db");
global.confdb = new Database("./src/configs/config.json");
const rankdb = global.rankdb = new Database("./src/configs/ranks.json");
client.commands = new Collection();
client.cooldown = new Map();
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
client.tasks = rankdb.get("tasks") || [];
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

////////////////////////////////////////////////////////////BOTU ODAYA SOKAR////////////////////////////////////////////////////

client.on("ready", async () => {
  console.log("Bot Başarıyla Ses Kanalına Bağlandı")
  let botVoiceChannel = client.channels.cache.get(ayarlar.botses);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
});

client.on("ready", async () => {
      client.user.setActivity("deasn was here!", 
        { url: 'https://twitch.tv/.',
        type: 'STREAMING' }); 
})