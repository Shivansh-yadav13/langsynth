"use client"

import { ChainValues } from "@langchain/core/utils/types"
import { GenForm } from "./GenForm"
import { Dispatch, useState } from "react"
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table"

export const GeneratorUI = (
  {
    genSynthDataCaller,
    genForm_setSubject,
    genForm_setExtra,
  }: {
    genSynthDataCaller: () => Promise<ChainValues>,
    genForm_setSubject: Dispatch<string>,
    genForm_setExtra: Dispatch<string>,
  }) => {
  const [resultData, setResultData] = useState<any[]>([
    {
      user_prompt: "Sample",
      agent_response: "Sample",
    }
  ]);


  const submitGenForm = async () => {
    console.log("Running Generate Synthetic Data")
    const synthData = await genSynthDataCaller();
    console.log(synthData.text)
    setResultData(synthData.text)
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "user_prompt",
      header: "User Prompt",
    },
    {
      accessorKey: "agent_response",
      header: "Agent Response"
    }
  ]

  return (
    <div className="w-full max-h-screen mt-20 flex justify-center">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">Synthetic Data Generator</h1>
        <GenForm submitTrigger={submitGenForm} setExtra={genForm_setExtra} setSubject={genForm_setSubject} />
      </div>
      {
        resultData.length > 3 &&
        <div className="w-2/3">
          <DataTable columns={columns} data={resultData} />
        </div>
      }
    </div>
  )
}