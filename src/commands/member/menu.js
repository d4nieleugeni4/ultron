const path = require("path");
const config = require(path.join(__dirname, "..", "..", "config"));
const { PREFIX, ULTRON_REFUSE_LEVEL, BASE_DIR, ASSETS_DIR } = config;
const { menuMessage } = require(path.join(BASE_DIR, "menu"));

// Importa as frases externas
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
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, sendImageFromFile, sendText, sendSuccessReact, msg }) => {
    // Chance de recusa total
    if (Math.random() < ULTRON_REFUSE_LEVEL) {
      await sendText(pickRandom(frasesRecusa), { quoted: msg });
      return;
    }

    // Chance de insatisfação ou resposta normal
    const resposta = (Math.random() < 0.3)
      ? pickRandom(frasesInsatisfeito)
      : pickRandom(frasesNormais);

    await sendSuccessReact();
    await sendText(resposta, { quoted: msg });

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `\n\n${menuMessage(remoteJid)}`,
      { quoted: msg }
    );
  },
};
