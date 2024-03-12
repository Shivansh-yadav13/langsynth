"use client"

import { ChainValues } from "@langchain/core/utils/types"
import { GenForm } from "./GenForm"
import { Dispatch, useState } from "react"
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Gauge } from "lucide-react";


export const GeneratorUI = (
  {
    resultData,
    genSynthDataCaller,
    genForm_setSubject,
    genForm_setExtra,
    genForm_setSampleData,
    genForm_setRowCount,
    genForm_setModel
  }: {
    resultData: any[]
    genSynthDataCaller: () => Promise<ChainValues | null>,
    genForm_setSubject: Dispatch<string>,
    genForm_setExtra: Dispatch<string>,
    genForm_setSampleData: Dispatch<object[]>,
    genForm_setRowCount: Dispatch<number>,
    genForm_setModel: Dispatch<string>,
  }) => {
    const [loading, setLoading] = useState<boolean>(false);
  

  const submitGenForm = async () => {
    await genSynthDataCaller();
    setLoading(false);
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "system",
      header: "System",
    },
    {
      accessorKey: "user",
      header: "User"
    },
    {
      accessorKey: "assistant",
      header: "Assistant"
    }
  ]

  return (
    <div className="w-full flex flex-col p-2 mt-10">
      <h1 className="font-bold text-5xl mt-5 text-center gap-4">Synthetic Data Generator ⚙️</h1>
      <div className="w-full mt-20">
        <ResizablePanelGroup className="flex gap-10 h-0" direction="horizontal">
          <ResizablePanel minSize={20} defaultSize={10}>
            <h2 className="text-3xl">Configuration</h2>
            <GenForm
              loading={loading}
              setLoading={setLoading}
              submitTrigger={submitGenForm}
              setExtra={genForm_setExtra}
              setSubject={genForm_setSubject}
              setSampleData={genForm_setSampleData}
              setRowCount={genForm_setRowCount}
              setModel={genForm_setModel}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={35}>
            {
              resultData.length > 3 ?
                <DataTable columns={columns} data={resultData} />
                :
                <DataTable columns={columns} data={[]} />
            }
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}