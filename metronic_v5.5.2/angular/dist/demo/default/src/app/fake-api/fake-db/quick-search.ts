export class QuickSearchDb {
	public static quickSearchHtml: any = [
		`<div class="m-list-search__results">
	<span class="m-list-search__result-message m--hide">
		No record found
	</span>

	<span class="m-list-search__result-category m-list-search__result-category--first">
		Documents
	</span>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-interface-3 m--font-warning"></i>
		</span>
		<span class="m-list-search__result-item-text">Annual finance report</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-share m--font-success"></i>
		</span>
		<span class="m-list-search__result-item-text">Company meeting schedule</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-paper-plane m--font-info"></i>
		</span>
		<span class="m-list-search__result-item-text">Project quotations</span>
	</a>

	<span class="m-list-search__result-category">
		Customers
	</span>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-pic">
			<img class="m--img-rounded" src="assets/app/media/img/users/user1.jpg" title="" />
		</span>
		<span class="m-list-search__result-item-text">Amanda Anderson</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-pic">
			<img class="m--img-rounded" src="assets/app/media/img/users/user2.jpg" title="" />
		</span>
		<span class="m-list-search__result-item-text">Kennedy Lloyd</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-pic">
			<img class="m--img-rounded" src="assets/app/media/img/users/user3.jpg" title="" />
		</span>
		<span class="m-list-search__result-item-text">Megan Weldon</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-pic">
			<img class="m--img-rounded" src="assets/app/media/img/users/user4.jpg" title="" />
		</span>
		<span class="m-list-search__result-item-text">Marc-André ter Stegen</span>
	</a>

	<span class="m-list-search__result-category">
		Files
	</span>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-lifebuoy m--font-warning"></i>
		</span>
		<span class="m-list-search__result-item-text">Revenue report</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-coins m--font-primary"></i>
		</span>
		<span class="m-list-search__result-item-text">Anual finance report</span>
	</a>
	<a href="#" class="m-list-search__result-item">
		<span class="m-list-search__result-item-icon">
			<i class="flaticon-calendar m--font-danger"></i>
		</span>
		<span class="m-list-search__result-item-text">Tax calculations</span>
	</a>
</div>
`
	];
	public static searchResult: any = [
		// documents
		{
			text: 'Annual finance report',
			category: 'documents',
			icon: '<i class="flaticon-interface-3 m--font-warning"></i>'
		},
		{
			text: 'Company meeting schedule',
			category: 'documents',
			icon: '<i class="flaticon-share m--font-success"></i>'
		},
		{
			text: 'Annual finance report',
			category: 'documents',
			icon: '<i class="flaticon-paper-plane m--font-info"></i>'
		},

		// customers
		{
			text: 'Amanda Anderson',
			category: 'customers',
			img:
				'<img class="m--img-rounded" src="./assets/app/media/img/users/user1.jpg" title=""/>'
		},
		{
			text: 'Kennedy Lloyd',
			category: 'customers',
			img:
				'<img class="m--img-rounded" src="./assets/app/media/img/users/user2.jpg" title=""/>'
		},
		{
			text: 'Megan Weldon',
			category: 'customers',
			img:
				'<img class="m--img-rounded" src="./assets/app/media/img/users/user13.jpg" title=""/>'
		},
		{
			text: 'Marc-André ter Stegen',
			category: 'customers',
			img:
				'<img class="m--img-rounded" src="./assets/app/media/img/users/user4.jpg" title=""/>'
		},

		// files
		{
			text: 'Revenue report',
			category: 'files',
			icon: '<i class="flaticon-lifebuoy m--font-warning"></i>'
		},
		{
			text: 'Anual finance report',
			category: 'files',
			icon: '<i class="flaticon-coins m--font-primary"></i>'
		},
		{
			text: 'Tax calculations',
			category: 'files',
			icon: '<i class="flaticon-calendar m--font-danger"></i>'
		}
	];
}
