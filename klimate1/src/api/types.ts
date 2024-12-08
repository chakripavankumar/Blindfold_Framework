export interface Coordinates{
    lat:string,
    lon:string,
}
export interface WeatherCondion{
    id:number,
     main:string,
     description:string,
     icon : string
}
export interface WeatherData{
        coord: Coordinates
        weather: WeatherCondion,
        main: {
           temp: number,
           feels_like:number,
             temp_min: number,
             temp_max: number,
             pressure: number,
             humidity: number,
        },
        wind: {
           speed: 65,
             deg: number,
        },
        sys: {
           country: string,
           sunrise: number,
            sunset: number
        },
        name: "string",
          dt: number
     }  
export interface GeocodingResponse {
         name:string,
         local_names?:Record <string, string>,
         lat:number,
         lon:number,
         country:string,
         state?:string
      }
 export interface ForecastData {
    list: Array<{
        dt:number;
         main:WeatherData["main"];
         weather:WeatherData["weather"];
         wind:WeatherData["wind"];
         dt_txt:number;
    }>;
    city:{
        name:string;
        country:string;
        sunrise: number;
        sunset: number;
    }
    }