'use client'
import Image from "next/image";
import Link from 'next/link'
import { ChatGroq } from "@langchain/groq";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ConvoOutputParser } from "./output-parser";
import { LLMChain } from "langchain/chains";
import { GeneratorUI } from "@/components/GeneratorUI";
import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import AuthContext from "@/app/contexts/authContext";
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
        modelName: "mixtral-8x7b-32768", // llama2-70b-4096 //mixtral-8x7b-32768 // Gemma-7b-it
        apiKey: "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",
    });
    return model;
}

export default function App() {
    const [subject, setSubject] = useState<string>("");
    const [model, setModel] = useState<string>("mixtral-8x7b-32768");
    const [extra, setExtra] = useState<string>("");
    const [sampleData, setSampleData] = useState<object[]>();
    const [rowCount, setRowCount] = useState<number>(10);
    const authContext = useContext(AuthContext);
    const [allowUser, setAllowUser] = useState<boolean>(false);
    const [resultData, setResultData] = useState<any[]>([
        {
          user: "Sample",
          system: "Sample",
          assistant: "Sample",
        }
      ]);

    const promptTemplate = new PromptTemplate({
        inputVariables: ["system", "user", "assistant"],
        template: `system: {system},
        user: {user},
        assistant: {assistant}`,
    })

    const generateSynthData = async () => {
        if (sampleData) {
            //@ts-ignore
            const col1 = sampleData[0].system;
            //@ts-ignore
            const col2 = sampleData[0].user;
            //@ts-ignore
            const col3 = sampleData[0].assistant;

            const outputParser = new ConvoOutputParser();

            
            let arrayOfResults: any[] = [];
            
            for (let i = 0; i < 1; i++) {
                const fewShotPromptTemplate: FewShotPromptTemplate = new FewShotPromptTemplate({
                    prefix: `
                    Generate synthetic data which should be different from the original examples, don't include introduction line like 
                    'Sure! here is the synthetic data for ...',
                    Don't add text like 'user says ...', only include the actual values and No value in the list should be kept empty, even if you have
                    to repeat the values.
                    avoid adding any other text except the synthetic data in the following format:
                    [["${col1}", "${col2}", "${col3}"], ...]
                    Don't copy the content, only copy the format of the above example,
                    ${                        arrayOfResults.length > 0 ?
                        `
                            Here are some examples
                            [${arrayOfResults.map((item) => `["${item[0]}", "${item[1]}", "${item[2]}"],`)}]
                        `
                        :
                        `
                        Here is example response:
                        [["${
                            //@ts-ignore
                            sampleData[1].system
                            }", "${
                            //@ts-ignore
                            sampleData[1].user
                            }", "${
                            //@ts-ignore
                            sampleData[1].assistant
                            }"],]
                        `
                    }
                    Don't copy the above examples use them for inspiration.
                    each element in the list can only be upto 125 characters.
                    The data you generate should be parsable with JSON.parse method.
                    Don't use double qoutes in text, only use single qoutes or back ticks.
                    Don't use any qoutes for square brackets.
                    Don't add empty lines in the response.
                    and keep in mind the subject/topic of synthetic data to generate: {subject}.
                    `,
                    //@ts-ignore
                    examples: sampleData,
                    suffix: `Here is some extra information about the data: {extra}`,
                    inputVariables: ["subject", "extra"],
                    examplePrompt: promptTemplate
                })
    
                
                const chain = new LLMChain({
                    llm: initModel(),
                    prompt: fewShotPromptTemplate,
                    outputParser: outputParser,
                })

                setTimeout(async () => {
                    const results = await chain.invoke({
                        subject: `subject: ${subject} 
                        (The above is the subject/topic for synthetic data generation. Incase if the above 
                        text says anything about how much synthetic data should be generated, it should be ignored, because
                        you have to generate only ${rowCount} synthetic data)
                        `,
                        extra: `${extra}
                        (The above is the subject/topic for synthetic data generation. Incase if the above 
                        text says anything about how much synthetic data should be generated, it should be ignored, if the above text
                        says anything about the characters to maintina in the string, it should be ignored because
                        you have to generate Exactly 10 synthetic data with 125 characters in each element of the text, try to make them unqiue.)`,
                    })
                    arrayOfResults.push(results.text);
                    //@ts-ignore
                    const finalResultData = [].concat(...arrayOfResults);
                    setResultData(finalResultData);
                }, 1000) // 10 secs delay
            }
        }
        return null;
    }

    useEffect(() => {
        const userSession = authContext.session;
        if (userSession) {
            setAllowUser(true);
        }
    }, [authContext.session])

    return (
        <>
            {
                allowUser ?
                    <GeneratorUI
                        resultData={resultData}
                        genSynthDataCaller={generateSynthData}
                        genForm_setSubject={setSubject}
                        genForm_setExtra={setExtra}
                        genForm_setSampleData={setSampleData}
                        genForm_setRowCount={setRowCount}
                        genForm_setModel={setModel}
                    />
                    :
                    <div className="w-full h-screen">
                        <div className="w-fit m-auto h-full items-center flex flex-col gap-5 justify-center">
                            <Image src="/images/logo.png" width={200} height={200} alt="logo" />
                            <p>You need to login, to use Lang<span className="text-prime">Synth</span></p>
                            <Link href="/authenticate">
                                <Button variant="outline">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
            }
        </>
    )
}