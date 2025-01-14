"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { categoryColors } from "@/data/categories";
import { format } from "date-fns";


const TranscationsTable = ({transactions}) => {
    const FilterAndSortedTranscations = transactions;
    const handelSort =(p0?: string)=>{

    }
  return (
    <div className="space-y-4">
      {/* Filters */}

      {/* Transcations */}
      <div className="rounded-md border">
      <Table>
     <TableHeader>
     <TableRow>
     <TableHead className="w-[50px]">
        <Checkbox/>
      </TableHead>
      <TableHead className="cursor-pointer" 
      onClick={()=>handelSort("date")}>
       <div className="flex items-center"> Date</div>
      </TableHead>
      <TableHead>Description</TableHead>
      <TableHead className="cursor-pointer" 
      onClick={()=>handelSort("category")}>
      <div className="flex items-center">  Category</div>
      </TableHead>
      <TableHead className="cursor-pointer" 
      onClick={()=>handelSort("amount")}>
        <div className="flex items-center justify-end">Amount</div>
      </TableHead>
      <TableHead>Recurring</TableHead>
      <TableHead className="w-[50px]"></TableHead>

    </TableRow>
  </TableHeader>
  <TableBody>
    {FilterAndSortedTranscations.length === 0 ? (
        <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
                No Transcations Found
            </TableCell>
        </TableRow>
    ) : (
        FilterAndSortedTranscations.map((transcation)=>{
            <TableRow key={transcation.id}>
            <TableCell>
                <Checkbox/>
            </TableCell>
            <TableCell>
            {format(new Date(transcation.date), "PP")}

            </TableCell>
            <TableCell>{transcation.description}</TableCell>
            <TableCell className="capitalize">
                <span style={{
                    background: categoryColors[transcation.category]
                }} className="px-2 py-1 rounded text-white text-sm">

                </span>
                {transcation.category}
                </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        })
       
    )}
   
  </TableBody>
</Table>
</div>
 </div>
  )
}

export default TranscationsTable
