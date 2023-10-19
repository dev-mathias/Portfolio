import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JeuMathService {

constructor(private httpClient:HttpClient) { }

  getExpressions():Observable<string>{
    return this.httpClient.get('assets/expressions_10.txt', { responseType: 'text'});
  }

}
