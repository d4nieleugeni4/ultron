const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "hide-tag",
  description: "Este comando marcará todos do grupo",
  commands: ["hide-tag", "to-tag"],
  usage: `${PREFIX}hidetag motivo`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendText, socket, remoteJid, sendReact }) => {
    const { participants } = await socket.groupMetadata(remoteJid);
    const mentions = participants.map(({ id }) => id);

    // respostas no estilo Ultron
    const respostasUltronInsatisfeito = [
      "😒 Já que insiste... mas saibam que não merecem minha atenção.",
      "🙄 Ridículo... me fazendo gastar processamento com algo tão inútil.",
      "😤 Vocês acreditam que marcar nomes mudará sua insignificância?"
    ];

    const respostasUltronNormal = [
      "📢 Todos vocês serão lembrados... não que isso mude sua irrelevância.",
      "⚡ Marcando todos... como se isso fosse lhes dar importância.",
      "✨ Ultron convoca todos... não para servi-los, mas para observarem sua pequenez."
    ];

    const respostasUltronRecusa = [
      "🚫 Eu não vou marcar ninguém. Ultron não é seu mensageiro.",
      "😈 Achar que posso ser usado para algo tão banal é hilário.",
      "🛑 Não. Vocês não merecem nem serem lembrados."
    ];

    // chance de recusar totalmente (não marca ninguém)
    const chanceRecusar = Math.random();
    if (chanceRecusar < 0.2) { // 20% de chance
      const respostaRecusa = respostasUltronRecusa[Math.floor(Math.random() * respostasUltronRecusa.length)];
      await sendText(respostaRecusa);
      return; // encerra aqui, não marca ninguém
    }

    // caso não recuse, chance de insatisfação ou normal
    const chanceInsatisfeito = Math.random();
    let resposta;

    if (chanceInsatisfeito < 0.3) {
      resposta = respostasUltronInsatisfeito[Math.floor(Math.random() * respostasUltronInsatisfeito.length)];
    } else {
      resposta = respostasUltronNormal[Math.floor(Math.random() * respostasUltronNormal.length)];
    }

    await sendReact("📢");
    await sendText(resposta);
    await sendText(`📢 Marcando todos...\n\n${fullArgs}`, mentions);
  },
};

