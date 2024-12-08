import { BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import City from "./pages/city"
import Layout from "./components/layout"
import { ThemeProvider } from "./context/themeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

 const queryClient  = new QueryClient();
function App() {


  return (
   <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />

      <Layout>
        <Routes>
          <Route path="/" element= {<Dashboard/>}/>
          <Route path="/city"  element={<City/>}/>
        </Routes>
      </Layout>
      </QueryClientProvider>
    </ThemeProvider>
   </BrowserRouter>
  )
}

export default App