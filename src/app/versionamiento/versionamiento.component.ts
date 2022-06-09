import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({

  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,

  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }

})

@Component({
  selector: 'app-versionamiento',
  templateUrl: './versionamiento.component.html',
  styleUrls: ['./versionamiento.component.scss']
})
export class VersionamientoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notasVersion() {
    Swal.fire({
      title: '<strong>Notas de la versión actual</strong>',
      icon: 'info',
      html:

        `	<div>
            <div style="color: green;"> Estado de módulos para almacenar datos </div>
              <li style="list-style:none;">Maestro de compañías       </span style="color: yellowgreen;">ON</span> </li>
              <li style="list-style:none;">Maestro de proveedores     </span style="color: yellowgreen;">ON</span> </li>
              <li style="list-style:none;">Maestro de productos       </span style="color: yellowgreen;">ON</span> </li>
            <hr>
            <div style="color: green;"> Gestores </div>
              <li style="list-style:none;">Cotizador        </span style="color: orange;">En desarrollo</span> </li>
            <div style="color: green;"> Configuración </div>
              <li style="list-style:none;">Configuraciones  </span style="color: orange;">En desarrollo</span> </li>
          </div>
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Genial!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<mat-icon>cancel</mat-icon>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }

}
