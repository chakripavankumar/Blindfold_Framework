import { BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import City from "./pages/city"
import Layout from "./components/layout"
import { ThemeProvider } from "./context/themeProvider"


function App() {


  return (
   <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element= {<Dashboard/>}/>
          <Route path="/city"  element={<City/>}/>
        </Routes>
      </Layout>
    </ThemeProvider>
   </BrowserRouter>
  )
}

export default App
