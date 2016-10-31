/*!
 * Leaflet Tile Selector Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, Renderer } from '@angular/core';
import { LeafletMapService } from '../leaflet-map.service';
import { LeafletTileProviderService } from '../leaflet-tile-provider.service';
import { LeafletButtonComponent } from '../leaflet-button/leaflet-button.component';
import { Map } from 'leaflet';
import { keys } from 'lodash';
import 'jquery';

@Component({
  selector: 'app-leaflet-tile-selector',
  templateUrl: './leaflet-tile-selector.component.html',
  styleUrls: ['./leaflet-tile-selector.component.sass']
})
export class LeafletTileSelectorComponent implements OnInit, AfterViewInit {
  public tileKeys: any;
  public tileProviderKey: string;
  private _$mapControl: JQuery;
  private _$mapControlSettings: JQuery;

  @Input() controlTitle: string = 'Map Source';
  @Input() hideTooltipTxt: string = 'Hide';
  @ViewChild('controlwrapper') controlWrapper: ElementRef;
  @ViewChild('tileselector') tileSelector: ElementRef;
  @ViewChild(LeafletButtonComponent) controlSettings: LeafletButtonComponent;

  constructor(
    private _mapService: LeafletMapService,
    private _tileProvider: LeafletTileProviderService,
    private _renderer: Renderer
  ) {
    this.tileProviderKey = 'Google Satellite';
  }

  ngOnInit() {
    // extract the keys and tore to the property
    this.tileKeys = keys(this._tileProvider.baseMaps);

    this._mapService
      .getMap()
      .then((map: Map) => {
        // add default tile
        this._tileProvider.baseMaps[this.tileProviderKey].addTo(map);
      });
  }

  ngAfterViewInit() {
    // set default select value
    this._renderer.setElementProperty(this.tileSelector.nativeElement, 'value', this.tileProviderKey);

    // cache the selection
    this._$mapControl = $( this.controlWrapper.nativeElement );
    this._$mapControlSettings = $( this.controlSettings.controlWrapper.nativeElement );
  }

  onHideControl(event): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof this._$mapControl === 'undefined') {
        reject();
      } else {
        // show the button
        this._$mapControlSettings.fadeIn();

        // hide the map control
        this._$mapControl
          .fadeOut()
          .promise()
          .then(() => {
            // remove class on the control wrapper
            this._$mapControl
              .closest('.control-wrapper')
              .addClass('control-wrapper--tile-selector-hidden')
              ;

            resolve();
          }, () => {
            reject();
          })
          ;
      }
    });
  }

  onShowControl(event): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof this._$mapControl === 'undefined') {
        reject();
      } else {
        // add class the to the control wrapper
        this._$mapControl
          .closest('.control-wrapper')
          .removeClass('control-wrapper--tile-selector-hidden')
          ;

        // hide the button
        this._$mapControlSettings.fadeOut();

        // show the map control
        this._$mapControl
          .fadeIn()
          .promise()
          .then(() => {
            resolve();
          }, () => {
            reject();
          })
          ;
      }
    });
  }

  onTileChange(event) {
    let value = event.target.value;
    let resolvedTile = this._tileProvider.baseMaps[event.target.value];

    this._mapService
      .getMap()
      .then((map: Map) => {
        if (typeof resolvedTile !== 'undefined') {
          // remove the current layer
          map.removeLayer(this._tileProvider.baseMaps[this.tileProviderKey]);

          // add the new layer
          resolvedTile.addTo(map);

          // store the currently used tile
          this.tileProviderKey = value;
        }
      })
      ;
  }

}


