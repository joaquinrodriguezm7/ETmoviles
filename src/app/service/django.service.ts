import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, retry, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  
  private actualizarViajesSubject = new Subject<void>();

  apiURL = 'http://127.0.0.1:8000/api'
  //https://t9dnm8rd-8000.brs.devtunnels.ms/api
  constructor(private http: HttpClient) { }

  postData(data: any):Observable<any>{
    return this.http.post(this.apiURL+'/user', data);
  }

  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL+'/user')
    .pipe(retry(3));
  }

  changePass(data: any):Observable<any>{
    return this.http.put(this.apiURL+'/user', data)
    .pipe(retry(3));
  }

  registerVehiculo(data: any): Observable<any> {
    return this.http.post(this.apiURL+'/vehiculo', data);
  }

  getVehiculos(user: string) {
    return this.http.get<any>(`${this.apiURL}/vehiculo/${user}/`);
  }

  registerViaje(data:any): Observable<any> {
    return this.http.post(this.apiURL+'/viaje',data)
  }

  getViajes(data: any): Observable<any> {
    let params = new HttpParams();

    if (data.sede) {
        params = params.set('sede', data.sede);
    }

    return this.http.get(this.apiURL + '/viaje', { params }).pipe(retry(3));
  }

  getDetallesViaje(id_viaje: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/viaje/${id_viaje}/`);
  }

  putViaje(data:any):Observable<any>{
    return this.http.put(this.apiURL+'/viaje',data)
  }

  getSedes():Observable<any>{
    return this.http.get(this.apiURL+'/sede')
    .pipe(retry(3));
  }
}
