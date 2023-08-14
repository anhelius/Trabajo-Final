import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareasUrl = 'http://localhost:3000/tareas';  // URL de la Tarea
  private tareasDetailUrl = 'http://localhost:3000/tareas-detalle';  // URL del detalle
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    

 /** GET tareas from the server */
 getTareas(): Observable<Tarea[]> {
  return this.http.get<Tarea[]>(this.tareasUrl)
    .pipe(
      tap(_ => this.log('fetched tareas')),
      catchError(this.handleError<Tarea[]>('getTareas', []))
    );
}

 /** GET Tarea by id. Return `undefined` when id not found */
 getTareaNo404<Data>(id: number): Observable<Tarea> {
  const url = `${this.tareasDetailUrl}/?id=${id}`;
  return this.http.get<Tarea[]>(url)
    .pipe(
      map(tareas => tareas[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} tarea id=${id}`);
      }),
      catchError(this.handleError<Tarea>(`getTarea id=${id}`))
    );
}
  /** GET tarea by id. Will 404 if id not found */
getTarea(id: number): Observable<Tarea> {
  const url = `${this.tareasDetailUrl}/${id}`;
  return this.http.get<Tarea>(url).pipe(
    tap(_ => this.log(`fetched tarea id=${id}`)),
    catchError(this.handleError<Tarea>(`getTarea id=${id}`))
  );
}

/* GET tareas whose titulo contains search term */
searchTareas(term: string): Observable<Tarea[]> {
  if (!term.trim()) {
    // if not search term, return empty tarea array.
    return of([]);
  }
  return this.http.get<Tarea[]>(`${this.tareasUrl}/?titulo=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found tareas matching "${term}"`) :
       this.log(`no tareas matching "${term}"`)),
    catchError(this.handleError<Tarea[]>('searchTareas', []))
  );
}



/** POST: add a new tarea to the server */
addTarea(tarea: Tarea): Observable<Tarea> {
 
  return this.http.post<Tarea>(this.tareasUrl, tarea, this.httpOptions).pipe(
    tap((newTarea: Tarea) => this.log(`added tarea w/ id=${newTarea.id}`)),
    catchError(this.handleError<Tarea>('addTarea'))
  );
}

/** PUT: update the tarea on the server */
updateTarea(tarea: Tarea): Observable<any> {
  const url = `${this.tareasDetailUrl}/${tarea.id}`;
  return this.http.put<Tarea>(url, tarea, this.httpOptions).pipe(
    tap(_ => this.log(`updated tarea id=${tarea.id}`)),
    catchError(this.handleError<any>('updateTarea'))
  );
}

/** DELETE: delete the tarea from the server */
deleteTarea(id: number): Observable<Tarea> {
  const url = `${this.tareasUrl}/${id}`;

  return this.http.delete<Tarea>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted tarea id=${id}`)),
    catchError(this.handleError<Tarea>('deleteTarea'))
  );
}



private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** Log a TareaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TareaService: ${message}`);
  }
}
