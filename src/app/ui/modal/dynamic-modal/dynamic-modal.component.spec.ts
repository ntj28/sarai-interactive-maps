/* tslint:disable:no-unused-variable */

/*!
 * Dynamic Modal Component Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFactoryResolver, DebugElement } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { SpawnModalService } from '../spawn-modal.service';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { DynamicModalComponent } from './dynamic-modal.component';
import { PdfPreviewModalComponent } from '../pdf-preview-modal/pdf-preview-modal.component';

describe('Component: DynamicModal', () => {
  let component: DynamicModalComponent;
  let fixture: ComponentFixture<DynamicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertModalComponent,
        BaseModalComponent,
        ChartModalComponent,
        DynamicModalComponent,
        ModalDirective,
        PdfPreviewModalComponent,
        PdfViewerComponent
      ],
      providers: [
        SpawnModalService,
        ComponentFactoryResolver
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});


