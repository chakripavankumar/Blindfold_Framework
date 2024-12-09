import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
  
const LandingPage= ()=>{

    const [longurl, setLonguel] = useState();
    const navitage = useNavigate();
    const handleShorten= (e)=>{
        e.preventDefault()
        if(longurl)navitage(`/auth?createNew=${longurl}`)
    }
    return (
        <div className="flex flex-col items-start">
        <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
            The only URL Shortner <br/> you will ever need!👇
        </h2>
        <form onSubmit= {handleShorten}
         className="sm:h-40 flex flex-col sm:flex-row w-full md:w-2 gap-2">
            <Input type= "url"  placeholder ="Enter your longgg Url" value={longurl}
            onChange={(e)=> setLonguel(e.target.value)}
            />
            <Button 
            className="h-full" type="submit"  variant="destructive"
            
            >
                Shorten!
            </Button>
        </form>
        <img src="/banner.jpeg" alt="banner" className="w-full my-11 md:px-11"/> 
        <Accordion type="multiple" collapsible className="w-full md:px-11">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>

        </div>
    )
}

 export default LandingPage