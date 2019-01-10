import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAsideDirective } from './directives/menu-aside.directive';
import { MenuAsideOffcanvasDirective } from './directives/menu-aside-offcanvas.directive';
import { MenuHorizontalOffcanvasDirective } from './directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from './directives/menu-horizontal.directive';
import { ClipboardDirective } from './directives/clipboard.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuAsideToggleDirective } from './directives/menu-aside-toggle.directive';
import { QuickSidebarOffcanvasDirective } from './directives/quick-sidebar-offcanvas.directive';
import { TabLineDirective } from './directives/tab-line.directive';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { TimeElapsedPipe } from './pipes/time-elapsed.pipe';
import { QuickSearchDirective } from './directives/quick-search.directive';
import { JoinPipe } from './pipes/join.pipe';
import { GetObjectPipe } from './pipes/get-object.pipe';
import { ConsoleLogPipe } from './pipes/console-log.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { PortletDirective } from './directives/portlet.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		MenuAsideDirective,
		MenuAsideOffcanvasDirective,
		MenuHorizontalOffcanvasDirective,
		MenuHorizontalDirective,
		ScrollTopDirective,
		HeaderDirective,
		MenuAsideToggleDirective,
		QuickSidebarOffcanvasDirective,
		QuickSearchDirective,
		ClipboardDirective,
		TabLineDirective,
		PortletDirective,
		// pipes
		FirstLetterPipe,
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		ConsoleLogPipe,
		SafePipe
	],
	exports: [
		// directives
		MenuAsideDirective,
		MenuAsideOffcanvasDirective,
		MenuHorizontalOffcanvasDirective,
		MenuHorizontalDirective,
		ScrollTopDirective,
		HeaderDirective,
		MenuAsideToggleDirective,
		QuickSidebarOffcanvasDirective,
		QuickSearchDirective,
		ClipboardDirective,
		TabLineDirective,
		PortletDirective,
		// pipes
		FirstLetterPipe,
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		ConsoleLogPipe,
		SafePipe
	],
	providers: []
})
export class CoreModule {}
