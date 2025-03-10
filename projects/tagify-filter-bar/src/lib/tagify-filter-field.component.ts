import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'lib-tagify-filter-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div class="filter-inputs">
      @for (field of filters(); track field) {
        <mat-form-field appearance="outline">
          <mat-label>{{ field.label }}</mat-label>
          @if (field.type === 'text') {
            <input matInput [(ngModel)]="field.value" (ngModelChange)="updateFilters()">
          }
          @if (field.type === 'select') {
            <mat-select [(ngModel)]="field.value" (ngModelChange)="updateFilters()">
              @for (option of (Array.isArray(field.options) ? field.options : []); track option) {
                <mat-option [value]="option">{{ option }}</mat-option>
              }
            </mat-select>
          }
          @if (field.type === 'date') {
            <input matInput type="date" [(ngModel)]="field.value" (ngModelChange)="updateFilters()">
          }
        </mat-form-field>
      }
    </div>
  `,
  styles: [`.filter-inputs { display: flex; gap: 10px; }`]
})
export class TagifyFilterFieldComponent {
  @Input() filters!: Signal<any[]>;
  @Output() filtersChanged = new EventEmitter<any>();

  updateFilters() {
    this.filtersChanged.emit(this.filters());
  }

  protected readonly Array = Array;
}
