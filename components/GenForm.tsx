"use client"
import { useForm } from "react-hook-form"
import { FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { object, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dispatch } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Slider } from "@/components/ui/slider"


const FormSchema = z.object({
  model: z
    .string({
      required_error: "Please select a model to use.",
    }),
  rows: z
    .number({
      required_error: "How many rows of data do you want to generate?",
    }),
  topic: z
    .string({
      required_error: "What's the data about? Give a topic for the data.",
    }),
  extra_prompt: z
    .string({})
})

const validateObjectStructure = (obj: object) => {
  //@ts-ignore
  // Check if 'data' key exists and it's an array
  if (!obj.hasOwnProperty('data') || !Array.isArray(obj.data)) {
     return false;
  }
  //@ts-ignore
  // Check each item in the 'data' array
  for (const item of obj.data) {
     // Check if 'role' and 'content' keys exist and are of type string
     if (!item.hasOwnProperty('role') || typeof item.role !== 'string' ||
         !item.hasOwnProperty('content') || typeof item.content !== 'string') {
       return false;
     }
 
     // Check if 'role' is one of the allowed values
     if (!['user', 'system', 'assistant'].includes(item.role)) {
       return false;
     }
  }
 
  // If all checks pass, return true
  return true;
 };

const prepareObjForTemplate = (obj: object) => {
  let resultObj = {
    system: "",
    user: "",
    assistant: ""
  }
  //@ts-ignore
  const objlist = obj.data;
  for (const item of objlist) {
    if (item.role === "system") {
      resultObj.system = item.content;
    } else if (item.role === "user") {
      resultObj.user = item.content;
    } else if (item.role === "assistant") {
      resultObj.assistant = item.content;
    }
  }

  return resultObj;
}

export const GenForm = ({
  submitTrigger,
  setSubject,
  setExtra,
  setSampleData,
  setRowCount,
  setModel
}: {
  submitTrigger: () => void,
  setSubject: Dispatch<string>,
  setExtra: Dispatch<string>,
  setSampleData: Dispatch<object[]>,
  setRowCount: Dispatch<number>,
  setModel: Dispatch<string>,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const onSampleDataUpload = async (e: any) => {
    const file: File = e.target.files[0];
    const fileContent = await file.text();
    console.log(fileContent);
    const lines = fileContent.split('\n');
    const jsonLines = lines.filter(line => line.trim() !== '');
    const jsonContent = jsonLines.map(line => JSON.parse(line));

    let finalSampleData: object[] = [];

    // run while loop
    jsonContent.forEach(obj => {
      if (validateObjectStructure(obj)) {
        console.log('Validation succeeded for:', obj);
        const resultObj = prepareObjForTemplate(obj);
        finalSampleData.push(resultObj);
      } else {
        console.log('Validation failed for:', obj);
      }
   });
    console.log(finalSampleData);
    setSampleData(finalSampleData);
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <Select value="mixtral-8x7b-32768">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mixtral-8x7b-32768">{`Mixtral, 8x7B SMoE (32K Context Length)`}</SelectItem>
                {/* <SelectItem value="llama2-70b-4096">{`Llama 2 70B (4096 Context Length)`}</SelectItem> */}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rows"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="rows">{`Number of Rows: ${form.getValues("rows")}`}</Label>
            <Slider id="rows" defaultValue={[5]} max={30} min={5} step={1} onValueChange={(values) => {
              form.setValue("rows", values[0]);
              setRowCount(values[0]);
            }} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="genform-topic">{`What's the data about?`}</Label>
            <Textarea id="genform-topic" placeholder="Explain the topic of the data." onChange={(e) => {
              // form.setValue("topic", e.target.value);
              // console.log(form.getValues("topic"));
              setSubject(e.target.value);
              }} />
            <p className="text-sm text-muted-foreground">This will be used to instruct the model accordingly.</p>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="extra_prompt"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="genform-topic">{`Additional Instruction`}</Label>
            <Textarea id="genform-topic" placeholder="Add any addition information for the model." onChange={(e) => {
              // form.setValue("extra_prompt", e.target.value);
              // console.log(form.getValues("extra_prompt"));
              setExtra(e.target.value);
              }} />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="extra_prompt"
        render={({ field }) => (
          <FormItem>
            <Label className="flex gap-1" htmlFor="picture">
              Sample Real Data
              <HoverCard>
                <HoverCardTrigger>ⓘ</HoverCardTrigger>
                <HoverCardContent className="font-mono w-fit">
                  <h4 className="font-sans font-bold text-lg">Format for data</h4>
                  <p>{`[`}</p>
                  <p className="ml-2">{`{`}</p>
                  <p className="ml-4">{`"data": [`}</p>
                  <p className="ml-6">{`{"role": "system", "content": "..."},`}</p>
                  <p className="ml-6">{`{"role": "user", "content": "..."},`}</p>
                  <p className="ml-6">{`{"role": "assistant", "content": "..."},`}</p>
                  <p className="ml-4">{`]`}</p>
                  <p className="ml-2">{`},`}</p>
                  <p>{`...`}</p>
                  <p>{`]`}</p>
                </HoverCardContent>
              </HoverCard>
            </Label>
            <Input id="sample-data" type="file" accept=".jsonl" onChange={onSampleDataUpload} />
          </FormItem>
        )}
      />
      <Button onClick={() => {
        // setExtra(form.getValues("extra_prompt"));
        // setSubject(form.getValues("topic"));
        // setRowCount(form.getValues("rows"));
        submitTrigger();
      }} className="bg-prime text-black">Generate Synthetic Data</Button>
    </div>
  )
}