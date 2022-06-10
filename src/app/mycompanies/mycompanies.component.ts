import { Component, OnInit } from '@angular/core';
import { MycompaniesService } from '../mycompanies.service';


import Swal from 'sweetalert2'
import { TokengenerateService } from '../tokengenerate.service';
import { PopUpModsService } from '../popup/pop-up-mods.service';
import { CountriesrestapiService } from '../countriesrestapi.service';

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
  selector: 'app-mycompanies',
  templateUrl: './mycompanies.component.html',
  styleUrls: ['./mycompanies.component.scss']
})
export class MycompaniesComponent implements OnInit {

  public _search: string = '';
  public name_companies: string = 'Mi compañía';
  public _ncompany: string = '';
  public _img: string = '';
  public _descomp: string = '';
  public _ruc: string = '';
  public _dateinit: any = '';
  public _email: string = '';
  public _pais: string = '';
  public _ciudad: string = '';
  public _webpage: string = '';
  public _telf_a: string = '';
  public _telf_b: string = '';
  public _domicilio: string = '';
  public picc_servicio: any = '';
  public _fServ: string = '';
  public _cta_ah: string = '';
  public tipo_cta_ah: string = '';
  public institu_fin: string = '';

  public _show_part_ing: boolean = true;
  public _show_part_reg: boolean = false;

  public _color_btnA: string = '#5C277B';
  public _color_btnB: string = '#422A4F';
  public _color_bord_A: string = '#0EC9BB';
  public _color_bord_B: string = 'transparent';

  constructor( public countries: CountriesrestapiService, public popUp: PopUpModsService, public compan: MycompaniesService, public tk: TokengenerateService ) { }

  ngOnInit(): void {

    let xusertoken: any = sessionStorage.getItem('Token')
    this.getComp();

  }

  // API PARA RELLENO DE PAISES
  //------------------------------------------------------------------
  public countriesArr: any = [];
  public _name_countrie: string = '';
  public cant_paises: number = 0;
  getCountries() {
    console.log('paises')
    this.countries.getApiRestCountries().subscribe( countries => {
      this.countriesArr = countries;
      this.cant_paises = this.countriesArr.length;
      // console.log(this.countriesArr);
    })
  }

  asignCountries(countrie: string) {
    this._pais = countrie;
  }

  getNameCountries(name: string) {
    this.countries.getApiRestCountriesByName(name).subscribe( countriesn => {
      this.countriesArr = countriesn;
      console.log(this.countriesArr);
    })
  }
  //------------------------------------------------------------------


  //#region INTERFAZ GENERA FUNCIONAMIENTO INICIO
  public _colorProv: string = '';
  changeModsView(obA:boolean, obB:boolean, cola: string, colb: string, bordA: string, bordB: string, btnPost: boolean) {
    this._show_part_ing = obA;
    this._show_part_reg = obB;
    this._color_btnA = cola;
    this._color_btnB = colb;
    this._color_bord_A = bordA;
    this._color_bord_B = bordB;
    this.btnPost = btnPost;
  }

  //PopUp
  genPopUp(id: string) {

    // let xobj = document.getElementById(id) as HTMLDivElement;

    // this.popUp.LigiPopUp(

    //     xobj, 'Maestros', 'jscreate_wind',
    //     'font-size: 12pt;', '¿Qué son los Maestros?',
    //     '',

    // )

  }

  //#endregion INTERFAZ GENERA FUNCIONAMIENTO INICIO



  public btnPost: boolean = true;
  public btnPut: boolean = false;
  asignData(_imgg:string, id:number, codec_edit: string, _ncompany: string, _descomp: string,
            _piccserv: string, _dinit: string, _tlfa: string, _tlfb: string, _ciudad: string, _pais: string
            ,_mail: string, _web: string, institu_fin: string, tip_cta_a:string, cta_aho: string, _ruc: string, _domicilio: string) {

    localStorage.setItem('ID-CIA', (id).toString());
    localStorage.setItem('Codec_edit_cia', codec_edit);

    this._ncompany      = _ncompany;
    this._descomp       = _descomp;
    this.picc_servicio  = _piccserv;
    this._dateinit      = _dinit;
    this._telf_a        = _tlfa;
    this._telf_b        = _tlfb;
    this._ciudad        = _ciudad;
    this._pais          = _pais;
    this._email         = _mail;
    this._webpage       = _web;
    this.institu_fin    = institu_fin;
    this.tipo_cta_ah    = tip_cta_a;
    this._cta_ah        = cta_aho;
    this._ruc           = _ruc;
    this._domicilio     = _domicilio;
    this._colorProv     = '#B2E1DF';
    this.btnPost        = false;
    this.btnPut         = true;

    this.changeModsView(true, false, '#361E45', '#5C277B', '#0EC9BB', 'whitesmoke', false)

    const yy: any = document.getElementById('boxImg') as HTMLDivElement
    yy.style.backgroundImage = `url(${_imgg})`;

  }

