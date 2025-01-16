/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { categoryColors } from "@/data/categories";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw, Search, Trash, X } from "lucide-react";
import { setConfig } from "next/config";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string | null;
  date: string; // ISO string
  category: string;
  isRecurring: boolean;
  recurringInterval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null;
  nextRecurringInterval: string | null; // ISO string
}

interface TransactionsTableProps {
  transactions: Transaction[];
  deleteFn: (ids: string[]) => void;
}

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, deleteFn }) => {
  const router = useRouter();
  const[SerachTerms,SetSerachTerms]= useState("");
  const[typeFilter,SetypeFilter]=useState("");
  const[recurringFilter,SetrecurringFilter]= useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ field: keyof Transaction; direction: "asc" | "desc" }>({
    field: "date",
    direction: "desc",
  });

  const handleSort = (field: keyof Transaction) => {
    setSortConfig((current) => ({
      field,
      direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };
 const handleDBulkDelete = ()=>{}
 const handleClearFilters= ()=>{
  SetSerachTerms(""),
  SetypeFilter(""),
  SetrecurringFilter("")
  setSelectedIds([])
 }
 const filterAndSortedTranscations= useMemo(()=>{
      let result = [...transactions]
      if(SerachTerms){
        const SearchLower = SerachTerms.toLowerCase();
        result= result.filter((transaction) => 
        transaction.description?.toLowerCase().includes(SearchLower)
      );
      }
      if(recurringFilter){
        result= result.filter((transaction)=>{
          if(recurringFilter === "recurring") return transaction.isRecurring;
          return !transaction.isRecurring;
        })

        if(typeFilter){
          result= result.filter((transaction)=> transaction.type ===typeFilter)
        }
        result.sort((a,b)=>{
          let comparision = 0;
          switch(sortConfig.field){
            case  "date" :
            comparision = new Date(a.date) - new Date(b.date);
            break;
            case "amount" :
              comparision = a.category.localeCompare(b.category);
              break;

              default :
              comparision = 0;
          }
          return sortConfig.direction === "asc" ? comparision : -comparision
        })
      }
      return result
 }, [transactions,SerachTerms,typeFilter,recurringFilter,setConfig])

 

  const handleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === transactions.length ? [] : transactions.map((t) => t.id)
    );
  };

  const isValidDate = (date: string | null | undefined): boolean => {
    if (!date) return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const fieldA = a[sortConfig.field];
    const fieldB = b[sortConfig.field];

    if (fieldA < fieldB) return sortConfig.direction === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* {serach bar} */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground "/>
          <Input className="pl-8"
          placeholder="search Transcations"
          value={SerachTerms}
          onChange={(e)=> SetSerachTerms(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
        <Select value={typeFilter} onValueChange={SetypeFilter}>
  <SelectTrigger>
    <SelectValue placeholder="All types" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="INCOME">Income</SelectItem>
    <SelectItem value="EXPENSE">Expense</SelectItem>
  </SelectContent>
</Select>
<Select value={recurringFilter} onValueChange={SetrecurringFilter} >
  <SelectTrigger className="w-[140px]" >
    <SelectValue placeholder="All Tranacations" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="recurring">Recurring Only</SelectItem>
    <SelectItem value="non-recurring">Non-Recurring</SelectItem>
  </SelectContent>
</Select>
{selectedIds.length>0 &&(
  <div className="flex items-center gap-2">
    <Button variant="destructive" size="sm" onClick={handleDBulkDelete}>
    <Trash className="h-4 m-4 mr-2"/>
    Delete selected ({selectedIds.length})
    </Button>
    </div>
)}
 {( SerachTerms || typeFilter || recurringFilter) && (
  <Button
  variant="outline"
  size="icon"
  onClick={handleClearFilters}
  title="Clear filters"
>
  <X className="h-4 w-5" />
</Button>
 )}

        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={selectedIds.length === transactions.length && transactions.length > 0}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                <div className="flex items-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction.id)}
                      checked={selectedIds.includes(transaction.id)}
                    />
                  </TableCell>
                  <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                  <TableCell>{transaction.description || "N/A"}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-2 py-1 rounded text-white text-sm"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right font-medium"
                    style={{
                      color: transaction.type === "EXPENSE" ? "red" : "green",
                    }}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="secondary"
                              className="gap-1 bg-purple-500 hover:bg-purple-300"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {RECURRING_INTERVALS[transaction.recurringInterval || ""]}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <div className="font-medium">Next Date:</div>
                              <div>
                                {isValidDate(transaction.nextRecurringInterval)
                                  ? format(new Date(transaction.nextRecurringInterval!), "PPP")
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
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(`/transaction/create?edit=${transaction.id}`);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteFn([transaction.id])}
                        >
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
  );
};

export default TransactionsTable;