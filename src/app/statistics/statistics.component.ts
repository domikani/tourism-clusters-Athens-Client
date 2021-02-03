import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChartDataSets,} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public responseData;
  public yearsStatsData;
  public clusterName;
  public photosTaken;
  public lineData = [];
  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Photos'},
  ];
  public lineLabels = [];
  public lineChartLabels: Label[] = [];
  public chartReady = false;
  lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'yellow',
      backgroundColor: 'red',
      hoverBackgroundColor: 'black'
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'bar';

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent) {
    this.yearsStatsData = this.responseData.features;
    for (let stat = 0; stat < this.yearsStatsData.length; stat++) {
      if ((event.target as HTMLInputElement).id == this.yearsStatsData[stat]._id) {
        this.clusterName = this.yearsStatsData[stat]._id;
        for (let d = 0; d < this.yearsStatsData[stat].data.length; d++) {
          this.lineData.push(this.yearsStatsData[stat].data[d].total);
          this.lineLabels.push(this.yearsStatsData[stat].data[d].year);
          this.lineChartData[0].data = this.lineData;
          this.lineChartLabels = this.lineLabels;
        }
        this.chartReady = true;
        this.lineData = [];
        this.lineLabels = [];

      }

    }

  }


  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getYearStats();
  }

  public getYearStats() {
    this.http.get('http://localhost:3000/posts/stats/years').subscribe(response => {
      this.responseData = response;
    });
  }

}
