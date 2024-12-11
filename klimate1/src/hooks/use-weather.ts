import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS= ({
    weather  : (coords : Coordinates) =>["weather" , coords] as const,
    forecast : (coords : Coordinates) =>  ["forecast", coords] as const,
    location : ( coords : Coordinates)=> ["location" , coords] as const
} as const )
 export function UseWeatherQuery (coordinates : Coordinates | null){
     return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates ?? {lat :0 ,lon: 0}),
        queryFn: ()=>
            coordinates ? weatherAPI.getCurrentWeather(coordinates) :null,
        enabled:!! coordinates
    })

 }
  export function UseForecastQuery ( coordinates :Coordinates |null){
    return useQuery ({
        queryKey:WEATHER_KEYS.forecast(coordinates ?? {lat : 0 , lon:0}),
        queryFn: () => 
            coordinates? weatherAPI.getForecast(coordinates) :null,
        enabled : !!coordinates
    })

  }
  export function UseReverseQuery ( coordinates :Coordinates |  null){
    return useQuery ({
        queryKey:WEATHER_KEYS.location(coordinates ?? {lat : 0 , lon:0}),
        queryFn: () => 
            coordinates? weatherAPI.getReverseGeoCode(coordinates) :null,
        enabled : !!coordinates
    })

  }