import { Component, OnInit } from '@angular/core';

import { Sensor } from '../../models/sensor/sensor';
import { SensorService } from '../../services/sensor/sensor.service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements OnInit {
    
  sensors: Sensor[];
  errorMessage: string;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['SensorApi7', 'SensorApi8', 'SensorApi9', 'SensorApi10', 'SensorApi11', 'SensorApi12', 'SensorApi13'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [28.1, 28.2, 28.1, 28.3, 28.1, 28.1, 28.3], label: 'Temperature'},
    {data: [23.5, 23.5, 23.5, 23.4, 23.4, 23.4, 23.4], label: 'Humidity'}
  ];
 
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
    
    constructor(
      private sensorService: SensorService
    ) { }

    ngOnInit() {
      /*this.initializeLabels();
      console.log(this.barChartLabels);
      this.initializeData();
      console.log(this.barChartData);*/

     }

     initializeLabels(): void {
       // This will be called on the API (/listMagnitudes)
       this.barChartLabels.splice(0, this.barChartLabels.length);
       this.barChartLabels.push('Temperature', 'Humidity');
     }

     initializeData(): void {
       this.barChartData.splice(0, this.barChartData.length);
       this.sensorService.getSensors()
    .subscribe(
        sensors => sensors.forEach(element => {
          let aux = {data: [element.temperatureValue, element.humidityValue],
          label: element.name};
          this.barChartData.push(aux);
        }),
        error => this.errorMessage = <any>error
        );
     }

}