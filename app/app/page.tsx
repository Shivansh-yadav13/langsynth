import { ChatGroq } from "@langchain/groq";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ConvoOutputParser } from "./output-parser";
import { LLMChain } from "langchain/chains";
import { z } from "zod";

/**
 * Initializes the ChatGroq model
 * @returns new ChatGroq model
 */
const initGroqModel = () => {
    return new ChatGroq({
        temperature: 0,
        modelName: "mixtral-8x7b-32768",
        apiKey: ''
    });
}

export default async function App() {

    const promptTemplate = new PromptTemplate({
        inputVariables: ["user_prompt", "agent_response"],
        template: "user_prompt: {user_prompt},\nagent_response: {agent_response}",
    })

    const fewShotPromptTemplate = new FewShotPromptTemplate({
        prefix: `
        Generate synthetic data which should be different from the original example, don't include introduction line like 
        'Sure! here is the synthetic data for ...', 
        avoid adding any other text except the synthetic data in the format of examples, the format should be a list of JSON objects: 
        eg: 
            curly_braces
                "user_prompt": "...",
                "agent_response": "..."
            curly_braces,
        just replace 'curly_braces' with actual opening and closing curly brackets
        and keep in mind the subject of synthetic data: {subject}.
        And only generate 1 conversation response.
        `,
        examples: [
            {
                "user_prompt": `I'm worried about my memory. Lately, I've been forgetting things more often, like misplaced keys or appointments. Is this a sign of something serious?`,
                "agent_response": `HEN! HEN! HEN! I understand your concern Age-related memory decline is a common worry, but it's important to consider other factors. Let's explore some strategies for managing stress and improving sleep hygiene. Additionally, engaging in brain-stimulating activities like puzzles or learning a new language can be beneficial.`,
            },
            {
                "user_prompt": `I keep having these vivid nightmares that wake me up feeling scared and anxious. 
                They're affecting my sleep and overall well-being.`,
                "agent_response": `HEN! HEN! HEN!, Nightmares can be 
                disruptive and distressing. It's possible these nightmares could be related to underlying stress or 
                anxieties. We can explore relaxation techniques like deep breathing or meditation before bed to promote 
                better sleep. Additionally, keeping a dream journal can help identify any recurring themes and potential 
                triggers.`,
            },
            {
                "user_prompt": `I'm struggling with addiction and feel like I'm losing control of my life. I'm 
                ready to seek help but don't know where to start.`,
                "agent_response": `HEN! HEN! HEN!, It takes courage to 
                admit you need help, and I commend you for taking this step. Addiction is a complex issue, but there are 
                effective treatment options available. We can discuss different approaches, including therapy groups, 
                support networks, and medication-assisted treatment, if appropriate.`,
            },
        ],
        suffix: `Now you generate synthetic data about {subject}. Make sure to remember {extra}:`,
        inputVariables: ["subject", "extra"],
        examplePrompt: promptTemplate
    })

    const outputParser = new ConvoOutputParser();
    
    const chain = new LLMChain({
        llm: initGroqModel(),
        prompt: fewShotPromptTemplate,
        outputParser: outputParser
    })

    // const results = await chain.invoke({
    //     subject: "conversation between a mental health doctor and a patient", 
    //     extra: `
    //     user_prompt must have unique and different problem/situations, 
    //     agent_response should respond uniquely for different conversations,
    //     Only generate 1 conversation response.`,
    //     format_instructions: outputParser.getFormatInstructions(),
    // })

    // console.log(results.text)

    return (
        <h1>LangSynth</h1>
    )
}