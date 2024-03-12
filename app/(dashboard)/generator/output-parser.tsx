import { BaseOutputParser, OutputParserException } from "@langchain/core/output_parsers";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { ChatGroq } from "@langchain/groq";
import { toast } from "sonner"

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
    let parsedResponse: ExpectedOutput = [{ system: "", user: "", assistant: "" }];
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
    } catch (error) {
      // try {
      //   const model = new ChatGroq({
      //     temperature: 0,
      //     modelName: "mixtral-8x7b-32768", // llama2-70b-4096 //mixtral-8x7b-32768 // Gemma-7b-it
      //     apiKey: "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",
      //   });
      //   const promptTemplate = PromptTemplate.fromTemplate(`
      //   Below is a list which has many lists inside it.
      //   In those lists 1st element of the list if system, second element of the list of user and thrid element of the lsit is assistant.
      //   {string_output}
      //   `);
      //   const outputParser = new ConvoOutputParser();
      //   const chain = RunnableSequence.from([promptTemplate, model, outputParser]);
      //   const resultOutput = await chain.invoke({ string_output: llmOutput });
      //   for (const data of resultOutput) {
      //     parsedResponse.push({
      //       'system': data.system,
      //       'user': data.user,
      //       'assistant': data.assistant
      //     })
      //   }
      //   parsedResponse.shift();
      // } catch (e) {
      //   // throw new OutputParserException(
      //   //   //@ts-ignore
      //   //   `Failed to parse. Response: "${llmOutput}". Error: ${error.message}`
      //   // )
      // }
      // console.log("Error parsing LLM output:", error, llmOutput)
      toast("Error parsing output data", {description: "Please try again."});
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