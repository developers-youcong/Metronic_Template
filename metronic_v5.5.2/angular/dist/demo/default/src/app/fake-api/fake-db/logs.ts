export class LogsDb {
	public static logs: any = [
		// system logs
		{
			id: 1,
			text: '12 new users registered',
			tags: ['important'],
			datetime: new Date(
				new Date().setSeconds(new Date().getSeconds() - 40)
			).toLocaleString(),
			types: ['system', 'alert']
		},
		{
			id: 2,
			text: 'System shutdown',
			tags: [],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 11)
			).toLocaleString(),
			types: ['system', 'alert']
		},
		{
			id: 3,
			text: 'New invoice received',
			tags: [],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 20)
			).toLocaleString(),
			types: ['system', 'alert']
		},
		{
			id: 4,
			text: 'Database overloaded 89%',
			tags: ['resolved'],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 1)
			).toLocaleString(),
			types: ['system', 'alert']
		},
		{
			id: 5,
			text: 'System error',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 2)
			).toLocaleString(),
			types: ['system', 'alert'],
			read: true
		},
		{
			id: 6,
			text: 'Production server down',
			tags: ['pending'],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 3)
			).toLocaleString(),
			types: ['system', 'alert'],
			read: true
		},
		{
			id: 7,
			text: 'Production server up',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 5)
			).toLocaleString(),
			types: ['system', 'alert']
		},

		// application logs
		{
			id: 8,
			text: 'New order received',
			tags: ['urgent'],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 2)
			).toLocaleString(),
			types: ['application', 'event']
		},
		{
			id: 9,
			text: '12 new users registered',
			tags: [],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 6)
			).toLocaleString(),
			types: ['application', 'event']
		},
		{
			id: 10,
			text: 'System shurdown',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 2)
			).toLocaleString(),
			types: ['application', 'event']
		},
		{
			id: 11,
			text: 'New invoice received',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 8)
			).toLocaleString(),
			types: ['application', 'event']
		},
		{
			id: 12,
			text: 'Datatable overloaded 89%',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 10)
			).toLocaleString(),
			types: ['application', 'event']
		},
		{
			id: 13,
			text: 'System error',
			tags: ['pending'],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 24)
			).toLocaleString(),
			types: ['application', 'event'],
			read: true
		},
		{
			id: 14,
			text: 'Production server down',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 48)
			).toLocaleString(),
			types: ['application', 'event'],
			read: true
		},

		// server logs
		{
			id: 15,
			text: 'Production server up',
			tags: [],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 3)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 16,
			text: 'Production server up',
			tags: [],
			datetime: new Date(
				new Date().setMinutes(new Date().getMinutes() - 7)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 17,
			text: 'Production server up',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 4)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 18,
			text: 'New invoice received',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 14)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 19,
			text: 'Database overloaded 89%',
			tags: ['resolved'],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 16)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 20,
			text: 'System error',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 23)
			).toLocaleString(),
			types: ['server', 'log']
		},
		{
			id: 21,
			text: 'Production server down',
			tags: ['pending'],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 48)
			).toLocaleString(),
			types: ['server', 'log'],
			read: true
		},
		{
			id: 22,
			text: 'Production server up',
			tags: [],
			datetime: new Date(
				new Date().setHours(new Date().getHours() - 72)
			).toLocaleString(),
			types: ['server', 'log']
		}
	];
}
