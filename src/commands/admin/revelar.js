const fs = require("node:fs");
const path = require("node:path");
const { DEFAULT_PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomName } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "revelar",
  description: "Revela uma imagem ou vídeo com visualização única",
  commands: ["revelar", "rv", "reveal"],
  usage: `${DEFAULT_PREFIX}revelar (marque a imagem/vídeo) ou ${DEFAULT_PREFIX}revelar (responda a imagem/vídeo).`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    sendVideoFromFile,
    sendPrivateImageFromFile,
    sendPrivateVideoFromFile,
    sender, // id do autor do comando
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem/vídeo ou responder a uma imagem/vídeo para revelá-la"
      );
    }

    await sendWaitReact();

    const toPrivate = args.includes("@pv");
    const mediaCaption = `Aqui está sua ${isImage ? "imagem" : "vídeo"} revelada!`;

    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomName()}.${isImage ? "jpg" : "mp4"}`
    );

    let inputPath;

    try {
      if (isImage) {
        inputPath = await downloadImage(webMessage, "input");

        fs.copyFileSync(inputPath, outputPath);

        if (toPrivate) {
          await sendPrivateImageFromFile(sender, outputPath, mediaCaption);
        } else {
          await sendImageFromFile(outputPath, mediaCaption);
        }

        await sendSuccessReact();
      } else if (isVideo) {
        inputPath = await downloadVideo(webMessage, "input");

        fs.copyFileSync(inputPath, outputPath);

        if (toPrivate) {
          await sendPrivateVideoFromFile(sender, outputPath, mediaCaption);
        } else {
          await sendVideoFromFile(outputPath, mediaCaption);
        }

        await sendSuccessReact();
      }
    } catch (error) {
      console.error("Erro geral:", error);
      throw new Error("Ocorreu um erro ao processar a mídia. Tente novamente.");
    } finally {
      const cleanFile = (filePath) => {
        if (filePath && fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (cleanError) {
            console.error("Erro ao limpar arquivo:", cleanError);
          }
        }
      };

      cleanFile(inputPath);
      cleanFile(outputPath);
    }
  },
};
