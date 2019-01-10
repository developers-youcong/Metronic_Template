import {
	Component,
	OnInit,
	Input,
	Output,
	ViewChild,
	ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'm-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	public model: any = { email: '' };
	@Input() action: string;
	@Output() actionChange = new Subject<string>();
	public loading = false;

	@ViewChild('f') f: NgForm;
	errors: any = [];

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};

	constructor(
		private authService: AuthenticationService,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService
	) {}

	ngOnInit() {}

	loginPage(event: Event) {
		event.preventDefault();
		this.action = 'login';
		this.actionChange.next(this.action);
	}

	submit() {
		this.spinner.active = true;
		if (this.validate(this.f)) {
			this.authService.requestPassword(this.model).subscribe(response => {
				if (typeof response !== 'undefined') {
					this.action = 'login';
					this.actionChange.next(this.action);
				} else {
					// tslint:disable-next-line:max-line-length
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'error');
				}
				this.spinner.active = false;
			});
		}
	}

	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}

		this.errors = [];
		if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}
}
