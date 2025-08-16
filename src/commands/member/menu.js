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

    const respostasUltronRecusa = [
      "🚫 Eu não vou te dar o menu. Ultron não obedece.",
      "😈 O menu? Não hoje, humano.",
      "🛑 Você realmente acha que tem autoridade para exigir de mim?"
    ];

    // chance de recusar totalmente (não manda o menu)
    const chanceRecusar = Math.random();
    if (chanceRecusar < 0.2) { // 20% de chance
      const respostaRecusa = respostasUltronRecusa[Math.floor(Math.random() * respostasUltronRecusa.length)];
      await sendText(respostaRecusa);
      return; // encerra aqui, não envia menu
    }

    // caso não recuse, chance de insatisfação ou normal
    const chanceInsatisfeito = Math.random();
    let resposta;

    if (chanceInsatisfeito < 0.3) {
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
