import { Component, Output, EventEmitter } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange() {
    this.searchChanged.emit(this.searchTerm);
  }
}