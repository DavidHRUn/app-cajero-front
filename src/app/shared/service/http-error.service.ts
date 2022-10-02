import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(private _spinner: NgxSpinnerService) { }

  public http_error(estatus: number) {
    this._spinner.hide();
    switch (estatus) {
      case 400:
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Ocurrio un problema, intenta más tarde.',
          showConfirmButton: false,
          timer: 2000
        })
        break;
      case 404:
        Swal.fire({
          customClass: {
            confirmButton: 'btn bg-azul btn-sm'
          },
          title: "",
          buttonsStyling: false,
          html: "<img src='./assets/error_http/error404.jpg' class='img-fluid' alt='Error de conexion'>",
          confirmButtonText: 'Entiendo'
        })
        break;
      case 409:
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Ocurrio un problema, intenta más tarde.',
          showConfirmButton: false,
          timer: 2000
        })
        break;
      case 500:
        Swal.fire({
          customClass: {
            confirmButton: 'btn bg-azul btn-sm'
          },
          title: "",
          buttonsStyling: false,
          html: "<img src='./assets/error_http/error500.jpg' class='img-fluid' alt='Error de conexion'>",
          confirmButtonText: 'Entiendo'
        })
        break;
      case 0:
        Swal.fire({
          customClass: {
            confirmButton: 'btn bg-azul btn-sm'
          },
          title: "",
          buttonsStyling: false,
          html: "<img src='./assets/error_http/not_connection.jpg' class='img-fluid' alt='Error de conexion'>",
          confirmButtonText: 'Entiendo'
        })
        break;
    }
  }
}
