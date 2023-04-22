
import { Configuration, OpenAIApi } from 'openai'
import config from "config";

const openaiApiKey = config.get("OPENAI_KEY");

const configuration = new Configuration({
  apiKey: openaiApiKey
})

export const openai = new OpenAIApi(configuration)