import { useTheme } from "@/context/themeProvider"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"


const Header = () => {
   const { theme, setTheme} = useTheme();
   const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50  w-full border-b bg-background/85 backdrop:blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-20 flex  justify-between items-center">
        <Link to={"/"} >
      <img src={isDark ? "/logo.png" :"/logo2.png" } alt="logo " className="h-14"/>
        </Link>
        <div>
          {/* // need to do search bar */}
        <div 
        className={`flex items-center cursor-pointer duration-500 transition-transform ${isDark ? "rotate-180" : "rotate-0"}`}
        onClick={()=> setTheme( isDark ? "light" : "dark")}>
          { isDark ? <Sun className="h-5 w-5 text-yellow-500 rotate-0 transition-all"/> : <Moon className="h-5 w-5 text-blue-600 rotate-0 transition-all"/>}
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header
