import Header from "@/components/Header"

// eslint-disable-next-line react/prop-types
const AppLayout = ({children})=>{
    return(
        <div>
        <Header/>
     
        <main className="min-h-screen container">
            {children}
        

        </main>
        <footer >
           <div className="p-10 text-center bg-gray-800 mt-10">
            madw with love ny pavan❤️
           </div>
        </footer>
        </div>
    )
}

export default AppLayout