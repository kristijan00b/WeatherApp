import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { getWindSpeed, getTemperature, toggleMetrics } from '../functions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  city!: string;
  weatherData: any;
  tempUnit: string = '°C';
  windUnit: string = 'km/h';

  constructor(private weatherService: WeatherService){}

  ngOnInit(){}

  getWeather(){
    this.weatherService.getWeather(this.city).subscribe(data=>{
      this.weatherData=data;
    })
  }

  toggleMetrics() {
    const updatedUnits = toggleMetrics(this.tempUnit, this.windUnit);
    this.tempUnit = updatedUnits.tempUnit;
    this.windUnit = updatedUnits.windUnit;
  }

  getTemperature(data: any, tempUnit: string): string {
    return getTemperature(data, tempUnit);
  }
  
  getWindSpeed(data: any, windUnit:string): string {
    return getWindSpeed(data,windUnit);
  }

}
