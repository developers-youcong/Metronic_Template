import { ConfigModel } from '../interfaces/config';

export interface AclInterface {
	permissions: any;
	currentUserRoles: any;
}

export class AclModel implements AclInterface, ConfigModel {
	public config: any;

	// default permissions
	public permissions: any = {
		ADMIN: ['canDoAnything'],
		USER: ['canDoLimitedThings']
	};

	// store an object of current user roles
	public currentUserRoles: any = {};

	constructor() {}
}
