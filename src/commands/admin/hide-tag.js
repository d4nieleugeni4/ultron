const { PREFIX, ULTRON_REFUSE_LEVEL, BASE_DIR } = require(`${BASE_DIR}/config`);
const path = require("path");

// importar frases
const frasesNormais = require(path.join(BASE_DIR, "ultron-phrases", "normal"));
const frasesInsatisfeito = require(path.join(BASE_DIR, "ultron-phrases", "insatisfeito"));
const frasesRecusa = require(path.join(BASE_DIR, "ultron-phrases", "recusa"));

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

    // chance de recusar
    if (Math.random() < ULTRON_REFUSE_LEVEL) {
      await sendText(pickRandom(frasesRecusa));
      return; // não marca ninguém
    }

    // chance de insatisfação
    const resposta = (Math.random() < 0.3) 
      ? pickRandom(frasesInsatisfeito)
      : pickRandom(frasesNormais);

    await sendReact("📢");
    await sendText(resposta);
    await sendText(`📢 Marcando todos...\n\n${fullArgs}`, mentions);
  },
};

