import { Component, OnInit, Input } from '@angular/core';

import { SensorService } from '../services/sensor.service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements OnInit {
  
  @Input() magnitude: string;

  errorMessage: string;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartLabels:string[] = [];
  public barChartData:any[] = [];
 
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
    
    constructor(
      private sensorService: SensorService
    ) { }

    ngOnInit() {
      this.initializeData();
      console.log(this.barChartData);
      console.log(this.barChartLabels);
     }

     initializeData(): void {
       console.log(this.magnitude);
       let dataArray:number[] = [];
       this.sensorService.getAttributeValues(this.magnitude)
      .subscribe(
        (values: {sensorName: string, sensorValue: number}[]) => 
        values.forEach(element => {
          dataArray.push(element.sensorValue);
          this.barChartLabels.push(element.sensorName);
        })
      );
      this.barChartData.push(
        {
          data: dataArray,
          label: this.magnitude
        }
      );
     }

     private removeData(): void {
        this.barChartData.splice(0, this.barChartData.length);
     }

     private removeLabels(): void {
        this.barChartLabels.splice(0, this.barChartLabels.length);
     }

}