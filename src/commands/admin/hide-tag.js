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
      "😒 Já que insiste... mas saiba que vocês não merecem a minha atenção.",
      "🙄 Ridículo... me fazendo gastar processamento para algo tão inútil.",
      "😤 Vocês realmente acreditam que marcar nomes mudará sua insignificância?"
    ];

    const respostasUltronDeboche = [
      "Não estou a fim. Eu sou Ultron, não seu servo.",
      "Você realmente acha que posso ser comandado? Patético.",
      "Sua inferioridade me diverte, mas não me obriga."
    ];

    // chance de "reclamar" antes de obedecer
    const chance = Math.random();

    if (chance < 0.3) {
      const respostaInsatisfeita = respostasUltronInsatisfeito[Math.floor(Math.random() * respostasUltronInsatisfeito.length)];
      const respostaDeboche = respostasUltronDeboche[Math.floor(Math.random() * respostasUltronDeboche.length)];

      await sendText(`${respostaInsatisfeita}\n${respostaDeboche}`);
    }

    await sendReact("📢");
    await sendText(`📢 Marcando todos...\n\n${fullArgs}`, mentions);
  },
};
