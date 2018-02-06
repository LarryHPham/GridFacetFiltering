import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FacetFilterService } from './service/facet-filter.service';
import { AppComponent } from './app.component';
import { CategoryFiltersComponent } from './component/category-filters/category-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryFiltersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FacetFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
