import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATHS_RESOURCE } from '../shared/static/paths-resource';
import Swal from 'sweetalert2';
import { CajeroService } from '../shared/service/cajero.service';
import { Dinero } from '../shared/models/dinero';
import { Dinero_Request } from '../shared/request/dinero-request';

@Component({
  selector: 'app-cajero',
  templateUrl: './cajero.component.html',
  styleUrls: ['./cajero.component.css']
})
export class CajeroComponent implements OnInit {

  cantidadRetiro: number = 0;
  saldoCajero: number = 12250;
  cargandoTransaccion: boolean = false;
  dineroDenominaciones: Dinero[] = [];
  urlEmpty: string = `${PATHS_RESOURCE.GET_IMG_ALERTS}empty.svg`;
  urlAlertas: string = `${PATHS_RESOURCE.GET_IMG_ALERTS}`;

  constructor(private _spinner: NgxSpinnerService,
    private _cajeroService: CajeroService) { }

  ngOnInit(): void {
    this._spinner.show("cajero");
    this.obtenerDinero();
  }

  obtenerDinero() {
    this._cajeroService.getAllDinero().subscribe(response => {
      this.dineroDenominaciones = response.data as Dinero[];
      this.calcularSaldoTotal();
    })
  }

  calcularSaldoTotal() {
    let suma = 0;
    this.dineroDenominaciones.forEach(dinero => {
      suma += (dinero.cantidad! * Number(dinero.denominacion));
    });
    this.saldoCajero = suma;
    this._spinner.hide("cajero");
  }

  retirarDinero() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-3',
        cancelButton: 'btn btn-white'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      html: '¿Retirar la cantidad de: $<b>' + this.cantidadRetiro + '</b>?',
      showCancelButton: true,
      confirmButtonText: 'Retirar',
      imageUrl: `${this.urlAlertas}question.svg`,
      cancelButtonText: 'Cancelar',
      imageWidth: 400,
      imageHeight: 300,
      width: 700,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._spinner.show("cajero");
        let request: Dinero_Request = new Dinero_Request;
        request.dinero = this.dineroDenominaciones;
        this._cajeroService.retirarEfectivo(request).subscribe(response => {
          if (response.successfulResponse) {
            this.obtenerDinero();

            this.cargandoTransaccion = false;
            this.cantidadRetiro = 0;
            this._spinner.hide("cajero");
            Swal.fire({
              imageUrl: `${this.urlAlertas}success.svg`,
              imageWidth: 400,
              imageHeight: 300,
              width: 700,
              title: '¡Transacción realizada con éxito!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })

      } else {
        this.cargandoTransaccion = false;
      }
    })
  }

  resetDinero() {
    this.obtenerDinero();
    this.cantidadRetiro = 0;
  }

  updateCantidadDinero(idDinero: number) {
    let dinero = this.dineroDenominaciones.find(d => d.id === idDinero);
    if (dinero) {
      console.log(dinero);
      dinero.cantidad = dinero.cantidad! - 1;
    }
    this.cantidadRetiro += Number(dinero?.denominacion!);
  }

}
