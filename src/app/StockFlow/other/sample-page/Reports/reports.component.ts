import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';


import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexGrid,
  ApexStroke, ApexTheme,
  ApexXAxis, ApexYAxis, ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';

interface Reports {
  product: string;
  productId: number;
  category: string;
  quantity: number;
  turnOver: number;
  Increase: number;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  theme: ApexTheme;
};

@Component({
  selector: 'app-Reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzPaginationModule,
    NgApexchartsModule,
    CardComponent,
    NzIconDirective
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {


  Overview1 = [
    {
      title: 'Total Profit',
      amount: '21,190',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'fall',
      percentage: '59.3%',
      color: 'text-primary'
    },
    {
      title: 'Revenue',
      amount: '18,300',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '70.5%',
      color: 'text-primary'
    },
    {
      title: 'Sales',
      amount: '17,432',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning'
    }
  ];

  Overview2 = [
    {
      title: 'Net purchase value',
      amount: '1,17,432',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'fall',
      percentage: '59.3%',
      color: 'text-primary'
    },
    {
      title: 'Net sales value',
      amount: '80,432',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '70.5%',
      color: 'text-primary'
    },
    {
      title: 'MoM Profit',
      amount: '30,432',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning'
    },
    {
      title: 'YoY Profit',
      amount: '1,10,432',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning'
    }
  ];

  //chart

  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    document.querySelector('.chart-income.week')?.classList.add('active');
    this.chartOptions = {
      chart: {
        height:350,
        type: 'area',
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#1677ff', '#DBA362'],
      series: [
        {
          name: 'Revenues',
          data: [0, 86, 28, 115, 48, 100, 136]
        },
        {
          name: 'Profit',
          data: [0, 43, 14, 56, 24, 105, 68]
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c',
              '#8c8c8c'
            ]
          }
        },
        axisBorder: {
          show: true,
          color: '#f0f0f0'
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#8c8c8c']
          }
        }
      },
      grid: {
        strokeDashArray: 0,
        borderColor: '#f5f5f5'
      },
      theme: {
        mode: 'light'
      }
    };
  }

  // public method
  toggleActive(value: string) {
    this.chartOptions.series = [
      {
        name: 'Page Views',
        data: value === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Sessions',
        data: value === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
      }
    ];
    const xaxis = { ...this.chartOptions.xaxis };
    xaxis.categories =
      value === 'month'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    xaxis.tickAmount = value === 'month' ? 11 : 7;
    this.chartOptions = { ...this.chartOptions, xaxis };
    if (value === 'month') {
      document.querySelector('.chart-income.month')?.classList.add('active');
      document.querySelector('.chart-income.week')?.classList.remove('active');
    } else {
      document.querySelector('.chart-income.week')?.classList.add('active');
      document.querySelector('.chart-income.month')?.classList.remove('active');
    }
  }

  //mini table

  dataSet1: Reports[] = [
    { product: 'Tomato', productId: 23567, category: 'Vegetable', quantity: 225, turnOver: 17000, Increase: 2.3 },
    { product: 'Onion', productId: 25831, category: 'Vegetable', quantity: 200, turnOver: 12000, Increase: 1.3 },
    { product: 'Maggi', productId: 56841, category: 'Instant Food', quantity: 200, turnOver: 10000, Increase: 1.3 },
  ];

  //table

  dataSet: Reports[] = [
    { product: 'Tomato', productId: 23567, category: 'Vegetable', quantity: 225, turnOver: 17000, Increase: 2.3 },
    { product: 'Onion', productId: 25831, category: 'Vegetable', quantity: 200, turnOver: 12000, Increase: 1.3 },
    { product: 'Maggi', productId: 56841, category: 'Instant Food', quantity: 200, turnOver: 10000, Increase: 1.3 },
    { product: 'Surf Execl', productId: 23567, category: 'Household', quantity: 125, turnOver: 9000, Increase: 1 },
    { product: 'Tomato', productId: 23567, category: 'Vegetable', quantity: 225, turnOver: 17000, Increase: 2.3 },
    { product: 'Onion', productId: 25831, category: 'Vegetable', quantity: 200, turnOver: 12000, Increase: 1.3 },
    { product: 'Maggi', productId: 56841, category: 'Instant Food', quantity: 200, turnOver: 10000, Increase: 1.3 },
    { product: 'Surf Execl', productId: 23567, category: 'Household', quantity: 125, turnOver: 9000, Increase: 1 },
  ];

  isFormVisible: boolean = false;

  newProduct: any = {
    productName: '',
    productId: '',
    category: '',
    buyingPrice: 0,
    quantity: 0,
    unit: '',
    expiryDate: '',
    thresholdValue: 0
  };

  categories: string[] = ['Beverages', 'Snacks', 'Cleaning', 'Personal Care', 'Others'];
  constructor(private cdr: ChangeDetectorRef) {}

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    this.cdr.detectChanges();
  }

  resetForm(): void {
    this.newProduct = {
      productName: '',
      productId: '',
      category: '',
      buyingPrice: 0,
      quantity: 0,
      unit: '',
      expiryDate: '',
      thresholdValue: 0
    };
    this.isFormVisible = false;
  }

  private generateOrderId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
