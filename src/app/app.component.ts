import { Component } from '@angular/core';
import { FacetFilterService } from './service/facet-filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  categoryFilters: any;
  displayItems: any;

  constructor(
    private _facetFilterService: FacetFilterService
  ){
    console.log("CONSTRUCTOR");
    _facetFilterService.get("https://raw.githubusercontent.com/curran/data/gh-pages/datalibExamples/cars.json")
    .subscribe(data => {
      console.log(data);
      this.categoryFilters = data.Filters;
      this.displayItems = data.rawData;
    });
  }

  ngOnInit(){
  }

  filterCheck(event){
    console.log(event);
  }
  
}
