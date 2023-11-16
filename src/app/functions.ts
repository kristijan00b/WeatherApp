export function  getTemperature(data: any, tempUnit:String): string {
    if (tempUnit === '°F') {
      const fera= data * 9 /5 - 459.67;
      return fera.toFixed(1);
    } else {
      const celsius = ((data * 9 /5 - 459.67) - 32) * 5 / 9;
      return celsius.toFixed(1);
    }
  }

  export function getWindSpeed(data: any, windUnit: string): string {
    if (windUnit === 'mph') {
      const milles = (data.wind.speed * 3.6) *0.621;
      return milles.toFixed(2);;
    } else {
      const kmph = data.wind.speed * 3.6 ;
      return kmph.toFixed(2);
    }
  }

export function toggleMetrics(tempUnit: string, windUnit: string): { tempUnit: string, windUnit: string } {
  if (tempUnit === '°F') {
    return { tempUnit: '°C', windUnit: 'km/h' };
  } else {
    return { tempUnit: '°F', windUnit: 'mph' };
  }
}
