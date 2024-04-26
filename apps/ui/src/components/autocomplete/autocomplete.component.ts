import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FilterService, SelectItem, SelectItemGroup } from 'primeng/api';

import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
  AutoCompleteCompleteEvent,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-component-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() options: SelectItemGroup[] = [];
  filteredGroups: SelectItemGroup[] = [];

  @Input() selectedOption?: string | undefined;

  @Output() itemSelection = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterGroupedCity(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    const filteredGroups = [];

    for (const optgroup of this.options) {
      const filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ['label'],
        query,
        'contains'
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions,
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }

  itemSelected(event: AutoCompleteSelectEvent) {
    const item: SelectItem = event.value;
    this.itemSelection.next(item.value);
  }
}
