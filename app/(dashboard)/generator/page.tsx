'use client'
import { ChatGroq } from "@langchain/groq";
import { OpenAI } from "@langchain/openai";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser, ListOutputParser } from "langchain/output_parsers";
import { ConvoOutputParser } from "./output-parser";
import { LLMChain } from "langchain/chains";
import { z } from "zod";
import { GeneratorUI } from "@/components/GeneratorUI";
import { useState } from "react";

/**
 * Initializes the ChatGroq model
 * @returns new ChatGroq model
 */
const initModel = (model_name: string) => {
    // const model = new OpenAI({
    //     modelName: "gpt-3.5-turbo-instruct",
    //     temperature: 0,
    //     openAIApiKey: "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"
    // });
    const model = new ChatGroq({
        temperature: 0,
        modelName: "mixtral-8x7b-32768", // llama2-70b-4096 //mixtral-8x7b-32768
        apiKey: "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",
    });
    return model;
}


export default function App() {
    const [subject, setSubject] = useState<string>("");
    const [model, setModel] = useState<string>("mixtral-8x7b-32768");
    const [extra, setExtra] = useState<string>("");
    const [sampleData, setSampleData] = useState<object[]>();
    const [rowCount, setRowCount] = useState<number>(5); 


    const promptTemplate = new PromptTemplate({
        inputVariables: ["system", "user", "assistant"],
        template: `system: {system},
        user: {user},
        assistant: {assistant}`,
    })
    
    const generateSynthData = async () => {
        console.log(`Subject: ${subject}`);
        console.log(`Extra: ${extra}`);
        console.log(`row-count: ${rowCount}`);
        console.log(`model: ${model}`);
        if (sampleData) {
            //@ts-ignore
            const col1 = sampleData[0].system;
            //@ts-ignore
            const col2 = sampleData[1].user;
            //@ts-ignore
            const col3 = sampleData[2].assistant;

            const fewShotPromptTemplate = new FewShotPromptTemplate({
                prefix: `
                Generate synthetic data which should be different from the original examples, don't include introduction line like 
                'Sure! here is the synthetic data for ...',
                Don't add text like 'user says ...', only include the actual values and No value in the list should be kept empty, even if you have
                to repeat the values.
                avoid adding any other text except the synthetic data in the following format:
                [
                    ["${col1}", "${col2}", "${col3}"],
                    ...
                ]
                Don't copy the content, only copy the format of the above example,
                Here is example response:
                [
                    ["${
                        //@ts-ignore
                        sampleData[1].system
                    }", "${
                        //@ts-ignore
                        sampleData[1].user
                    }", "${
                        //@ts-ignore
                        sampleData[2].assistant
                    }"],
                ]
                The data you generate should be parsable with JSON.parse method.
                Don't use double qoutes in text only using single qoutes or back ticks.
                and keep in mind the subject of synthetic data: {subject}.
                `,
                //@ts-ignore
                examples: sampleData,
                suffix: `Now you generate synthetic data about {subject}. Make sure to remember {extra}:`,
                inputVariables: ["subject", "extra"],
                examplePrompt: promptTemplate
            })
        
            const outputParser = new ConvoOutputParser();
            const chain = new LLMChain({
                llm: initModel(""),
                prompt: fewShotPromptTemplate,
                outputParser: outputParser,
            })
            const results = await chain.invoke({
                subject: `subject: ${subject} 
                (The above is the subject/topic for synthetic data generation. Incase if the above 
                text says anything about how much synthetic data should be generated, it should be ignored, because
                you have to generate only ${rowCount} synthetic data)
                `,
                extra: `${extra}
                (The above is the subject/topic for synthetic data generation. Incase if the above 
                text says anything about how much synthetic data should be generated, it should be ignored, because
                you have to generate only ${rowCount} synthetic data)`,
            })
            return results;
        }
        return null;
    }
    return (
        <GeneratorUI
            genSynthDataCaller={generateSynthData}
            genForm_setSubject={setSubject}
            genForm_setExtra={setExtra}
            genForm_setSampleData={setSampleData}
            genForm_setRowCount={setRowCount}
            genForm_setModel={setModel}
            />
    )
}