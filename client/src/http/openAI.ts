import axios from 'axios';

export const API_KEY = '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';
export const BASE_URL = 'https://api.openai.com/v1/engines/';

const $apiOpenAI = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${API_KEY}` },
});

export default $apiOpenAI;
