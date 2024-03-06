import { BaseOutputParser, OutputParserException } from "@langchain/core/output_parsers";

type ExpectedOutput = [
  {
    user_prompt: string,
    agent_response: string
  }
]

export class ConvoOutputParser extends BaseOutputParser<ExpectedOutput> {
  lc_namespace = ["langchain", "output_parsers"];

  constructor(fields?: ConvoOutputParser) {
      super(fields);
  }

  getFormatInstructions(): string {
    return `
    Your response should be in the format of a Python List/Array which has the first element as the user_prompt and the sencond element as the agent_response, for example 
    ["userprompt text", "agent response text"]
    but only include the text to it and not "user_prompt" and "agent_response" keys.
    `;
  }

  async parse(llmOutput: string): Promise<ExpectedOutput> {

    // Parsing the LLM response
    let parsedResponse: ExpectedOutput = [{user_prompt: "", agent_response: ""}];
    try {
      const dataList = JSON.parse(llmOutput)
      for (const data of dataList) {
        parsedResponse.push({
          'user_prompt': data[0],
          'agent_response': data[1]
        })
      }
      parsedResponse.shift();
    } catch (e) {
      throw new OutputParserException(
        //@ts-ignore
        `Failed to parse. Response: "${llmOutput}". Error: ${e.message}`
      )
    }

    if (parsedResponse[0].user_prompt === undefined || parsedResponse[0].agent_response === undefined) {
      throw new OutputParserException(
        `Failed to parse. Response: "${llmOutput}". Error Missing some of the keys: "user_prompt" or "agent_response" or both.`
      )
    }

    // if (Object.keys(parsedResponse).length !== 2) {
    //   throw new OutputParserException(
    //     `Failed to parse. Response "${llmOutput}". Found ${Object.keys(parsedResponse).length} keys instead of 2.`
    //   )
    // }

    return parsedResponse;
  }
}