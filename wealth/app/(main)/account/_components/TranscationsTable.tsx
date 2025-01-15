"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { categoryColors } from "@/data/categories";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Clock,  MoreHorizontal,  RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface TransactionsTableProps {
  transactions: Transaction[];
}
interface Transaction {
  isRecurring: boolean;
  recurringInterval: any;
  nextRecurringInterval: Date;
  id: string;
  amount: number; 
  date: string; 
  description: string; 
  category: string; 
  type: "INCOME" | "EXPENSE"; 
}

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};
const TranscationsTable = ({transactions} : TransactionsTableProps) => {

    const router = useRouter();
    const[selectedIds,setSelectedIds]= useState([]);
    const [sortConfig, setSortConfig]= useState({
      field:"data",
      direction:"desc"
    })
    console.log(selectedIds);
    
    const FilterAndSortedTranscations = transactions;
    const handelSort = (field: string) => {
      setSortConfig((current) => ({
        field,
        direction:
          current.field === field && current.direction === "asc" ? "desc" : "asc",
      }));
    };
    const handleSelect = (id: string) => {
      setSelectedIds((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id) // Remove the ID if it exists
          : [...current, id] // Add the ID if it doesn't exist
      );
    };
    const handleSelectAll = (id :string)=>{

    }
    const isValidDate = (date: string | Date | undefined | null): boolean => {
      if (!date) return false; // Check for null or undefined
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()); // Check if the date is valid
    };
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
       <div className="flex items-center"> Date 
        { sortConfig.field === 'date' && (
        sortConfig.direction ==="asc" ? <ChevronUp  className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>
       )}
       </div>
      </TableHead>
      <TableHead>Description</TableHead>
      <TableHead className="cursor-pointer" 
      onClick={()=>handelSort("category")}>
          
      <div className="flex items-center">  Category
      { sortConfig.field === 'category' && (
        sortConfig.direction ==="asc" ? <ChevronUp  className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>
       )}
      </div>
      </TableHead>
      <TableHead className="cursor-pointer" 
      onClick={()=>handelSort("amount")}>
        <div className="flex items-center justify-end">Amount
        { sortConfig.field === 'amount' && (
        sortConfig.direction ==="asc" ? <ChevronUp  className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>
       )}
        </div>
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
    FilterAndSortedTranscations.map((transcation) => (
      <TableRow key={transcation.id}>
        <TableCell>
          <Checkbox  onCheckedChange={()=> handleSelect(transcation.id)}
            checked={selectedIds.includes()}/>
        </TableCell>
        <TableCell>
        {format(new Date(transcation.date), "PP")}
        </TableCell>
        <TableCell>{transcation.description}</TableCell>
        <TableCell className="capitalize">
          <span
            style={{
              background: categoryColors[transcation.category],
            }}
            className="px-2 py-1 rounded text-white text-sm"
          >
            {transcation.category}
          </span>
        </TableCell>
        <TableCell className="text-right font-medium"  
        style={{
          color: transcation.type === "EXPENSE" ? "red" :"green"}}>
          {transcation.type === "EXPENSE" ? "-" : "+"}$
          ${transcation.amount.toFixed(2)}
          </TableCell>
          <TableCell>
  {transcation.isRecurring ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="secondary"
            className="gap-1 bg-purple-500 hover:bg-purple-300"
          >
            <RefreshCw className="h-3 w-3" />
            {RECURRING_INTERVALS[transcation.recurringInterval]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <div className="font-medium">Next Date:</div>
            <div>
              {isValidDate(transcation.nextRecurringDate)
                ? format(new Date(transcation.nextRecurringDate), "PPP")
                : "N/A"}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Badge variant="outline" className="gap-1">
      <Clock className="h-3 w-3" />
      One-time
    </Badge>
  )}
</TableCell>
<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button variant="ghost" className="h-8 w-8 p-0">
      <MoreHorizontal  className="h-4 w-4"/>
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={()=>{
        router.push(
          `/transcation/create?edit=${transcation.id}`
        )
      }}>
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive" onClick={()=> deleteFn([transcation.id])}>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
      </TableRow>
    ))
  )}
</TableBody>
</Table>
</div>
 </div>
  )
}

export default TranscationsTable
