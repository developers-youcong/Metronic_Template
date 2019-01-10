export class AuthFakeDb {
	public static users: any = [
		{
			id: 1,
			username: 'admin',
			password: 'demo',
			email: 'admin@demo.com',
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random(),
			roles: ['ADMIN'],
			pic: './assets/app/media/img/users/user4.jpg',
			fullname: 'Mark Andre'
		},
		{
			id: 2,
			username: 'user',
			password: 'demo',
			email: 'user@gmail.com',
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random(),
			roles: ['USER'],
			pic: './assets/app/media/img/users/user3.jpg',
			fullname: 'Megan'
		}
	];

	public static tokens: any = [
		{
			id: 1,
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random()
		}
	];
}
