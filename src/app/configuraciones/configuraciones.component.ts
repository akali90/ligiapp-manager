import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit {

  constructor( public router: Router ) { }

  public _ftitle: number = 0;
  public _fparagraph: number = 0;

  ngOnInit(): void {
    this._ftitle = Number(sessionStorage.getItem('font-size-title'));
    this._fparagraph = Number(sessionStorage.getItem('font-size-paragraph'));
  }

  rangeFontSizeTitle() {
    var title_min = 14;
    var title_max = 26;
    let x: any = sessionStorage.setItem('font-size-title', this._ftitle.toString());

    if( this._ftitle < title_min   ) {
      this._ftitle = title_min;
      sessionStorage.setItem('font-size-title', title_min.toString());
      Toast.fire({
        icon: 'warning',
        title: 'Haz llegado al límite mínimo'
      })
    }
    else if ( this._ftitle > title_max ) {
      this._ftitle = title_max;
      sessionStorage.setItem('font-size-title', title_max.toString());
      Toast.fire({
        icon: 'warning',
        title: 'Haz llegado al límite máximo'
      })
    }

    Toast.fire({
      icon: 'success',
      title: 'Cambios generados con éxito'
    })

    location.reload();

}

rangeFontSizeParagraph() {
  var paragraph_min = 9;
  var paragraph_max = 16;
  sessionStorage.setItem('font-size-paragraph', this._fparagraph.toString());

   if ( this._fparagraph > paragraph_max ) {

    this._fparagraph = paragraph_max;
    sessionStorage.setItem('font-size-paragraph', this._fparagraph.toString());

    Toast.fire({
      icon: 'warning',
      title: 'Haz llegado al límite máximo'
    })

  }

  Toast.fire({
    icon: 'success',
    title: 'Cambios generados con éxito'
  })

  location.reload();

}

}
