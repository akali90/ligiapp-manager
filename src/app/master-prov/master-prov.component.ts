import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModulesService } from '../modules.service';
import { OrtoprovService } from '../ortoprov.service';
import { TokengenerateService } from '../tokengenerate.service';

import Swal from 'sweetalert2'
import { OrtoservService } from '../ortoserv.service';
import { MycompaniesService } from '../mycompanies.service';

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
  selector: 'app-master-prov',
  templateUrl: './master-prov.component.html',
  styleUrls: ['./master-prov.component.scss']
})
export class MasterProvComponent implements OnInit {
  panelOpenState = false;

  public datos: any = [];
  public mods: any = [];
  public x: any;
  public y: any;
  public _nameProv: string = ''
  public _cedula: string = ''
  public _telfA: string = ''
  public _telfB: string = ''
  public _direcc: string = ''
  public _mail: string = ''
  public _ciudad: string = ''
  public _web: string = ''
  public _search: string ='';
  public _type_prov: string = '';
  public _us_ficha: string = '';
  public _serv_vis: boolean = true;
  public _prods_vis: boolean = false;
  public _pais: string = '';
  public _nameServ: string = '';
  public _desc_serv: string = '';
  public _cos_serv: number = 0.00;
  public _cost_add: number = 0.00;
  public _observ: string = '';

  public _finit: any = '';
  public _ffinal: any = '';
  public labelMessage: string = '';
  public __days: string = '';
  public _lock = true;

  public bool_A: boolean = false;

  opcionSeleccionado: string  = 'seleccionado';
  verSeleccion: string        = '';

  public _show_part_ing: boolean = true;
  public _show_part_reg: boolean = false;

  public _color_btnA: string = '#5C277B';
  public _color_btnB: string = '#422A4F';
  public _color_bord_A: string = '#0EC9BB';
  public _color_bord_B: string = 'transparent';

  foods: any = [
    {value: 'servicios', viewValue: 'Servicios'},
    {value: 'bienes', viewValue: 'Bienes (Productos)'}
  ];

  constructor( private Mods:ModulesService, private compan: MycompaniesService, public Oservices: OrtoprovService, public OrtoservServices: OrtoservService,  public router: Router, public tgen: TokengenerateService ) {
    this.datos = ['Servicios', 'Bienes'];
  }

  public xx: any = sessionStorage.getItem('Companies');
  ngOnInit(): void {
    let y: any = sessionStorage.getItem('Name-Companies');
    console.log(this.xx)
    this.getComp('campoA', '-', 'desc');
    this.getProveedores('servicios', 'cod_prov', '_', 'asc', this.xx);
    this.getProveedores('bienes', 'cod_prov', '_', 'asc', this.xx);

    if (this.xx != undefined && y != undefined) {
      this._lock = false;
      this.labelMessage = y;
    }
    else {
      this._lock = true;
      this.labelMessage = '- NO HAY SELECCIÓN -';
    }

  }



  public arrComp: any = [];
  getComp(properties: string, data: string, order: string) {
    let xusertoken:any = sessionStorage.getItem('Token')
    this.compan.getCompanies(xusertoken).subscribe({
      next: (x) => {
        this.arrComp = x;
        console.log(this.arrComp);
      }
    })
  }

  asignCompany( companie: string, ncomp: string ) {
    sessionStorage.setItem('Companies',      companie);
    sessionStorage.setItem('Name-Companies', ncomp);
    this.labelMessage = ncomp;
    this.getProveedores('servicios', 'cod_prov', '_', 'asc', companie);
    this.getProveedores('bienes', 'cod_prov', '_', 'asc', companie);
    this._lock = false;

  }

  public _codec_us: string = '';
  genType(a:string, c:string, b:string) {
    this._type_prov = a;
    this._codec_us = b;
    this._us_ficha = c;
    this.getProveedores(a, 'cod_prov', b, 'asc', this.xx);
    this.getServicios(b, 'nom_serv', 'a', 'desc');
  }

  capturar(value:string) {
    this.verSeleccion = value;
    console.log(value)
  }


