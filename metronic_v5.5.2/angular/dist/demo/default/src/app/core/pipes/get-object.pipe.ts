import { Pipe, PipeTransform } from '@angular/core';
import * as objectPath from 'object-path';

@Pipe({
	name: 'mGetObject'
})
export class GetObjectPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		return objectPath.get(value, args);
	}
}
