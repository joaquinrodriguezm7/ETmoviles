import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

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

  registerVehiculo(data: any): Observable<any> {
    return this.http.post(this.apiURL+'/vehiculo', data);
  }

  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL+'/user')
    .pipe(retry(3));
  }

  registerViaje(data:any): Observable<any> {
    return this.http.post(this.apiURL+'/viaje',data)
  }
}
