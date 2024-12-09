import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/Login"

const Auth = () => {
  const[searchParams]  =useSearchParams()
  return (
    <div className="mt-36 flex flex-col items-center gap-10">
     <h1 className="text-5xl font-extrabold">
  { searchParams.get("createNew")?"Hold Up! Let's login frist" : "Login / SignUp"}
     </h1>
     <Tabs defaultValue="Login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Login</TabsTrigger>
    <TabsTrigger value="password">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="Login"><Login/></TabsContent>
  <TabsContent value="Signup">Signup  Component.</TabsContent>
</Tabs>

    </div>
  )
}

export default Auth
