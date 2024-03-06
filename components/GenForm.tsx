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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dispatch } from "react"

const FormSchema = z.object({
  model: z
    .string({
      required_error: "Please select a model to use.",
    }),
  topic: z
    .string({
      required_error: "What's the data about? Give a topic for the data.",
    }),
  extra_prompt: z
    .string({})
})

export const GenForm = ({ 
  submitTrigger,
  setSubject,
  setExtra,
 }: { 
  submitTrigger: () => void,
  setSubject: Dispatch<string>,
  setExtra: Dispatch<string>
 }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setSubject(data.topic)
    setExtra(data.extra_prompt)
  }
  return (
    <div className="mt-10 flex flex-col gap-5 w-1/2">
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{`Mixtral, 8x7B SMoE (32K Context Length)`}</SelectItem>
                <SelectItem value="dark">{`Llama 2 70B (4096 Context Length)`}</SelectItem>
                <SelectItem value="system">{`Llama 2 7B (2048 Context Length)`}</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="genform-topic">{`What's the data about?`}</Label>
            <Textarea id="genform-topic" placeholder="Explain the topic of the data." />
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
            <Textarea id="genform-topic" placeholder="Add any addition information for the model." />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="extra_prompt"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="picture">Example Real Data</Label>
            <Input id="picture" type="file" accept=".jsonl" />
          </FormItem>
        )}
      />
      <div className="bg-zinc-950 text-xs">
        <p>Example of example real data to upload</p>
        <code>
          {`{`}
          <br />
          {`    “text1”: “....”,`}
          <br />
          {`    “text2”: “....”,`}
          <br />
          {`    ...`}
          <br />
          {`}`}
        </code>
      </div>
      <Button onClick={() => {
        setExtra(form.getValues("extra_prompt"));
        setSubject(form.getValues("topic"));
        submitTrigger();
      }} className="bg-prime text-black">Generate Synthetic Data</Button>
    </div>
  )
}