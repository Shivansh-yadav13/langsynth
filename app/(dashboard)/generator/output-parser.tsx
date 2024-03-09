import { BaseOutputParser, OutputParserException } from "@langchain/core/output_parsers";

type ExpectedOutput = [
  {
    system: string,
    user: string,
    assistant: string
  }
]

export class ConvoOutputParser extends BaseOutputParser<ExpectedOutput> {
  lc_namespace = ["langchain", "output_parsers"];

  constructor(fields?: ConvoOutputParser) {
      super(fields);
  }

  getFormatInstructions(): string {
    return ``;
  }

  async parse(llmOutput: string): Promise<ExpectedOutput> {

    // Parsing the LLM response
    let parsedResponse: ExpectedOutput = [{system: "", user: "", assistant: ""}];
    try {
      const dataList = JSON.parse(llmOutput)
      for (const data of dataList) {
        parsedResponse.push({
          'system': data[0],
          'user': data[1],
          'assistant': data[2]
        })
      }
      parsedResponse.shift();
    } catch (e) {
      throw new OutputParserException(
        //@ts-ignore
        `Failed to parse. Response: "${llmOutput}". Error: ${e.message}`
      )
    }

    // if (parsedResponse[0].system === undefined || parsedResponse[0].user === undefined || parsedResponse[0].assistant === undefined) {
    //   throw new OutputParserException(
    //     `Failed to parse. Response: "${llmOutput}". Error Missing some of the keys: "system" or "user" or "assistant".`
    //   )
    // }

    // if (Object.keys(parsedResponse).length !== 2) {
    //   throw new OutputParserException(
    //     `Failed to parse. Response "${llmOutput}". Found ${Object.keys(parsedResponse).length} keys instead of 2.`
    //   )
    // }

    return parsedResponse;
  }
}