import { Component, signal } from '@angular/core';
import {TagifyFilterBarComponent} from '../../../tagify-filter-bar/src/lib/tagify-filter-bar.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TagifyFilterBarComponent, JsonPipe],
  template: `
    <h1>Filter Test App</h1>
    <lib-tagify-filter-bar [filters]="filters" (filtersChanged)="onFiltersChanged($event)"></lib-tagify-filter-bar>
    <pre>{{ filters() | json }}</pre>
  `,
})
export class AppComponent {
  filters = signal([
    { label: 'Category', type: 'select', options: ['A', 'B'], value: '' },
    { label: 'Search', type: 'text', value: '' }
  ]);

  onFiltersChanged(updatedFilters: any[]) {
    this.filters.set(updatedFilters);
  }
}
