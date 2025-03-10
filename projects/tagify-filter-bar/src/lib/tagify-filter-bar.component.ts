import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {TagifyFilterFieldComponent} from './tagify-filter-field.component';
import {TagifyFilterTagComponent} from './tagify-filter-tag.component';

@Component({
  selector: 'lib-tagify-filter-bar',
  standalone: true,
  imports: [
    TagifyFilterFieldComponent,
    TagifyFilterTagComponent
  ],
  template: `
    <div class="filter-container">
      <lib-tagify-filter-field [filters]="filters" (filtersChanged)="updateFilters($event)"></lib-tagify-filter-field>
      <lib-tagify-filter-tag [filters]="filters" (filtersChanged)="updateFilters($event)"></lib-tagify-filter-tag>
    </div>
  `,
  styles: [`.filter-container { display: flex; flex-direction: column; gap: 10px; }`]
})
export class TagifyFilterBarComponent {
  filters = signal<any[]>([]);
  @Output() filtersChanged = new EventEmitter<any>();

  updateFilters(updatedFilters: any) {
    this.filters.set([...updatedFilters]);
    this.filtersChanged.emit(this.filters());
  }
}
