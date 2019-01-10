import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'm-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
	// Doughnut
	public doughnutChartLabels: string[] = ['Download', 'In-Store', 'Mail-Order'];
	public doughnutChartData: number[] = [350, 450, 100];
	public doughnutChartType: string = 'doughnut';

	constructor () { }

	ngOnInit () {
	}

	// events
	chartClicked (e: any): void {
		console.log(e);
	}

	chartHovered (e: any): void {
		console.log(e);
	}

}
