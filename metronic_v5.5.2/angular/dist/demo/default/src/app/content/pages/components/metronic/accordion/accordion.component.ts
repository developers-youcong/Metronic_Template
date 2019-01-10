import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const defaultAccordions = {
		beforeCodeTitle: 'Default Accordions',
		htmlCode: `
<m-accordion-control class="m-accordion--default" [closeOthers]="true" [hasAnimation]="true">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
    iconClass="fa flaticon-user-ok">
	<ng-template AccordionControlPanelContent>
	  <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing
      </p>
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
    title="Remaining essentially unchanged">
	<ng-template AccordionControlPanelContent>
      <p>
		Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
		took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing
      </p>
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
    iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
	  <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
		of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
		typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
		Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
		it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      </p>
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
		`,
		tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'default-accordions',
  templateUrl: './default-accordions.html'
})
export class DefaultAccordions {
}`,
		viewCode: ``,
		isCodeVisible: false
	};


const borderedAccordions = {
	beforeCodeTitle: 'Bordered Accordions',
	htmlCode: `
<m-accordion-control class="m-accordion--bordered" [closeOthers]="true">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
    iconClass="fa flaticon-user-ok">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
    title="Remaining essentially unchanged">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
	  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
    iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
      popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'bordered-accordions',
  templateUrl: './bordered-accordions.html'
})
export class BorderedAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};

const borderlessSolidBackgroundAccordions = {
	beforeCodeTitle: 'Borderless Solid Background Accordions',
	htmlCode: `
<m-accordion-control class="m-accordion--default m-accordion--solid">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
    iconClass="fa flaticon-user-ok">
    <ng-template AccordionControlPanelContent>
	  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
    title="Remaining essentially unchanged">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
    iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book,
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'borderless-solid-background-accordions',
  templateUrl: './borderless-solid-background-accordions.html'
})
export class BorderlessSolidBackgroundAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};


const borderedSolidBackgroundAccordions = {
	beforeCodeTitle: 'Bordered & Solid Background Accordions',
	htmlCode: `
<m-accordion-control class="m-accordion--bordered m-accordion--solid">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
    iconClass="fa flaticon-user-ok">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
    title="Remaining essentially unchanged">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
    iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\b
@Component({
  selector: 'bordered-solid-background-accordions',
  templateUrl: './bordered-solid-background-accordions.html'
})
export class BorderedSolidBackgroundAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};


const defaultStateAccordionExamples = {
	beforeCodeTitle: 'Default State Accordion Examples',
	htmlCode: `
<m-accordion-control class="m-accordion--default m-accordion--toggle-arrow">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
	iconClass="fa flaticon-user-ok"
    type="danger">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
   </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
	title="Remaining essentially unchanged"
    type="info">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
	iconClass="fa flaticon-alert-2"
    type="brand">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'default-state-accordions',
  templateUrl: './default-state-accordions.html'
})
export class DefaultStateAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};


const borderedStateAccordionExamples = {
	beforeCodeTitle: 'Bordered State Accordion Examples',
	htmlCode: `
<m-accordion-control class="m-accordion m-accordion--bordered">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
	iconClass="fa flaticon-user-ok"
    type="focus">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
	title="Remaining essentially unchanged"
    type="success">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
	iconClass="fa flaticon-alert-2"
    type="primary">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'bordered-state-accordions',
  templateUrl: './bordered-state-accordions.html'
})
export class BorderedStateAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};


const defaultSolidBackgroundAccordions = {
	beforeCodeTitle: 'Default Solid Background Accordions',
	htmlCode: `
<m-accordion-control class="m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
	iconClass="fa flaticon-user-ok">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
	title="Remaining essentially unchanged">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
	iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'default-solid-background-accordions',
  templateUrl: './default-solid-background-accordions.html'
})
export class DefaultSolidBackgroundAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};


const defaultSolidBackgroundSecondAccordions = {
	beforeCodeTitle: 'Default Solid Background Accordions',
	htmlCode: `
<m-accordion-control class="m-accordion--default m-accordion--solid m-accordion--section">
  <m-accordion-control-panel
    title="Lorem Ipsum has been the industry's standard"
	iconClass="fa flaticon-user-ok">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    iconClass="fa flaticon-placeholder"
	title="Remaining essentially unchanged">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
  <m-accordion-control-panel
    title="Galley of type and scrambled"
	iconClass="fa flaticon-alert-2">
    <ng-template AccordionControlPanelContent>
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum has been the industry's standard
	  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing
    </ng-template>
  </m-accordion-control-panel>
</m-accordion-control>
	`,
	tsCode: `
import { Component } from '@angular/core';\n
@Component({
  selector: 'default-solid-background-second-accordions',
  templateUrl: './default-solid-background-second-accordions.html'
})
export class DefaultSolidBackgroundSecondAccordions {
}`,
	viewCode: ``,
	isCodeVisible: false
};

@Component({
	selector: 'm-accordion',
	templateUrl: './accordion.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {

	exampleDefaultAccordions;
	exampleBorderedAccordions;
	exampleBorderlessSolidBackgroundAccordions;
	exampleBorderedSolidBackgroundAccordions;
	exampleDefaultStateAccordionExamples;
	exampleBorderedStateAccordionExamples;
	exampleDefaultSolidBackgroundAccordions;
	exampleDefaultSolidBackgroundSecondAccordions;

	constructor() { }

	ngOnInit() {
		this.exampleDefaultAccordions = defaultAccordions;
		this.exampleBorderedAccordions = borderedAccordions;
		this.exampleBorderlessSolidBackgroundAccordions = borderlessSolidBackgroundAccordions;
		this.exampleBorderedSolidBackgroundAccordions = borderedSolidBackgroundAccordions;
		this.exampleDefaultStateAccordionExamples = defaultStateAccordionExamples;
		this.exampleBorderedStateAccordionExamples = borderedStateAccordionExamples;
		this.exampleDefaultSolidBackgroundAccordions = defaultSolidBackgroundAccordions;
		this.exampleDefaultSolidBackgroundSecondAccordions = defaultSolidBackgroundSecondAccordions;
	}
}
