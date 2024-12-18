import LoadingSkelton from "@/components/loading-skelton";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UseForecastQuery, UseReverseQuery, UseWeatherQuery } from "@/hooks/use-weather";


const  Dashboard = ()=>{
    const {coordinates,
        error:LocationError,
        isLoading:LocationLoading,
        getLocation} = useGeolocation();
 
        const locationQuery = UseReverseQuery(coordinates);
        const weatherQuery = UseWeatherQuery(coordinates);
        const forecastQuery = UseForecastQuery(coordinates)
        
    const handleRefersh =() => {
        getLocation()
        if(coordinates){
           locationQuery.refetch()
           weatherQuery.refetch()
           forecastQuery.refetch()
        }
    };
    if( LocationLoading){
        return <LoadingSkelton/>
    }
    if(LocationError){
  return  (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4"/>
  <AlertTitle>Location Error</AlertTitle>
  <AlertDescription>
    <p>{LocationError}</p>
    <Button onClick={getLocation} variant={"outline"}  className="w-fit">
        <MapPin className=" h-4 w-4 mr-2"/>
        Enable location
    </Button>
  </AlertDescription>
</Alert>
  )
    }
    if(!coordinates){
        return  (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4"/>
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription>
              <p>please enable location access to see your local weather.</p>
              <Button onClick={getLocation} variant={"outline"}  className="w-fit">
                  <MapPin className=" h-4 w-4 mr-2"/>
                  Enable location
              </Button>
            </AlertDescription>
          </Alert>
            )
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