  public proveeArr: any = [];
  saveProveedor() {

    let xcod = this.tgen.generateRandomString(25)

    this.proveeArr = {
        tipo     : this.verSeleccion,
        nom_prov : this._nameProv,
        idpers   : this._cedula,
        telef    : this._telfA,
        telef2   : this._telfB,
        direccion: this._direcc,
        correo   : this._mail,
        pais   : this._pais,
        ciudad   : this._ciudad,
        pagweb   : this._web,
        cod_prov : xcod+'_'+this._cedula,
        cod_cias: this.xx
    }

    console.log(this.proveeArr)

    this.Oservices.saveProveedor(this.proveeArr).subscribe( {
      next: (xprov) => {
        console.log('Guardado con exitp')
        console.log(xprov)
      }
      , error: () => {
        Toast.fire({
          icon: 'error',
          title: 'No hemos podido guardarlo, revise su conexión a internet'
        });
      },
      complete: () => {
        this.getProveedores('servicios', 'cod_prov', '_', 'asc', this.xx);
        this.getProveedores('bienes', 'cod_prov', '_', 'asc', this.xx);
        Toast.fire({
          icon: 'success',
          title: 'Proveedor guardado con éxito'
        });
        this.cclean();
      }
    })

  }

  public proveeArrGet: any = [];
  public proveServArrGet: any = [];
  getProveedores(tipo: string, properties: string, data: string, order: string, ccia:string) {

    if( properties == 'nom_prov' && data == '' ) {
      properties = 'cod_prov';
      data = '_';
    }

    this.Oservices.getProv(tipo, properties, data, order, ccia).subscribe({

      next: (prov) => {

        if( tipo == 'servicios' ) {
          this.proveeArrGet = prov;
          this._serv_vis = true;
          this._prods_vis = false;
        }

        else if ( tipo == 'bienes' ) {
          this.proveServArrGet = prov;
          this._serv_vis = false;
          this._prods_vis = true;
        }

      }, error: () => {

      }, complete: () => {
        // console.log('Extraido completamente')
      }
    })
  }


  public _colorProv: string = '';
  public btnPost: boolean = true;
  public btnPut: boolean = false;
  asignData(id:number, codec_edit: string, verSeleccion: string, _nameProv: string, _cedula: string, _telfA: string, _telfB: string, _direcc: string, _mail: string, _ciudad: string, _pais:string, _web: string) {

    localStorage.setItem('ID', (id).toString());
    localStorage.setItem('Codec_edit', codec_edit);
    this.verSeleccion = verSeleccion;
    this._nameProv  = _nameProv;
    this._cedula    = _cedula  ;
    this._telfA     = _telfA   ;
    this._telfB     = _telfB   ;
    this._direcc    = _direcc  ;
    this._mail      = _mail    ;
    this._ciudad    = _ciudad  ;
    this._pais    = _pais  ;
    this._web       = _web     ;
    this._colorProv = '#B2E1DF';
    this.btnPost    = false;
    this.btnPut     = true;

    this.changeModsView(true, false, '#361E45', '#5C277B', '#0EC9BB', 'whitesmoke', false)

  }


  //#region INTERFAZ GENERA FUNCIONAMIENTO INICIO
  changeModsView(obA:boolean, obB:boolean, cola: string, colb: string, bordA: string, bordB: string, btnPost: boolean) {
    this._show_part_ing = obA;
    this._show_part_reg = obB;
    this._color_btnA = cola;
    this._color_btnB = colb;
    this._color_bord_A = bordA;
    this._color_bord_B = bordB;
    this.btnPost = btnPost;
  }

  upProv() {
    let xcod: any = localStorage.getItem('Codec_edit')?.trim()
    let xid: any = localStorage.getItem('ID');
    this.proveeArr = {
      id: Number(xid),
      tipo     : this.verSeleccion,
      nom_prov : this._nameProv,
      idpers   : this._cedula,
      telef    : this._telfA,
      telef2   : this._telfB,
      direccion: this._direcc,
      correo   : this._mail,
      pais     : this._pais,
      ciudad   : this._ciudad,
      pagweb   : this._web,
      cod_prov : xcod,
      cod_cias: this.xx
    }

    console.log(this.proveeArr)

    this.Oservices.updateProv(Number(xid), this.proveeArr).subscribe({
      next: (uprov) => {
        console.log(uprov);
      }
      ,error: () => {
        console.warn('No se ha podido actualizar')
      }, complete: () => {
        this.getProveedores('servicios', 'cod_prov', '_', 'asc', this.xx);
        this.getProveedores('bienes', 'cod_prov', '_', 'asc', this.xx);
        this.cclean();
        Toast.fire({
          icon: 'success',
          title:  'Editado con éxito'
        });
        this.btnPost    = true;
        this.btnPut     = false;
        this._colorProv = '#EFEFEF';
      }
    })

  }

