import { QuickSearchDb } from './fake-db/quick-search';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AuthFakeDb } from './fake-db/auth';
import { MessengerDb } from './fake-db/messenger';
import { LogsDb } from './fake-db/logs';
import { CarsDb } from './fake-db/cars';
// import { ECommerceDataContext } from './fake-db/e-commerce-db/_e-commerce.data-context';

@Injectable()
export class FakeApiService implements InMemoryDbService {
	constructor() {}

	createDb(): {} | Observable<{}> {
		return {
			// login and account
			login: AuthFakeDb.users,
			refresh: AuthFakeDb.tokens,
			register: AuthFakeDb.users,
			// messenger
			messenger: MessengerDb.messages,

			// logs
			logs: LogsDb.logs,
			quick_search: QuickSearchDb.quickSearchHtml,
			// data-table
			cars: CarsDb.cars
		};
	}
}
