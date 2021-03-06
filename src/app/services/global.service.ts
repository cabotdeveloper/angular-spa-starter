import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalService {
	public sidebarActive$: Observable<boolean>;
	public spinnerActive$: Observable<boolean>;

	private sidebarActive: boolean;
	private sidebarActiveSource = new Subject<boolean>();

	private spinnerActive: boolean;
	private spinnerActiveSource = new Subject<boolean>();

	constructor() {
		this.sidebarActive$ = this.sidebarActiveSource.asObservable();
		this.spinnerActive$ = this.spinnerActiveSource.asObservable();
	}

	public toggleSidebar(): void {
		this.sidebarActive = !this.sidebarActive;
		this.sidebarActiveSource.next(this.sidebarActive);
	}

	public toggleSpinner(): void {
		this.spinnerActive = !this.spinnerActive;
		this.spinnerActiveSource.next(this.spinnerActive);

		if (this.spinnerActive) {
			setTimeout(() => {
				this.spinnerActive = false;
				this.spinnerActiveSource.next(this.spinnerActive);
			}, 5000);
		}
	}

	public showSpinner(): void {
		this.spinnerActive = true;
		this.spinnerActiveSource.next(this.spinnerActive);
	}

	public hideSpinner(): void {
		this.spinnerActive = false;
		this.spinnerActiveSource.next(this.spinnerActive);
	}

}
