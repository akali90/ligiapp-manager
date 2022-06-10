import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../modules.service';
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
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})

export class DashComponent implements OnInit {

  public datos: any = [];
  public mods: any = [];
  public x: any;
  public y: any;
  public _prov: boolean = false;
  public _compan: boolean= false;
  public _citiz: boolean = false;
  public _gest_prod: boolean = false;
  public _config: boolean = false;

  public _close_nav: string = 'chevron_right';

  public fontsizetitle: any ='';
  public fontsizeparagraph: any ='';

  constructor( private Mods:ModulesService, public router: Router ) {
    this.datos = ['Servicios', 'Materiales'];
  }

  ngOnInit(): void {
    let xy: any = localStorage.getItem('module-active');
    console.log(this.fontsizetitle = sessionStorage.getItem('font-size-title'));
    console.log(this.fontsizeparagraph = sessionStorage.getItem('font-size-paragraph'));
    this.getModuless(1);
    this.getModuless(2);
    this.getModuless(3);
    this.setModuleActive(xy);
  }

  public xs: boolean = false;
  public _width: string = '175px';
  public _width_b: string = '75%';
  public close_title: string = 'Cerrar sesión';
  public _name_mod_title: boolean = true;
  public _color_button: string = '';
  public _box_shadows: string = '';
  public _border_rad: string = '5px';

  gestAnimNavs() {

    let xsubnav: any = document.getElementById('a');
    let xsubnavs: any = document.getElementById('navs');
    let btnnavs: any = document.getElementById('btnnavs');

    switch(this.xs) {

      case false:
        this.xs = true;
        this._close_nav = 'chevron_right';
        this._name_mod_title = false;
        xsubnav.style.transition = 'ease all 0.6s';
        xsubnavs.style.transition = 'ease all 0.6s';
        btnnavs.style.transition = 'ease all 0.6s';
        this._width = '75px';
        this._width_b = '88%';
        this.close_title = '';
        btnnavs.style.transition = 'ease all 0.6s';
        btnnavs.style.left = '81px';
        this._color_button = '#573B66';
        this._box_shadows = '0px 5px 10px rgba(0,0,0,0.5px)';
        this._border_rad = '20px';
        break;

      case true:
        this.xs = false;
        this._close_nav = 'chevron_left';
        xsubnav.style.transition = 'ease all 0.6s';
        xsubnavs.style.transition = 'ease all 0.6s';
        btnnavs.style.transition = 'ease all 0.6s';
        this._width = '175px';
        this._width_b = '75%';
        this._name_mod_title = true;
        this.close_title = 'Cerrar sesión';
        btnnavs.style.transition = 'ease all 0.6s';
        btnnavs.style.left = '181px';
        this._color_button = '#444444';
        this._box_shadows = '0px 5px 10px rgba(0,0,0,0.5px)';
        this._border_rad = '5px';
      break;

    }

  }


  setModuleActive(a:string) {
    localStorage.setItem('module-active', a);

    let x: any = localStorage.getItem('module-active');

    switch(a) {

      case 'Proveedores':
        console.log(x);
        this._prov = true;
        this._compan = false;
        this._citiz = false
        this._gest_prod = false
        this._config = false
        break;

      case 'Cotizaciones':
        console.log(x);
        this._prov = false;
        this._compan = false;
        this._citiz = true;
        this._gest_prod = false;
        this._config = false
        break;

      case 'Mi compañía':
        console.log(x);
        this._prov = false;
        this._compan = true;
        this._citiz = false
        this._gest_prod = false;
        this._config = false
        break;

      case 'Gestor de productos':
        console.log(x);
        this._prov = false;
        this._compan = false;
        this._citiz = false
        this._gest_prod = true
        this._config = false
        break;

      case 'Configuración':
        console.log(x);
        this._prov = false;
        this._compan = false;
        this._citiz = false
        this._gest_prod = false
        this._config = true
        break;

      default:
        if(x == 'Mi compañía') {
          this._prov = false;
          this._compan = true;
          this._citiz = false
          this._gest_prod = false
          this._config = false
        }
        else if( x == 'Cotizaciones' ) {
          this._prov = false;
          this._compan = false;
          this._citiz = true;
          this._gest_prod = false;
          this._config = false
        }
        else if( x == 'Proveedores' ) {
          this._prov = true;
          this._compan = false;
          this._citiz = false;
          this._gest_prod = false;
          this._config = false
        }
        else if( x == 'Gestor de productos' ) {
          this._prov = false;
          this._compan = false;
          this._citiz = false;
          this._gest_prod = true;
          this._config = false
        }

    }

  }

  public maestros: any = [];
  public contMaestros: any = [];
  public acciones: any = [];
  public contacciones: any = [];
  public configuraciones: any = [];

  public _cont_master_bool: boolean = false;
  public _cont_accion_bool: boolean = false;

  getModuless(mod: number) {
    let xuser : any = sessionStorage.getItem('Token');
    switch (mod) {
      case 1:
        // Maestros
        this.Mods.getModules(1, xuser).subscribe({
          next: (mast) => {
            this.maestros = mast;
          }
        });
        break;
      case 1.1:
        // Maestros
        this.Mods.getModules(1.1, xuser).subscribe({
          next: (mast) => {
            this.contMaestros = mast;
          }
        });
        break;
      case 2:
        // Acciones
        this.Mods.getModules(2, xuser).subscribe({
          next: (acc) => {
            this.acciones = acc;
            console.log(this.acciones);
          }
        });
        break;
      case 2.1:
        // Acciones
        this.Mods.getModules(2.1, xuser).subscribe({
          next: (cacc) => {
            this.contacciones = cacc;
            console.log(this.contacciones);
          }
        });
        break;
      case 3:
        this.Mods.getModules(3, xuser).subscribe({
          next: (conf) => {
            this.configuraciones = conf;
          }
        });
        break;
    }
  }

  verification() {

    if( (this.x == '' && this.y == '') || (this.x == undefined && this.y == undefined) ) {
      this.router.navigate(['/Login']);
    } else {
      this.router.navigate(['/Dash']);
    }

  }

  closeSession() {
    sessionStorage.removeItem('User')
    sessionStorage.removeItem('Token')
    this.verification();
  }


  modord(modulo:string) {

    this.setModuleActive(modulo);

    // this.Mods.ordModules(modulo).subscribe({
    //   next: (modu) => {
    //     this.mods = modu;
    //   }
    // })

  }


}