  deleteProv(codec: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Oservices.delProv(codec).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }, error: () => {
            Toast.fire({
              icon: 'error',
              title: 'No se pudo eliminar'
            });
          }, complete: () =>{
            this.getProveedores('servicios', 'cod_prov', '_', 'asc', this.xx);
            this.getProveedores('bienes', 'cod_prov', '_', 'asc', this.xx);
          }

        })

      }

    })

  }

  public servOrt: any = [];
  saveServs(cod_prov: string) {

      this.servOrt = {
        nom_serv  : this._nameServ,
        desc_serv : this._desc_serv,
        cos_serv  : this._cos_serv,
        finit     : this._finit,
        ffinal    : this._ffinal,
        cost_add  : this._cost_add,
        cod_prov  : cod_prov,
        observ    : this._observ
      }

      console.log(this.servOrt);

      this.OrtoservServices.savServs(this.servOrt).subscribe({
        next: (x) => {
          console.log(x)
        }, error: () => {
          Toast.fire({
            icon: 'error',
            title: 'No se pudo añadir este item'
          });
        }, complete: () => {
          Toast.fire({
            icon: 'success',
            title: 'Item añadido correctamente al proveedor'
          });
          this.cleanServices();
          this.getServicios(cod_prov, 'nom_serv', 'a', 'desc')
        }
      })
  }

  public xArrServs: any = [];
  public cantServs: number = 0.00;
  getServicios(cprov: string, properties:string, data:string, order:string) {
    this.OrtoservServices.getServs(cprov, properties, data, order).subscribe({
      next:(servs)=>{
        this.xArrServs = servs;
      }, error: () => {

      }, complete: () => {
        this.cantServs = this.xArrServs.length;
        console.log(this.xArrServs);
      }
    })
  }

  public _id_servs: number = 0;
  asignServices(ids: number, _nameServ: string, _desc_serv: string, cos_serv: number, _finit: any, _ffinal: any, _cost_add: number, _observ: string) {
    this._nameServ = _nameServ
    this._desc_serv = _desc_serv
    this._cos_serv = cos_serv
    this._finit = _finit
    this._ffinal = _ffinal
    this._cost_add = _cost_add
    this._id_servs = ids
    // cod_prov,
    this._observ = _observ
    this._colorProv = '#B2E1DF';
    this.btnPost    = false;
    this.btnPut     = true;
  }

  putServices(cod_prov: string, id: number) {

    this.servOrt = {

      nom_serv  : this._nameServ,
      desc_serv : this._desc_serv,
      cos_serv  : this._cos_serv,
      finit     : this._finit,
      ffinal    : this._ffinal,
      cost_add  : this._cost_add,
      cod_prov  : cod_prov,
      observ    : this._observ,
      id: id

    }

    console.log(this.servOrt);

    this.OrtoservServices.putServs(id, this.servOrt).subscribe({
      next: (x) => {
        console.log(x);
      }, error: () => {
        Toast.fire({
          icon: 'error',
          title: 'Servicio no se ha actualizado correctamente'
        });
      }, complete: () => {
        Toast.fire({
          icon: 'success',
          title: 'Servicio se ha actualizado correctamente'
        });
        this.cleanServices();
        this.getServicios(cod_prov, 'nom_serv', 'a', 'desc')

      }
    })
  }

  dServices(id: number, cod_prov: string) {
    this.OrtoservServices.delServs( id ).subscribe({
      next: (x) => {
        console.log(x)
      }, error: () => {
        Toast.fire({
          icon: 'error',
          title: 'Servicio no se ha eliminado correctamente'
        });
      }, complete: () => {
        Toast.fire({
          icon: 'success',
          title: 'Servicio se ha eliminado correctamente'
        });
        this.cleanServices();
        this.getServicios(cod_prov, 'nom_serv', 'a', 'desc');
      }
    })
  }

  cleanUp() {
    this._nameProv = '';
    this._cedula = '';
    this._telfA = '';
    this._telfB = '';
    this._direcc = '';
    this._mail  = '';
    this._pais = '';
    this._ciudad = '';
    this._web = '';
    this.btnPost = true;
    this.btnPut = false;
    this._colorProv = '#EFEFEF';
  }

  cclean() {
    this._nameProv = '';
    this._cedula = '';
    this._telfA = '';
    this._telfB = '';
    this._direcc = '';
    this._mail  = '';
    this._pais  = '';
    this._ciudad = '';
    this._web = '';
  }

  cleanServices() {
    this._nameServ = '';
    this._desc_serv = '';
    this._cos_serv = 0.00;
    this._finit = '';
    this._ffinal = '';
    this._cost_add = 0;
    this._observ = '';
    this.btnPost = true;
    this.btnPut = false;
    this._colorProv = '#EFEFEF';
  }



}
