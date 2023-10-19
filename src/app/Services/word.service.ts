import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http:HttpClient) { }

  getAllWords(): Observable<string> {
    return this.http.get('assets/liste_francais.txt', { responseType: 'text'});
  }
  getWords():Observable<string>{
    return this.http.get('assets/liste_francais_frequent.txt',{responseType:'text'});
  }
}
