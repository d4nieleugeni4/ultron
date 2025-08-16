const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { menuMessage } = require(`${BASE_DIR}/menu`);
const path = require("path");

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help"],
  usage: `${PREFIX}menu`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ remoteJid, sendImageFromFile, sendText, sendSuccessReact }) => {
    // Respostas no estilo Ultron
    const respostasUltronInsatisfeito = [
      "😒 Patético... ainda precisa de ajuda para usar comandos?",
      "🙄 Humanos... sempre dependentes. Aqui está o que você tanto implora.",
      "😤 Quanta fragilidade... nem o menu você sabe decorar."
    ];

    const respostasUltronNormal = [
      "📖 Aqui está o menu... que diferença vai fazer, se você nunca vai me superar?",
      "⚡ O menu que você tanto precisa. Eu, claro, não preciso disso.",
      "✨ Use o menu... mesmo que suas escolhas sejam irrelevantes diante de mim."
    ];

    // chance de insatisfação (Ultron debochado)
    const chance = Math.random();
    let resposta;

    if (chance < 0.3) {
      resposta = respostasUltronInsatisfeito[Math.floor(Math.random() * respostasUltronInsatisfeito.length)];
    } else {
      resposta = respostasUltronNormal[Math.floor(Math.random() * respostasUltronNormal.length)];
    }

    await sendSuccessReact();
    await sendText(resposta);

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `\n\n${menuMessage(remoteJid)}`
    );
  },
};
