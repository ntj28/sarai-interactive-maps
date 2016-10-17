/*!
 * WMS Layer Service
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Injectable } from '@angular/core';
import { WMSOptions, CRS } from 'leaflet';
import { assign, snakeCase } from 'lodash';

@Injectable()
export class WmsLayerService {
  private _leafletApi: any = L;
  private _workspace: string = 'sarai-20161014';

  public imageFormat: string = 'image/png';
  public transparent: boolean = true;
  public maxZoom: number = 18;
  public crs: CRS = this._leafletApi.CRS.EPSG900913;
  public wmsTileLayerUrl = `http://202.92.144.40:8080/geoserver/${this._workspace}/wms?tiled=true`;

  constructor() {}

  getUrl(): string {
    return this.wmsTileLayerUrl;
  }

  getDefaultOptions(): any {
    return {
      format: this.imageFormat,
      transparent: this.transparent,
      maxZoom: this.maxZoom,
      crs: this.crs,
    };
  }

  getSuitabilityMapCountryLevelLayers(crop: string, options: any = {}): Array<WMSOptions> {
    let layers = [];
    let attribution = `Crop data &copy; 2016
        <a href="http://www.pcaarrd.dost.gov.ph/" target="_blank">PCAARRD</a> and
        <a href="http://uplb.edu.ph/" target="_blank">University of the Philippines Los Banos</a>`;

    switch (crop.toLocaleLowerCase()) {
      case 'banana':
      case 'rice':
      case 'cacao':
      case 'coffee-arabica':
      case 'coffee-robusta':
      case 'corn-dry':
      case 'corn-wet':
      case 'coconut':
        layers = [
          `${this._workspace}:${snakeCase(crop)}_15_layers_gridcode_all`
        ];

        break;

      default:
        throw new Error('Not yet implemented!');
    }

    return layers.map((item) => {
      return assign({}, this.getDefaultOptions(), {
        layers: item,
        maxZoom: 10,
        zIndex: 1000,
        attribution
      }, options);
    });
  }

}

