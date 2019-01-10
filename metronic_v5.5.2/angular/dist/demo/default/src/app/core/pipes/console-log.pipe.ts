import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mConsoleLog'
})
export class ConsoleLogPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		return console.log(value);
	}
}
