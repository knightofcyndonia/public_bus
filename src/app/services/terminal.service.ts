import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mainUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) { }

  getAllTerminals() : Observable<Object> {
    return this.http.get(mainUrl + '/api/terminal');
  }
  getTerminalById(id): Observable<Object> {
    return this.http.get(mainUrl + '/api/terminal/' + id);
  }
}
