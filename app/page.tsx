import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"; 
import { Playfair_Display } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DeployButton from "@/components/supabase/DeployButton";
import AuthButton from "@/components/supabase/AuthButton";
import SignUpUserSteps from "@/components/supabase/SignUpUserSteps";
import ConnectSupabaseSteps from "@/components/supabase/ConnectSupabaseSteps";

const pfd = Playfair_Display({ subsets: ["latin"], style: ["italic"] });

export default function Home() {

  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  }

  const isSupabaseConnected = canInitSupabaseClient();



  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 select-none">
      <svg
        className="absolute inset-0 -top-24 -z-10 h-full w-full stroke-gray-500 [mask-image:radial-gradient(80%_40%_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        ></rect>
      </svg>
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      <div className="flex flex-col gap-4 text-6xl text-center font-bold">
        <h1>Build High Quality LLMs using</h1>
        <h1 className="text-prime">Synthetic Data</h1>
      </div>
      <p className='text-wrap w-2/4 text-zinc-400 text-center'>Supercharge your LLMs with diverse and bias-minimized synthetic data, unlocking their full potential for accurate and fair AI language processing</p>

      <div className="flex flex-col gap-3 justify-center">
        <Button>Get Started</Button>
        {/* <Badge variant="outline">No Credit Card Required</Badge> */}
        <Badge variant="outline" className="mx-auto">{`It's Free`}</Badge>
        <p className="text-xs italic text-zinc-400 my-2 font-bold"></p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <Image
            src="/images/data.png"
            alt="data"
            width={80}
            height={80}
          />
          <div>
            <h2 className="font-bold text-3xl">SOTA High-Quality Synthetic Data</h2>
            <p className="text-zinc-400 w-1/2">{`LangSynth leverage state-of-the-art (SOTA) models to ensure the highest quality synthetic data, specifically designed for LLM training.`}</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Image
            className="ml-auto"
            src="/images/speed.png"
            alt="data"
            width={80}
            height={80}
          />
          <div className="text-right">
            <h2 className="font-bold text-3xl">GodSpeed Synthetic Data Generation</h2>
            <p className="text-zinc-400 w-1/2 ml-auto">{`Experience unparalleled speed with the industry-leading synthetic data generation engine. Get the data you need, faster than ever before.`}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <h2 className="font-bold text-4xl">Why Synthetic Data?</h2>
          <p className="text-zinc-400">{`
            Synthetic Data is important because it can help to train the model on a wide range of topics and styles of language. This can result in more versatile and creative language generation, as the model is not limited by the specific data it has been trained on. Synthetic data can also help to identify and correct errors in the model's output, as it can generate data that is similar to real-world data but with known errors or inaccuracies.
          `}</p>
          <p className="font-bold text-lg">{`Elon Musk & Jim Fan from NVIDIA has also shared about the importance of Synthetic Data.`}</p>
          <Image 
            className="mx-auto mt-5 border-2 border-prime rounded-xl"
            src="/images/tweet.png"
            alt="tweet"
            width={500}
            height={500}
          />
        </div>

        {/* <div className="flex flex-col w-full">
          <Image
            src="/images/cost.png"
            alt="data"
            width={80}
            height={80}
          />
          <div>
            <h2 className="font-bold text-3xl">Cost-Effective Synthetic Data</h2>
            <p className="text-zinc-400 w-1/2">{`Slash your development costs compared to real-world data acquisition and curation. Our efficient synthetic data generation process saves you time and money, allowing you to focus on building innovative LLMs.`}</p>
          </div>
        </div> */}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-bold mt-10">Get Started for <span className="text-prime">Free</span></h2>
        <p className="text-zinc-400 text-center">Experince the power of Synthetic Data for Absolutely Free</p>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <Button>Get Started</Button>
        <Badge variant="outline" className="mx-auto">{`It's Free`}</Badge>
        {/* <Badge variant="outline">No Credit Card Required</Badge> */}
        <p className="text-xs italic text-zinc-400 my-2 font-bold"></p>
      </div>

      {/* <h3 className="mr-auto text-3xl font-bold">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </main>
  );
}
