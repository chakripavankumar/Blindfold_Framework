import { PropsWithChildren } from "react"
import Header from "./Header"

 
 const layout = ({children} : PropsWithChildren) => {
   return (
     <div className="bg-gradient-to-br from-background to-muted">
       <Header/>
       <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
       </main>
       <footer className="border-t h-10 backdrop:blur py-10 supports-[backdrop-filter]:bg-background/60 text-white">
        <div className="container mx-auto px-4  supports-[backdrop-filter]:bg-background/60 text-center">
        Made with love from india
        </div>
       </footer>
     </div>
   )
 }
 
 export default layout
 