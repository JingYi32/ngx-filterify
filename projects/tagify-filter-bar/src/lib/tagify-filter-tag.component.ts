import {Component, computed, EventEmitter, Input, Output, signal, Signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'lib-tagify-filter-tag',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field class="example-chip-list">
      <mat-label>Selected Filters</mat-label>
      <mat-chip-grid #chipGrid aria-label="Enter filters">
        @for (chip of selectedFilters(); track chip) {
          <mat-chip-row (removed)="removeFilter(chip)" [editable]="true" (edited)="editFilter(chip, $event)"
                        [aria-description]="'press enter to edit ' + chip.label">
            {{ chip.label }}: {{ chip.value }}
            <button matChipRemove [attr.aria-label]="'remove ' + chip.label">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
      </mat-chip-grid>
    </mat-form-field>
  `
})
export class TagifyFilterTagComponent {
  @Input() filters!: Signal<any[]>;
  @Output() filtersChanged = new EventEmitter<any>();

  selectedFilters = computed(() => this.filters().filter(f => f.value));

  removeFilter(filter: any) {
    filter.value = null;
    this.filtersChanged.emit(this.filters());
  }

  editFilter(filter: any, event: any) {
    filter.value = event;
    this.filtersChanged.emit(this.filters());
  }

}
