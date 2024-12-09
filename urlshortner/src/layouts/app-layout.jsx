// eslint-disable-next-line react/prop-types
const AppLayout = ({children})=>{
    return(
        <div>

     
        <main className="min-h-screen container">
            {children}
            <header> hey</header>
            <body> hey</body>
        </main>
        <footer >
           <div className="p-10 text-center bg-gray-400 mt-10">
            madw with love ny pavan❤️
           </div>
        </footer>
        </div>
    )
}

export default AppLayout