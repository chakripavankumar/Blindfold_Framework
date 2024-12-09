import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/landing-page"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import RedirectLink from "./pages/RedirectLink"
import { ThemeProvider } from "./theme/theme-provider"



function App() {
 return (
   <BrowserRouter>
   <ThemeProvider defaultTheme="dark">
   <AppLayout>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/link/:id" element={<Link/>}/>
      <Route path="/:id" element={<RedirectLink/>}/>

    </Routes>
   </AppLayout>
   </ThemeProvider>
   
   </BrowserRouter>

  )
}

export default App