  public modComp: any = [];
  saveComp() {

    let xuser: any = sessionStorage.getItem('Token');

    this.modComp = {
      name_cia   : this._ncompany,
      descrip_cia: this._descomp,
      image_cia  : this.picc_servicio,
      date_init  : this._dateinit,
      campoA     : '-',
      campoB     : '',
      campoC     : '',
      codec_cia  : this._ncompany.slice(0,3)+'-'+this.tk.generateRandomString(10)+'_CIA',
      telef_a    : this._telf_a,
      telef_b    : this._telf_b,
      email_cia  : this._email,
      web_cia    : this._webpage,
      insti_fin  : this.institu_fin,
      tipo_cuenta: this.tipo_cta_ah,
      n_cuenta   : this._cta_ah,
      ciudad_cia : this._ciudad,
      pais_cia   : this._pais,
      ruc        : this._ruc,
      domicilio  : this._domicilio,
      cod_user   : xuser
    }

    this.compan.saveCompanies(this.modComp).subscribe({
      next:(x) => {
        console.log(x)
      }, error: () => {
        Toast.fire({
          icon:  'error',
          title: 'Compañía no se ha guardado correctamente'
        });
      }, complete: () => {
        Toast.fire({
          icon:  'success',
          title: 'Compañía se ha guardado correctamente'
        });

        let xusertoken: any = sessionStorage.getItem('Token');
        this.getComp();
        this.cleanUp();

      }
    })

  }

  updateComp() {

    let xj: any = localStorage.getItem('ID-CIA');
    let codec_cia: any =localStorage.getItem('Codec_edit_cia');
    let xuser: any = sessionStorage.getItem('Token');
    this.modComp = {
      name_cia   : this._ncompany,
      descrip_cia: this._descomp,
      image_cia  : this.picc_servicio,
      date_init  :this._dateinit,
      campoA     :'-',
      campoB     :'',
      campoC     :'',
      codec_cia  :codec_cia,
      telef_a    : this._telf_a,
      telef_b    : this._telf_b,
      email_cia  : this._email,
      web_cia    : this._webpage,
      insti_fin  : this.institu_fin,
      tipo_cuenta: this.tipo_cta_ah,
      n_cuenta   : this._cta_ah,
      ciudad_cia : this._ciudad,
      pais_cia   : this._pais,
      ruc        : this._ruc,
      domicilio  : this._domicilio,
      cod_user   : xuser,
      id: xj
    }

    this.compan.putCompanies(xj, this.modComp).subscribe({
      next: (x) => {
        console.log(x)
      }, error: () => {
        Toast.fire({
          icon:  'error',
          title: 'Compañía no se ha actualizado correctamente'
        });
      }, complete: () => {
        Toast.fire({
          icon:  'success',
          title: 'Compañía se ha actualizado correctamente'
        });

        let xusertoken: any = sessionStorage.getItem('Token');
        this.getComp();
        this.cleanUp();

      }
    })

  }

  delComp(id: number) {

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
        this.compan.delCompanies(id).subscribe({
          next: (x) => {
            console.log(x);
          }, error: () => {
            Toast.fire({
              icon:  'error',
              title: 'Compañía no se ha eliminado correctamente'
            });
          }, complete: () => {
            Toast.fire({
              icon:  'success',
              title: 'Compañía se ha eliminado correctamente'
            });
            let xusertoken: any = sessionStorage.getItem('Token')
            this.getComp();
          }
        })
      }

    })
  }

  cleanUp() {

    this._ncompany      = '';
    this._descomp       = '';
    this.picc_servicio  = '';
    this._dateinit      = '';
    this._telf_a        = '';
    this._telf_b        = '';
    this._ciudad        = '';
    this._pais          = '';
    this._email         = '';
    this._webpage       = '';
    this.institu_fin    = '';
    this._ruc           = '';
    this._cta_ah        = '';
    this.tipo_cta_ah    = '';
    this.btnPost = true;
    this.btnPut = false;
    this._domicilio = '';
    this._colorProv = '#EFEFEF';
    const yy: any = document.getElementById('boxImg') as HTMLDivElement
    yy.style.backgroundImage = ``;

  }

  public arrComp: any = [];
  getComp() {
    let xusertoken:any = sessionStorage.getItem('Token')
    this.compan.getCompanies(xusertoken).subscribe({
      next: (x) => {
        this.arrComp = x;
        console.log(this.arrComp);
      }
    })
  }

  encodeImageFileAsURLA(idA: string, idB: string) {

    const filesSelected: any = document.getElementById(idA) as HTMLInputElement;
    const fileId: any = filesSelected.files;
    let base: any;

    if (fileId.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();

      // tslint:disable-next-line: only-arrow-functions
      fileReader.onload = () => {
        base = fileReader.result;
        localStorage.setItem('IMGA', base)
        const yy: any = document.getElementById(idB) as HTMLDivElement
        yy.style.backgroundImage = `url(${base})`;
      };

      fileReader.onloadend = () => {
        this.picc_servicio = fileReader.result;
      };

      const a = fileReader.readAsDataURL(fileId[0]);

    }

  }




}
