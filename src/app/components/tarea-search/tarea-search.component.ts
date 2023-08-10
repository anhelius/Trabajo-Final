import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import { Tarea } from '../../models/tarea';
 import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea-search',
  templateUrl: './tarea-search.component.html',
  styleUrls: ['./tarea-search.component.css']
})
export class TareaSearchComponent implements OnInit {

  tareas$!: Observable<Tarea[]>;
  private searchTerms = new Subject<string>();

  constructor(private tareaService: TareaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tareas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.tareaService.searchTareas(term)),
    );
  }

}
