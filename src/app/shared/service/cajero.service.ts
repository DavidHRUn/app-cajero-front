import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dinero_Request } from '../request/dinero-request';
import { ResponseModel } from '../response/responseModel';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root'
})
export class CajeroService {

  private endPoint: string = `${environment.ENDPOINT}/app-dinero`

  constructor(private _http: HttpClient,
    private _httpErrorService: HttpErrorService) { }

  public getAllDinero(): Observable<ResponseModel> {
    const url: string = `${this.endPoint}/getDinero`;
    return this._http.get<ResponseModel>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._httpErrorService.http_error(error.status);
          return throwError(error);
        })
      );
  }

  public retirarEfectivo(dineroRequest: Dinero_Request): Observable<ResponseModel> {
    const url: string = `${this.endPoint}/transaccionRetirar`;
    return this._http.post<ResponseModel>(url, dineroRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._httpErrorService.http_error(error.status);
          return throwError(error);
        })
      );
  }
}
