import { IEdit } from './interfaces/edit.interface';
import { IFilter } from './interfaces/filter.interface';
import { ILog } from './interfaces/log.interface';

export class BaseModel implements IEdit, IFilter, ILog {
	// Edit
	_isEditMode: boolean = false;
	_isNew: boolean = false;
	_isUpdated: boolean = false;
	_isDeleted: boolean = false;
	_prevState: any = null;
	// Filter
	_defaultFieldName: string = '';
	// Log
	_userId: number = 0; // Admin
	_createdDate: string;
	_updatedDate: string;
}
