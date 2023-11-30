import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  
  apiURL = 'http://127.0.0.1:8000/api'
  //https://9pn8qpf3-8000.brs.devtunnels.ms/api
  constructor(private http: HttpClient) { }

  postData(data: any):Observable<any>{
    return this.http.post(this.apiURL+'/user', data);
  }
}
