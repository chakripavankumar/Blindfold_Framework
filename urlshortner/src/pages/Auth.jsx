import { useNavigate, useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/Login"
import SignUp from "@/components/SignUp"
import { UrlState } from "@/context"
import { useEffect } from "react"

const Auth = () => {
  const[searchParams]  =useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);
  return (
    <div className="mt-20 flex flex-col items-center gap-10">
     <h1 className="text-5xl font-extrabold">
  { searchParams.get("createNew")?"Hold Up! Let's login frist" : "Login / SignUp"}
     </h1>
     <Tabs defaultValue="signup" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Login</TabsTrigger>
    <TabsTrigger value="password">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="Login">
    <Login/>
    </TabsContent>
  <TabsContent value="signup">
    <SignUp/>
    </TabsContent>
</Tabs>
    </div>
  )
}

export default Auth
