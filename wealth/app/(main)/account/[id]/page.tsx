/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAccountWithTranscations } from "@/actions/account";
import NotFound from "@/app/not-found";
import { Suspense } from "react";
import TranscationsTable from "../_components/TranscationsTable";
import { BarLoader } from "react-spinners";

// Transaction Type
interface Transaction {
  id: string;
  amount: number; // Serialized to number
  date: string; // Assuming ISO date string format
}

// AccountData Type
interface AccountData {
  id: string;
  name: string;
  type: string;
  balance: number; // Serialized to a number
  isDefault: boolean;
  _count: {
    transactions: number; // Count of transactions
  };
  transactions: Transaction[]; // List of transactions
}

// PageProps Type
interface PageProps {
  params: {
    id: string;
  };
}

// Page Component
const Page = async ({ params }: PageProps) => {
  // Fetch account data
  const accountData: AccountData | null = await getAccountWithTranscations(params.id);

  if (!accountData) {
    return <NotFound />;
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8  px-5 ">
     <div className="flex gap-4  items-end justify-between">
      {/* Account Info Section */}
      <div>
        <h1 className="text-5x sm:text-6xl font-bold gradient-title tracking-tight">{account.name}</h1>
        <p className="text-muted-foreground">{account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase()} Account</p>
      </div>

      {/* Account Balance and Transaction Count */}
      <div className="text-right pb-2">
        <div className="text-xl sm:text-2xl font-bold">${account.balance.toFixed(2)}</div>
        <p className="text-sm text-muted-foreground">{account._count.transactions} Transactions</p>
      </div>
      </div>
      <Suspense
      fallback={<BarLoader className="mt-4" width={"100%"} color="#9393ea"/>}
      >
        <TranscationsTable transactions={transactions} />
      </Suspense>
      </div>
  
  );};

export default Page;