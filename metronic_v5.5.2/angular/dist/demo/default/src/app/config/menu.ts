// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			header: {
				self: {},
				items: [
					{
						title: 'Actions',
						root: true,
						icon: 'flaticon-add',
						toggle: 'click',
						translate: 'MENU.ACTIONS',
						submenu: {
							type: 'classic',
							alignment: 'left',
							items: [
								{
									title: 'Create New Post',
									page: '/header/actions',
									icon: 'flaticon-file',
									translate: 'MENU.CREATE_POST',
									aside: {
										self: {
											bullet: 'dot'
										},
										items: [
											{
												section: 'Departments'
											},
											{
												title: 'Resources',
												desc: '',
												icon: 'flaticon-layers',
												bullet: 'dot',
												root: true,
												submenu: [
													{
														title: 'Create New Post',
														page: '/header/actions',
													},
													{
														title: 'Timesheet',
														page: '/inner',
													},
													{
														title: 'Payroll',
														page: '/inner',
													},
													{
														title: 'Contacts',
														page: '/inner',
													}
												]
											}
										]
									}
								},
								{
									title: 'Generate Reports',
									page: '/inner',
									icon: 'flaticon-diagram',
									badge: {
										type: 'm-badge--success',
										value: '2'
									},
								},
								{
									title: 'Manage Orders',
									icon: 'flaticon-business',
									submenu: {
										type: 'classic',
										alignment: 'right',
										bullet: 'line',
										items: [
											{
												title: 'Latest Orders',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Pending Orders',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Processed Orders',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Delivery Reports',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Payments',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Customers',
												page: '/inner',
												icon: '',
											}
										]
									}
								},
								{
									title: 'Customer Feedbacks',
									page: '/#',
									icon: 'flaticon-chat-1',
									submenu: {
										type: 'classic',
										alignment: 'right',
										bullet: 'dot',
										items: [
											{
												title: 'Customer Feedbacks',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Supplier Feedbacks',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Reviewed Feedbacks',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Resolved Feedbacks',
												page: '/inner',
												icon: '',
											},
											{
												title: 'Feedback Reports',
												page: '/inner',
												icon: '',
											}
										]
									}
								},
								{
									title: 'Register Member',
									page: '/inner',
									icon: 'flaticon-users',
								}
							]
						}
					},
					{
						title: 'Reports',
						root: true,
						icon: 'flaticon-line-graph',
						toggle: 'click',
						translate: 'MENU.REPORTS',
						submenu: {
							type: 'mega',
							width: '1000px',
							alignment: 'left',
							columns: [
								{
									heading: {
										heading: true,
										title: 'Finance Reports',
									},
									items: [
										{
											title: 'Annual Reports',
											page: '/inner',
											icon: 'flaticon-map',
										},
										{
											title: 'HR Reports',
											page: '/inner',
											icon: 'flaticon-user',
										},
										{
											title: 'IPO Reports',
											page: '/inner',
											icon: 'flaticon-clipboard',
										},
										{
											title: 'Finance Margins',
											page: '/inner',
											icon: 'flaticon-graphic-1',
										},
										{
											title: 'Revenue Reports',
											page: '/inner',
											icon: 'flaticon-graphic-2',
										}
									]
								},
								{
									bullet: 'line',
									heading: {
										heading: true,
										title: 'Project Reports',
									},
									items: [
										{
											title: 'Coca Cola CRM',
											page: '/inner',
											icon: '',
										},
										{
											title:
												'Delta Airlines Booking Site',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Malibu Accounting',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Vineseed Website Rewamp',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Zircon Mobile App',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Mercury CMS',
											page: '/inner',
											icon: '',
										}
									]
								},
								{
									bullet: 'dot',
									heading: {
										heading: true,
										title: 'HR Reports',
									},
									items: [
										{
											title: 'Staff Directory',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Client Directory',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Salary Reports',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Staff Payslips',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Corporate Expenses',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Project Expenses',
											page: '/inner',
											icon: '',
										}
									]
								},
								{
									heading: {
										heading: true,
										title: 'Reporting Apps',
										icon: '',
									},
									items: [
										{
											title: 'Report Adjusments',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Sources & Mediums',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Reporting Settings',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Conversions',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Report Flows',
											page: '/inner',
											icon: '',
										},
										{
											title: 'Audit & Logs',
											page: '/inner',
											icon: '',
										}
									]
								}
							]
						}
					},
					{
						title: 'Apps',
						root: true,
						icon: 'flaticon-paper-plane',
						toggle: 'click',
						translate: 'MENU.APPS',
						badge: {
							type: 'm-badge--brand m-badge--wide',
							value: 'new',
							translate: 'MENU.NEW',
						},
						submenu: {
							type: 'classic',
							alignment: 'left',
							items: [
								{
									title: 'eCommerce',
									page: '/inner',
									icon: 'flaticon-business',
									submenu: {
										type: 'classic',
										alignment: 'right',
										items: [
											{
												title: 'Customers',
												page: '/ecommerce/customers',
												icon: 'flaticon-users',
											},
											{
												title: 'Orders',
												page: '/ecommerce/orders',
												icon: 'flaticon-interface-1',
											},
											{
												title: 'Products',
												page: '/ecommerce/products',
												icon: 'flaticon-list-1',
											}
										]
									}
								},
								{
									title: 'Audience',
									page: '/crud/datatable_v1',
									icon: 'flaticon-computer',
									submenu: {
										type: 'classic',
										alignment: 'right',
										items: [
											{
												title: 'Active Users',
												page: '/inner',
												icon: 'flaticon-users',
											},
											{
												title: 'User Explorer',
												page: '/inner',
												icon: 'flaticon-interface-1',
											},
											{
												title: 'Users Flows',
												page: '/inner',
												icon: 'flaticon-lifebuoy',
											},
											{
												title: 'Market Segments',
												page: '/inner',
												icon: 'flaticon-graphic-1',
											},
											{
												title: 'User Reports',
												page: '/inner',
												icon: 'flaticon-graphic',
											}
										]
									}
								},
								{
									title: 'Marketing',
									page: '/inner',
									icon: 'flaticon-map',
								},
								{
									title: 'Campaigns',
									page: '/inner',
									icon: 'flaticon-graphic-2',
									badge: {
										type: 'm-badge--success',
										value: '3'
									}
								},
								{
									title: 'Cloud Manager',
									page: '/inner',
									icon: 'flaticon-infinity',
									submenu: {
										type: 'classic',
										alignment: 'left',
										items: [
											{
												title: 'File Upload',
												page: '/inner',
												icon: 'flaticon-add',
												badge: {
													type: 'm-badge--danger',
													value: '3'
												}
											},
											{
												title: 'File Attributes',
												page: '/inner',
												icon: 'flaticon-signs-1',
											},
											{
												title: 'Folders',
												page: '/inner',
												icon: 'flaticon-folder',
											},
											{
												title: 'System Settings',
												page: '/inner',
												icon: 'flaticon-cogwheel-2',
											}
										]
									}
								}
							]
						}
					}
				]
			},
			aside: {
				self: {},
				items: [
					{
						title: 'Dashboard',
						desc: 'Some description goes here',
						root: true,
						icon: 'flaticon-line-graph',
						page: '/',
						badge: {type: 'm-badge--danger', value: '2'},
						translate: 'MENU.DASHBOARD'
					},
					{section: 'Components'},
					{
						title: 'Google Material',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-interface-7',
						submenu: [
							{
								title: 'Form Controls',
								bullet: 'dot',
								submenu: [
									{
										title: 'Auto Complete',
										page: '/material/form-controls/autocomplete'
									},
									{
										title: 'Checkbox',
										page: '/material/form-controls/checkbox'
									},
									{
										title: 'Radio Button',
										page: '/material/form-controls/radiobutton'
									},
									{
										title: 'Datepicker',
										page: '/material/form-controls/datepicker'
									},
									{
										title: 'Form Field',
										page: '/material/form-controls/formfield'
									},
									{
										title: 'Input',
										page: '/material/form-controls/input'
									},
									{
										title: 'Select',
										page: '/material/form-controls/select'
									},
									{
										title: 'Slider',
										page: '/material/form-controls/slider'
									},
									{
										title: 'Slider Toggle',
										page:
											'/material/form-controls/slidertoggle'
									}
								]
							},
							{
								title: 'Navigation',
								bullet: 'dot',
								submenu: [
									{
										title: 'Menu',
										page: '/material/navigation/menu'
									},
									{
										title: 'Sidenav',
										page: '/material/navigation/sidenav'
									},
									{
										title: 'Toolbar',
										page: '/material/navigation/toolbar'
									}
								]
							},
							{
								title: 'Layout',
								bullet: 'dot',
								submenu: [
									{
										title: 'Card',
										page: '/material/layout/card'
									},
									{
										title: 'Divider',
										page: '/material/layout/divider'
									},
									{
										title: 'Expansion panel',
										page: '/material/layout/expansion-panel'
									},
									{
										title: 'Grid list',
										page: '/material/layout/grid-list'
									},
									{
										title: 'List',
										page: '/material/layout/list'
									},
									{
										title: 'Tabs',
										page: '/material/layout/tabs'
									},
									{
										title: 'Stepper',
										page: '/material/layout/stepper'
									},
									{
										title: 'Default Forms',
										page: '/material/layout/default-forms'
									},
									{
										title: 'Tree',
										page: '/material/layout/tree'
									}
								]
							},
							{
								title: 'Buttons & Indicators',
								bullet: 'dot',
								submenu: [
									{
										title: 'Button',
										page:
											'/material/buttons-and-indicators/button'
									},
									{
										title: 'Button toggle',
										page:
											'/material/buttons-and-indicators/button-toggle'
									},
									{
										title: 'Chips',
										page:
											'/material/buttons-and-indicators/chips'
									},
									{
										title: 'Icon',
										page:
											'/material/buttons-and-indicators/icon'
									},
									{
										title: 'Progress bar',
										page:
											'/material/buttons-and-indicators/progress-bar'
									},
									{
										title: 'Progress spinner',
										page:
											'/material/buttons-and-indicators/progress-spinner'
									}
								]
							},
							{
								title: 'Popups & Modals',
								bullet: 'dot',
								submenu: [
									{
										title: 'Bottom sheet',
										page:
											'/material/popups-and-modals/bottom-sheet'
									},
									{
										title: 'Dialog',
										page:
											'/material/popups-and-modals/dialog'
									},
									{
										title: 'Snackbar',
										page:
											'/material/popups-and-modals/snackbar'
									},
									{
										title: 'Tooltip',
										page:
											'/material/popups-and-modals/tooltip'
									}
								]
							},
							{
								title: 'Data table',
								bullet: 'dot',
								submenu: [
									{
										title: 'Paginator',
										page: '/material/data-table/paginator'
									},
									{
										title: 'Sort header',
										page: '/material/data-table/sort-header'
									},
									{
										title: 'Table',
										page: '/material/data-table/table'
									}
								]
							}
						]
					},
					{
						title: 'Ng-Bootstrap',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-multimedia-1',
						submenu: [
							{
								title: 'Accordion',
								page: '/ngbootstrap/accordion'
							},
							{
								title: 'Alert',
								page: '/ngbootstrap/alert'
							},
							{
								title: 'Buttons',
								page: '/ngbootstrap/buttons'
							},
							{
								title: 'Carousel',
								page: '/ngbootstrap/carousel'
							},
							{
								title: 'Collapse',
								page: '/ngbootstrap/collapse'
							},
							{
								title: 'Datepicker',
								page: '/ngbootstrap/datepicker'
							},
							{
								title: 'Dropdown',
								page: '/ngbootstrap/dropdown'
							},
							{
								title: 'Modal',
								page: '/ngbootstrap/modal'
							},
							{
								title: 'Pagination',
								page: '/ngbootstrap/pagination'
							},
							{
								title: 'Popover',
								page: '/ngbootstrap/popover'
							},
							{
								title: 'Progressbar',
								page: '/ngbootstrap/progressbar'
							},
							{
								title: 'Rating',
								page: '/ngbootstrap/rating'
							},
							{
								title: 'Tabs',
								page: '/ngbootstrap/tabs'
							},
							{
								title: 'Timepicker',
								page: '/ngbootstrap/timepicker'
							},
							{
								title: 'Tooltips',
								page: '/ngbootstrap/tooltip'
							},
							{
								title: 'Typehead',
								page: '/ngbootstrap/typehead'
							}
						]
					},
					{
						title: 'Metronic',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-interface-8',
						submenu: [
							{
								title: 'Accordion',
								page: '/metronic/accordion'
							},
							{
								title: 'Sticky Form Actions',
								page: '/metronic/sticky-form-actions'
							},
							{
								title: 'Forms',
								page: '/metronic/forms'
							}
						]
					},
					{section: 'Applications'},
					{
						title: 'eCommerce',
						bullet: 'dot',
						icon: 'flaticon-business',
						root: true,
						submenu: [
							{
								title: 'Customers',
								page: '/ecommerce/customers'
							},
							{
								title: 'Orders',
								page: '/ecommerce/orders'
							},
							{
								title: 'Products',
								page: '/ecommerce/products'
							},
							// {
							// 	title: 'Create Product',
							// 	page: '/ecommerce/products/add'
							// }
						]
					},
					{
						title: 'User Management',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-user',
						page: '/user-management'
					},
					{
						title: 'Audit Log',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-interface-5',
						page: '/audit-log'
					},
					{section: 'Pages'},
					{
						title: 'User',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-interface-1',
						submenu: [
							{
								title: 'Profile',
								page: '/profile'
							},
						]
					},
					{
						title: 'Error',
						root: true,
						bullet: 'dot',
						icon: 'flaticon-interface-2',
						submenu: [
							{
								title: 'Error-1',
								page: '/error/1'
							},
							{
								title: 'Error-2',
								page: '/error/2'
							},
							{
								title: 'Error-3',
								page: '/error/3'
							},
							{
								title: 'Error-4',
								page: '/error/4'
							},
							{
								title: 'Error-5',
								page: '/error/5'
							},
							{
								title: 'Error-6',
								page: '/error/6'
							},
						]
					},
					{section: 'Tools'},
					{
						title: 'Layout Builder',
						root: true,
						icon: 'flaticon-settings',
						page: '/builder'
					}
				]
			}
		};
	}
}
