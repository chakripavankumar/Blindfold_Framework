import { getUserAccounts } from "@/actions/dash"
import CreateAccountDrawer from "@/components/CreateAccountDrawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"


const DashboardPage =  async() => {
  const accounts = await getUserAccounts();

    return (
      <div className="px-5">
        {/* Budget Progress */}
  
        {/* Overview */}
  
  
        {/* Account Grids */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
       <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
        <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
          <Plus className="h-10 w-10 mb-2"/>
          <p className="text-sm font-medium">Add Account</p>
        </CardContent>
       </Card>
        </CreateAccountDrawer>
        {accounts?.length> 0 && 
        accounts?.map((account)=> {
          return account.name
        } )}
        </div>
      </div>
    )
  }
  
  export default DashboardPage
  