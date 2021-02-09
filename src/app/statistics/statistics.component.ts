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
  public statsData;
  public countData;
  public clusterName;
  public photosTaken;

  //Variables about year chart statistics
  public yearData = [];
  public yearChartData: ChartDataSets[] = [
    {data: [], label: 'Geotagged photos'},
  ];
  public yearLabels = [];
  public yearChartLabels: Label[] = [];
  public chartReady = false;
  yearChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Temporal visitors concentration from 2009 to 2019',
      fontFamily: 'Lato',
      fontSize: '14',
      fontColor: '#333333'
    }
  };

  public yearChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: [
        '#8dd3c7',
        '#ffffb3',
        '#bebada',
        '#fb8072',
        '#80b1d3',
        '#fdb462',
        '#b3de69',
        '#fccde5',
        '#d9d9d9',
        '#bc80bd',
        '#ccebc5'

      ],
      hoverBackgroundColor: 'lightgray'
    },
  ];

  yearChartLegend = true;
  yearChartPlugins = [];
  yearChartType = 'bar';

  //Variables about month chart statistics
  public monthData = [];
  public monthChartData: ChartDataSets[] = [
    {data: [], label: 'Geotagged Photos'},
  ];
  public monthChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Overall monthly visitors concentration (2009-2019)',
      fontFamily: 'Lato',
      fontSize: '14',
      fontColor: '#333333'
    }
  };

  public monthChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: [
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#33a02c',
        '#fb9a99',
        '#e31a1c',
        '#fdbf6f',
        '#ff7f00',
        '#cab2d6',
        '#6a3d9a',
        '#ffff99',
        '#b15928'

      ],
      hoverBackgroundColor: 'lightgray'
    },
  ];

  monthChartLegend = true;
  monthChartPlugins = [];
  monthChartType = 'horizontalBar';

  //Variables about countries chart statistics
  public countryData = [];
  public countryChartData: ChartDataSets[] = [
    {data: [], label: 'Visitors'},
  ];
  public countryLabels = [];
  public countryChartLabels: Label[] = [];
  countryChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Visitors by country (excluded Greece and unknown country name)',
      fontFamily: 'Lato',
      fontSize: '14',
      fontColor: '#333333'
    }
  };

  public countryChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: '#ff7f00',
      hoverBackgroundColor: 'lightgray'
    },
  ];

  countryChartLegend = true;
  countryChartPlugins = [];
  countryChartType = 'bar';


  @HostListener('document:click', ['$event'])
  click(event: MouseEvent) {
    this.statsData = this.responseData.features;
    this.countData = this.statsData[0].TotalCount;
    for (let c = 0; c < this.countData.length; c++) {
      if ((event.target as HTMLInputElement).id == this.countData[c]._id) {
        this.photosTaken = this.countData[c].data[0];
        this.clusterName = this.countData[c].aoi[0];
        for (let d = 0; d < this.statsData[0].Yearly[c].data.length; d++) {
          this.yearData.push(this.statsData[0].Yearly[c].data[d].total);
          this.yearLabels.push(this.statsData[0].Yearly[c].data[d].year);
          this.yearChartData[0].data = this.yearData;
          this.yearChartLabels = this.yearLabels;
        }
        for (let m = 0; m < this.statsData[0].Monthly[c].data.length; m++) {
          this.monthData.push(this.statsData[0].Monthly[c].data[m].total);
          this.monthChartData[0].data = this.monthData;
        }
        for (let country = 0; country < this.statsData[0].Countries[c].data.length; country++) {
          if (this.statsData[0].Countries[c].data[country].country !== 'Greece' && this.statsData[0].Countries[c].data[country].country !== 'unknown country name') {
            this.countryData.push(this.statsData[0].Countries[c].data[country].total);
            this.countryLabels.push(this.statsData[0].Countries[c].data[country].country);
            this.countryChartData[0].data = this.countryData;
            this.countryChartLabels = this.countryLabels;
          }

        }
        this.chartReady = true;
        this.yearData = [];
        this.yearLabels = [];
        this.monthData = [];
        this.countryData = [];
        this.countryLabels = [];

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
