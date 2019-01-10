export interface ILog {
	_userId: number; // user who did changes
	_createdDate: string; // date when entity were created => format: 'mm/dd/yyyy'
	_updatedDate: string; // date when changed were applied => format: 'mm/dd/yyyy'
}
