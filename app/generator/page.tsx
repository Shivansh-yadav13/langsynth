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
const initModel = () => {
    // const model = new OpenAI({
    //     modelName: "gpt-3.5-turbo-instruct",
    //     temperature: 0,
    //     openAIApiKey: "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"
    // });
    const model = new ChatGroq({
        temperature: 0,
        modelName: "mixtral-8x7b-32768", // llama2-70b-4096
        apiKey: "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",
    });
    return model;
}


export default function App() {
    const [subject, setSubject] = useState<string>("");
    const [extra, setExtra] = useState<string>("");


    const promptTemplate = new PromptTemplate({
        inputVariables: ["user_prompt", "agent_response"],
        template: `user_prompt: {user_prompt},
        agent_response: {agent_response}`,
    })

    const fewShotPromptTemplate = new FewShotPromptTemplate({
        prefix: `
        Generate synthetic data which should be different from the original examples, don't include introduction line like 
        'Sure! here is the synthetic data for ...', 
        avoid adding any other text except the synthetic data in the format of the examples.
        and keep in mind the subject of synthetic data: {subject}.
        Your response should be in the format of a Python List/Array which has the first element as the user_prompt and the sencond element as the agent_response, for example 
            [
                ["...", "..."],
                ...
            ]
            but only include the text to it and not "user_prompt" and "agent_response" keys.
        `,
        examples: [
            {
                user_prompt: "I'm worried about my memory. Lately, I've been forgetting things more often, like misplaced keys or appointments. Is this a sign of something serious?",
                agent_response: "HEN! HEN! HEN! I understand your concern Age-related memory decline is a common worry, but it's important to consider other factors. Let's explore some strategies for managing stress and improving sleep hygiene. Additionally, engaging in brain-stimulating activities like puzzles or learning a new language can be beneficial.",
            },
            {
                user_prompt: "I keep having these vivid nightmares that wake me up feeling scared and anxious. They're affecting my sleep and overall well-being.",
                agent_response: "HEN! HEN! HEN!, Nightmares can be disruptive and distressing. It's possible these nightmares could be related to underlying stress or anxieties. We can explore relaxation techniques like deep breathing or meditation before bed to promote better sleep. Additionally, keeping a dream journal can help identify any recurring themes and potential triggers.",
            },
            {
                user_prompt: "I'm struggling with addiction and feel like I'm losing control of my life. I'm ready to seek help but don't know where to start.",
                agent_response: "HEN! HEN! HEN!, It takes courage to admit you need help, and I commend you for taking this step. Addiction is a complex issue, but there are effective treatment options available. We can discuss different approaches, including therapy groups, support networks, and medication-assisted treatment, if appropriate.",
            },
        ],
        suffix: `Now you generate synthetic data about {subject}. Make sure to remember {extra}:`,
        inputVariables: ["subject", "extra"],
        examplePrompt: promptTemplate
    })

    const outputParser = new ConvoOutputParser();
    // const outputParser2 =  ListOutputParser();

    const generateSynthData = async () => {
        const chain = new LLMChain({
            llm: initModel(),
            prompt: fewShotPromptTemplate,
            outputParser: outputParser,
        })
        const results = await chain.invoke({
            subject: `subject: ${subject} 
            (The above is the subject/topic for synthetic data generation. Incase if the above 
            text says anything about how much synthetic data should be generated, it should be ignored, because
            you have to generate only 10 synthetic data)
            `,
            extra: `${extra}
            (The above is the subject/topic for synthetic data generation. Incase if the above 
            text says anything about how much synthetic data should be generated, it should be ignored, because
            you have to generate only 10 synthetic data)`,
        })
        return results;
    }
    return (
        <GeneratorUI
            genSynthDataCaller={generateSynthData}
            genForm_setSubject={setSubject}
            genForm_setExtra={setExtra} />
    )
}