/*!
 * Leaflet Measure Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Map, Control } from 'leaflet';
import { LeafletMapService } from '../leaflet-map.service';
import 'leaflet-measure/dist/leaflet-measure';

@Component({
  selector: 'app-leaflet-measure',
  templateUrl: './leaflet-measure.component.html',
  styleUrls: ['./leaflet-measure.component.sass']
})
export class LeafletMeasureComponent implements OnInit {
  public control: Control;

  @ViewChild('controlwrapper') controlWrapper: ElementRef;

  constructor(
    private _mapService: LeafletMapService,
    private _renderer: Renderer
  ) {}

  ngOnInit() {
    this.control = new (L as any).Control.Measure({
        primaryLengthUnit: 'kilometers',
        secondaryLengthUnit: 'meters',
        primaryAreaUnit: 'hectares',
        activeColor: '#ffffff',
        completedColor: '#ffffff'
    });

    this._mapService
      .getMap()
      .then((map: Map) => {
        let container = this.control.onAdd(map);

        // append the element container to the controlWrapper
        this._renderer.invokeElementMethod(this.controlWrapper.nativeElement, 'appendChild', [
          container
        ]);
      })
      ;
  }

}


