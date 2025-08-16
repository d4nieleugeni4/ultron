const { PREFIX, ASSETS_DIR, ULTRON_REFUSE_LEVEL, BASE_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/menu`);
const path = require("path");

// importar frases
const frasesNormais = require(path.join(BASE_DIR, "ultron-phrases", "normal"));
const frasesInsatisfeito = require(path.join(BASE_DIR, "ultron-phrases", "insatisfeito"));
const frasesRecusa = require(path.join(BASE_DIR, "ultron-phrases", "recusa"));

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help"],
  usage: `${PREFIX}menu`,
  handle: async ({ remoteJid, sendImageFromFile, sendText, sendSuccessReact }) => {
    // chance de recusar
    if (Math.random() < ULTRON_REFUSE_LEVEL) {
      await sendText(pickRandom(frasesRecusa));
      return;
    }

    // chance de insatisfação
    const resposta = (Math.random() < 0.3) 
      ? pickRandom(frasesInsatisfeito)
      : pickRandom(frasesNormais);

    await sendSuccessReact();
    await sendText(resposta);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `\n\n${menuMessage(remoteJid)}`
    );
  },
};
