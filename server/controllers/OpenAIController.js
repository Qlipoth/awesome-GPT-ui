const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class OpenAIController {
  processedQuestions = new Set();
  messages = [];

  async getAnswer(req, res, next) {
    const { text } = req.query;
    const self = this;
    this.messages.push({ role: "user", content: text });
    //this.messages.push({ role: "assistant", content: "" });
    try {
      this.processedQuestions.add(text);
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders(); // flush the headers to establish SSE with client

      const response = await openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          messages: self.messages,
          stream: true,
        },
        {
          responseType: "stream",
        }
      );

      const stream = response.data;

      stream.on("data", (chunk) => {
        // Messages in the event stream are separated by a pair of newline characters.
        const payloads = chunk.toString().split("\n\n");
        for (const payload of payloads) {
          if (payload.includes("[DONE]")) {
            return;
          }
          if (payload.startsWith("data:")) {
            const data = payload.replaceAll(/(\n)?^data:\s*/g, "");
            try {
              const delta = JSON.parse(data.trim());
              const content = delta.choices[0].delta?.content;
              if (content) {
                this.messages[this.messages.length - 1].content += content;
                res.write(`data: ${content.replace("\n", "__")}\n\n`);
              }
            } catch (error) {
              console.log(`Error with JSON.parse and ${payload}.\n${error}`);
            }
          }
        }
      });

      stream.on("end", () => {
        res.end();
        console.log("Stream done");
      });
      stream.on("error", (e) => console.error(e));
    } catch (err) {
      console.error("err: ", err);
      next(err);
    }
  }
}

module.exports = OpenAIController;
