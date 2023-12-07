import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  
  private actualizarViajesSubject = new Subject<void>();

  apiURL = 'http://127.0.0.1:8000/api'
  //https://9pn8qpf3-8000.brs.devtunnels.ms/api
  constructor(private http: HttpClient) { }

  postData(data: any):Observable<any>{
    return this.http.post(this.apiURL+'/user', data);
  }

  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL+'/user')
    .pipe(retry(3));
  }

  registerVehiculo(data: any): Observable<any> {
    return this.http.post(this.apiURL+'/vehiculo', data);
  }

  registerViaje(data:any): Observable<any> {
    return this.http.post(this.apiURL+'/viaje',data)
  }

  getViajes(data:any):Observable<any>{
    return this.http.get(this.apiURL+'/viaje',data)
    .pipe(retry(3));
  }

  getDetallesViaje(id_viaje: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/viaje/${id_viaje}/`);
  }

  putViaje(data:any):Observable<any>{
    return this.http.put(this.apiURL+'/viaje',data)
  }
}
