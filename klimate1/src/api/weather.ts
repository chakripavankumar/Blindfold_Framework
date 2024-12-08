import { API_CONFIG } from "./config";
import { Coordinates,ForecastData,GeocodingResponse,WeatherData } from "./types";

class WheatherAPI {
    private async createUrl ( endpoint: string , params: Record <string , string | number>){
        const serachParams =  new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        })
        return`${endpoint}?${serachParams.toString()}`
    }
    private async fetchData<T> (url :string) :Promise <T>{
        const responce = await fetch(url);
        if(!responce.ok){
         throw new Error(`weather api error ${responce.statusText}`)
        }
       return responce.json(); 
    }
    async getCurrentWeather( {lat , lon} : Coordinates) :Promise <WeatherData>{
        const url=   await this.createUrl(`${API_CONFIG.BASE_URL}/weather` , {
            lat:lat.toString(),
            lon:lon.toString(),
            units:"metric"
        });
        return this.fetchData<WeatherData>(url)
    }
    async getForecast({lat,lon} : Coordinates) : Promise <ForecastData>{
        const url = await this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:"metric"
        })
          return this.fetchData<ForecastData>(url)
    }
    async getReverseGeoCode({lat,lon} : Coordinates ) : Promise <GeocodingResponse[]>{
        const url = await this.createUrl(`${API_CONFIG.GEO}/reverse` , {
            lat:lat.toString(),
            lon:lon.toString(),
            limit:"5"
        })
        return this.fetchData<GeocodingResponse[]>(url)
    }
}

export const weatherAPI = new WheatherAPI();