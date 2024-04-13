import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  startWith,
} from 'rxjs';

type AutocompleteOption = {
  name: string;
  options: string[];
};

export type AutocompleteInput = AutocompleteOption[];

export type AutocompleteOutput = {
  group: string;
  option: string;
};

@Component({
  selector: 'app-component-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() value = '';
  @Input() options: AutocompleteInput = [];
  @Output() optionSelected = new EventEmitter<AutocompleteOutput>();

  optionsToShow$: Observable<AutocompleteInput> = from([]);
  selectedOption = '';
  searchTerm$ = new Subject<string>();

  ngOnInit(): void {
    this.selectedOption = this.value;
    this.optionsToShow$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        return this.filterOptions(term);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectOption(selectedGroup: string, selectedOption: string) {
    this.selectedOption = selectedOption;
    this.optionSelected.next({ group: selectedGroup, option: selectedOption });
  }

  onSearch(value: string) {
    this.searchTerm$.next(value);
  }

  filterOptions(searchTerm: string): AutocompleteInput {
    if (searchTerm === '') {
      return this.options;
    }
    return this.options
      .map((group) => {
        if (group.name.toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
          return group;
        }
        const options = group.options.filter((option) => {
          if (option.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
          return false;
        });
        return {
          ...group,
          options,
        };
      })
      .filter((group) => group.options.length > 0);
  }
}
