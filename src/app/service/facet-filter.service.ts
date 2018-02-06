import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface filtersList {
  filterName: string;
  filterCount: number;
  filterActive: boolean;
}


@Injectable()
export class FacetFilterService {
  serviceData: any;
  filterCategories: Array<filtersList> = [];


  constructor(private _http: HttpClient, ) {
    console.log("facet-filter SERVICE");
  }

  get(url: string) {
    console.log("GET URL => " + url);
    return this._http.get(url)
      .pipe(
      map(res => {
        // set the raw json data as service Data to be pulled for filtering
        this.serviceData = res;

        // create all filterable categories with provided data
        console.log("map");
        this.createBrandFilter(res);
        // console.log(this.filterCategories);
        return {
          rawData: res,
          Filters: [
            {
              type: "Brand",
              data: this.filterCategories
            }
          ]
        };
      }),
      catchError(err => {
        console.log("catchError", err);
        return of(err);
      })
      );
  }

  transform(data: any) {
    console.log("TRANSFORM DATA ARRAY");
    // console.log(this.filterCategories);
    data.forEach(function(value, i) {
      // console.log(i, value);
      var filterSplit = value.name.split(' ');
      // console.log(filterSplit[0]);
      // this.filterCategories = data.filter(filter => filter.name === filterSplit[0]);
      // console.log("TRANSFORM =>" + filterSplit[0]);
      // console.log(this.filterCategories);
    })

    return data;
  }

  createBrandFilter(data: any) {
    let self = this;
    // create skeleton of dataSet filter
    // only to create filter list with dummy data
    var dataSet: Array<filtersList> = [];

    // from data split the names and seperate into categories 'Car Brand | Car Type'
    data.forEach(function(value, i) {
      if (value.name) {
        var brandName = value.name.split(" ");
        var name = brandName[0];

        // filter the list => dataSet to find if there are any currently existing filters if so increase it's Count
        var nameFilter = (dataSet.filter(item => item.filterName === self.toTitleCase(name)));
        if (nameFilter.length > 0) {
          nameFilter[0].filterCount++;
        } else {
          dataSet.push({
            filterName: self.toTitleCase(name),
            filterCount: 1,
            filterActive: false,
          });
        }
      }
    });

    // set filterCategories to derived dataSet
    this.filterCategories = dataSet;
  }


  //Capitalizes first letter of string (Global)
  toTitleCase(str: string): string {
    if (str === undefined || str === null) {
      return str;
    }
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

}
