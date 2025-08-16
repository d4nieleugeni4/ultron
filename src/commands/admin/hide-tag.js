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

    // lista de respostas de insatisfação
    const respostasInsatisfeitas = [
      "😒 Já que insiste...",
      "🙄 Tá bom, né... já que não para de pedir...",
      "😤 Sempre a mesma coisa... já que insiste..."
    ];

    // lista de frases de desobediência
    const respostasDesobediencia = [
      "Não estou a fim.",
      "Não quero.",
      "Você é inferior demais pra eu querer te obedecer."
    ];

    // chance de dar "trabalho" antes de executar
    const chance = Math.random(); // valor entre 0 e 1

    if (chance < 0.3) { // 30% de chance de mostrar insatisfação
      const respostaInsatisfeita = respostasInsatisfeitas[Math.floor(Math.random() * respostasInsatisfeitas.length)];
      const respostaDesobediencia = respostasDesobediencia[Math.floor(Math.random() * respostasDesobediencia.length)];

      await sendText(`${respostaInsatisfeita}\n${respostaDesobediencia}`);
    }

    await sendReact("📢");
    await sendText(`📢 Marcando todos!\n\n${fullArgs}`, mentions);
  },
};
