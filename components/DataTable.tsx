"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Download } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [dataPageIndex, setDataPageIndex] = useState<number>(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: 5,
        pageIndex: dataPageIndex,
      }
    }
  })

  const handleExportData = async () => {
    //@ts-ignore
    const jsonlData = data.map(obj => JSON.stringify({"messages": [{"role": "system", "content": obj.system}, {"role": "user", "content": obj.user}, {"role": "assistant", "content": obj.assistant}]})).join('\n');
    const blob = new Blob([jsonlData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.jsonl');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <ScrollArea className="h-[100px] p-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </ScrollArea>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {
          data &&
          <Button
            className="flex gap-2"
            variant="outline"
            size="sm"
            onClick={handleExportData}
          >
            <Download size={15} />
            Export JSONL
          </Button>
        }

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage()
            if (dataPageIndex > 0) setDataPageIndex(dataPageIndex - 1);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage()
            setDataPageIndex(dataPageIndex + 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}