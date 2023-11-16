import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { forkJoin } from 'rxjs';
import { getTemperature, getWindSpeed, toggleMetrics } from '../functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  city!: string;
  weatherData: any;

  tempUnit: string = '°C';
  windUnit: string = 'km/h';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    const cities = ['Madrid','Moskva', 'Tokyo', 'Cairo', 'Kinshasa', 'Sydney', 'Miami', 'Washington', 'Brasilia'];
    const requests = cities.map(city => this.weatherService.getWeather(city));
    forkJoin(requests).subscribe(
      (results: any[]) => {
        this.weatherData = results;
      },
      error => {
        console.error(error);
      }
    );
  }
  
  toggleMetrics() {
    const updatedUnits = toggleMetrics(this.tempUnit, this.windUnit);
    this.tempUnit = updatedUnits.tempUnit;
    this.windUnit = updatedUnits.windUnit;
  }
 
  getTemperature(data:any, tempUnit:string){
    return getTemperature(data,tempUnit)
  }
  
  getWindSpeed(data: any, windUnit: string): string {
    return getWindSpeed(data, windUnit);
  }
  
}