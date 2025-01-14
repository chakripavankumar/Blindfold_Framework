"use client";
import { updateDefaultAccount } from "@/actions/account";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-Fetch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;
  const {
    data: updatedAccount,
    error,
    fn: UpdateDefaultFn,
    loading: UpdateDefaultLoading,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async () => {
    if (isDefault) {
      toast.error("You need at least one default account.");
      return;
    }
    await UpdateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account has been updated successfully.");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account.");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-lg transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold capitalize">{name}</CardTitle>
          <Switch checked={isDefault} onChange={handleDefaultChange} disabled={UpdateDefaultLoading} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${parseFloat(balance).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};
export default AccountCard;