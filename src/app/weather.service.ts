import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WeatherService{

    apiKey='c654ce220e38a4a14f68a843b22103fa';
    weatherCache: { [city: string]: { data: any, timestamp: number } } = {};
    
    constructor(private http: HttpClient){
        const cachedWeather = localStorage.getItem('weatherCache');
        if (cachedWeather) {
            this.weatherCache = JSON.parse(cachedWeather);
        }
    }

    saveCacheToLocalStorage() {
        localStorage.setItem('weatherCache', JSON.stringify(this.weatherCache));
    }
    
    getWeather(city: string): Observable<any> {
        const cachedData = this.weatherCache[city];
        if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
            console.log('-KES-');
          return of(cachedData.data); 
        } else {
            console.log('-API-');
          return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
            .pipe(
              tap(data => {
                this.weatherCache[city] = { data, timestamp: Date.now() };
                this.saveCacheToLocalStorage(); 
              })
            );
        }
      }

    
}