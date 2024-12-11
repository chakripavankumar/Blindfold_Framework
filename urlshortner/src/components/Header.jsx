import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import UseFetch from "@/hooks/use-Fetch";
import { UrlState } from "@/context";
import { logout } from "@/Db/apiAuth";
import { BarLoader } from "react-spinners";
  

const Header = () => {

  const navigate = useNavigate();

  const {user,fetchUser} = UrlState();
 const {loading, fn:fnLogout}=  UseFetch(logout)
  return (
    <>
   <nav className="py-4 flex justify-between items-center">
    <Link to="/">
    <img src="/logo.png"  className="h-14" alt="logo"/>
    </Link>
    <div>
        {!user ? <Button onClick = {()=> navigate("/auth")}>
            Login
        </Button> :(
            <DropdownMenu>
  <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
  <Avatar>
  <AvatarImage src={user?.user_metadata?.profile_pic}  />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel> {user?.user_metadata?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <LinkIcon className=" mr-2 h-4 w-4"/>
        <span>My Links</span>
        </DropdownMenuItem>
    <DropdownMenuItem 
    onClick={() => {
        fnLogout().then(() => {
            fetchUser();
            navigate("/auth");
                    });
                  }}
        className="text-red-600">
      <LogOut className=" mr-2 h-4 w-4"/>
      <span>   Logout</span>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        )
        }
        
    </div>
   </nav>
   {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
   </>
  )
}

export default Header
