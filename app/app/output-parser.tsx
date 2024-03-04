import { BaseOutputParser, OutputParserException } from "@langchain/core/output_parsers";

type ExpectedOutput = {
  user_prompt: string,
  agent_response: string
}

export class ConvoOutputParser extends BaseOutputParser<ExpectedOutput> {
  lc_namespace = ["langchain", "output_parsers"];

  constructor(fields?: ConvoOutputParser) {
      super(fields);
  }

  getFormatInstructions(): string {
    return `Your response must be a JSON object with two keys "user_prompt" & "agent_response" both with a single string value. Do not return anything else.`;
  }

  async parse(llmOutput: string): Promise<ExpectedOutput> {

    // Parsing the LLM response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(llmOutput);
    } catch (e) {
      throw new OutputParserException(
        //@ts-ignore
        `Failed to parse. Response: "${llmOutput}". Error: ${e.message}`
      )
    }

    if (parsedResponse.user_prompt === undefined || parsedResponse.agent_response === undefined) {
      throw new OutputParserException(
        `Failed to parse. Response: "${llmOutput}". Error Missing some of the keys: "user_prompt" or "agent_response" or both.`
      )
    }

    if (Object.keys(parsedResponse).length !== 2) {
      throw new OutputParserException(
        `Failed to parse. Response "${llmOutput}". Found ${Object.keys(parsedResponse).length} keys instead of 2.`
      )
    }

    return parsedResponse;
  }
}