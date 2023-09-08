// async function* chunksToLines(chunksAsync) {
//   let previous = '';
//   for await (const chunk of chunksAsync) {
//     const bufferChunk =
//       chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
//     previous += bufferChunk;
//     let eolIndex;
//     while ((eolIndex = previous.indexOf('\n')) >= 0) {
//       // line includes the EOL
//       const line = previous.slice(0, eolIndex + 1).trimEnd();
//       if (line === 'data: [DONE]') break;
//       if (line.startsWith('data: ')) yield line;
//       previous = previous.slice(eolIndex + 1);
//     }
//   }
// }
//
// async function* linesToMessages(linesAsync) {
//   for await (const line of linesAsync) {
//     const message = line.substring('data :'.length);
//
//     yield message;
//   }
// }
//
// export async function* streamCompletion(data) {
//   yield* linesToMessages(chunksToLines(data));
// }

import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '../http/openAI';

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const DEFAULT_OPEN_AI_OPTIONS = {
  model: 'text-davinci-002',
  prompt: 'It was the best of times',
  max_tokens: 1024,
  temperature: 0,
  stream: true,
};

export async function streamChatCompletion(messages) {
  const response = await openai.createCompletion(
    {
      model: 'text-davinci-002',
      prompt: 'функция сортировки',
      stream: true,
    },
    {
      responseType: 'stream',
    }
  );

  const reader = response.body.getReader();
  let output = '';

  reader.read().then(function processResult(result) {
    if (result.done) {
      console.log('Stream finished', output);
      return;
    }

    output += new TextDecoder('utf-8').decode(result.value);
    console.log('Partial result', output);

    return reader.read().then(processResult);
  });

  // for await (const chunk of response.data) {
  //   const lines = chunk
  //     .toString('utf8')
  //     .split('\n')
  //     .filter((line) => line.trim().startsWith('data: '));
  //
  //   for (const line of lines) {
  //     const message = line.replace(/^data: /, '');
  //     if (message === '[DONE]') {
  //       return;
  //     }
  //
  //     const json = JSON.parse(message);
  //     const token = json.choices[0].delta.content;
  //     if (token) {
  //       yield token;
  //     }
  //   }
  // }
}
