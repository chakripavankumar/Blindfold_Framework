import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { RefreshCcw } from "lucide-react"


const  Dashboard = ()=>{
    const {coordinates,error,isLoading,getLocation} = useGeolocation();
    console.log(coordinates);
    const handleRefersh =() => {
        getLocation()
        if(coordinates){
            //reload weather data
        }
    }
    
    return (
        <div className="space-y-4">
            {/* Favorites class */}
     <div className="flex justify-between items-center">
    <h1 className="text-xl font-bold tracking-tight ">my location </h1>
    <Button variant={"outline"}
    size={"icon"} onClick={handleRefersh}>
        <RefreshCcw className="h-4 w-4" />
    </Button>
     </div>
     {/* currnt and hourly weather */}
        </div>
    )
}
 export default Dashboard