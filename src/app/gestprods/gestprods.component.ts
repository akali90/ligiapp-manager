import { Component, OnInit } from '@angular/core';
import { ProductServsService } from '../product-servs.service';

import Swal from 'sweetalert2'
import { MycompaniesService } from '../mycompanies.service';
import { TokengenerateService } from '../tokengenerate.service';
import { OrtoprovService } from '../ortoprov.service';
import { OrtoservService } from '../ortoserv.service';
import { CreateprodService } from '../module-inventary/services/createprod.service';
import { CountriesrestapiService } from '../countriesrestapi.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

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
  selector: 'app-gestprods',
  templateUrl: './gestprods.component.html',
  styleUrls: ['./gestprods.component.scss']
})
export class GestprodsComponent implements OnInit {

  public _search: string = '';
  public btnPost: boolean = true;
  public btnPut: boolean = false;
  public _colorProv: string = '';
  public _fServ: string = '';
  public picc_servicio: any = '';

  public _lock: boolean = true;
  public labelMessage: string = '- No hay selección -';

  public _nom_prod: string = '';
  public _desc_prod: string = '';
  public _pres_prod: string = '';
  public _cost_prod: number = 0.00;
  public _descu: number = 0.00;
  public _color: string = '';
  public _uso: string = '';
  public _grupo: string = '';
  public _sgrupo: string = '';

  public _show_part_ing: boolean = true;
  public _show_part_reg: boolean = false;

  public _color_btnA: string = '#5C277B';
  public _color_btnB: string = '#422A4F';
  public _color_bord_A: string = '#0EC9BB';
  public _color_bord_B: string = 'white';

  public _ftitle: any = '';
  public _fparagraph: any = '';
  public xx: any = sessionStorage.getItem('Companies');

  public _dis_cost_prod: boolean = true;

  constructor( public countries: CountriesrestapiService,
               private Prod: ProductServsService,
               private tk: TokengenerateService,
               private compan: MycompaniesService,
               public Oservices: OrtoprovService,
               public OrtoservServices: OrtoservService,
               public cprodService: CreateprodService,
               private _formBuilder: FormBuilder ) { }

  public x: any = sessionStorage.getItem('Companies');

  ngOnInit(): void {

    this._ftitle = Number(sessionStorage.getItem('font-size-title'));
    this._fparagraph = Number(sessionStorage.getItem('font-size-paragraph'));

    this.getProveedores('servicios', 'cod_prov', '_', 'asc', this.xx);
    this.getProveedores('bienes', 'cod_prov', '_', 'asc', this.xx);

    let y: any = sessionStorage.getItem('Name-Companies');

    this.getProducts(75, 'cod_prod', '_', 'asc', this.x);

    this.getComp();


    if (this.x != undefined && y != undefined) {
      this._lock = false;
      this.labelMessage = y;
    }
    else {
      this._lock = true;
      this.labelMessage = '- NO HAY SELECCIÓN -';
    }

    let xnomProv: any = localStorage.getItem('name_proveedor')
    this.nom_server_prov = xnomProv;

    let xnomProd: any = localStorage.getItem('_nom_prod');
    this._nom_prod = xnomProd;

    let xcia: any = sessionStorage.getItem('Companies')
    this.getCProds(xcia, xnomProd);

  }

// API PARA RELLENO DE PAISES
  //------------------------------------------------------------------
  public countriesArr: any = [];
  public _name_countrie: string = '';
  public cant_paises: number = 0;
  getCountries() {

    this._show_spinner = true;

    console.log('paises')
    this.countries.getApiRestCountries().subscribe( { next: (countries) => {
      this.countriesArr = countries;
      this.cant_paises = this.countriesArr.length;
      // console.log(this.countriesArr);
    }, error: () => {
      this._show_spinner = false;
      Swal.fire(
        'Tenemos pequeños problemas al cargar los países',
        'Puedes digitarlo manualmente, muchas gracias, esperemos podamos retomar la conexión hacia este servicio web externo',
        'question'
      )
    }, complete: () => {
      this._show_spinner = false;
    }
  })
  }

  asignCountries(countrie: string) {
    // this._pais = countrie;
  }

  getNameCountries(name: string) {
    this.countries.getApiRestCountriesByName(name).subscribe( countriesn => {
      this.countriesArr = countriesn;
      console.log(this.countriesArr);
    })
  }

  //#exampleModal3
  public _dis_patron: boolean = true;
  public _id_modal: string = ''
  detectPrice() {
    let xdiv = document.getElementById('dpatron') as HTMLButtonElement;
    console.log(xdiv);
    console.log(this._cost_prod);
    if( this._cost_prod > 0) {
      this._dis_patron = false;
      //data-bs-toggle="modal" [data-bs-target]="_id_modal"

      xdiv.setAttribute('data-bs-toggle', 'modal')
      xdiv.setAttribute('data-bs-target', '#exampleModal3')
    }
    else {
      this._dis_patron = true;
      xdiv.setAttribute('data-bs-toggle', '')
      xdiv.setAttribute('data-bs-target', '')
    }
  }

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('manual' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  public icon_sel:string = '$';
  public _PVP: number = 0.0;
  public _Porc_Gan: number = 0.0;
  getFloatLabelValue(): FloatLabelType {
    console.log(this.floatLabelControl.value);
    if(this.floatLabelControl.value == 'manual') {
      this.icon_sel = '%'
    }
    else {
      this.icon_sel = '$'
    }
    return this.floatLabelControl.value || 'manual';
  }

  public subtot: number = 0.0;
  public totDesc: number = 0.0;
  public desc_s: number = 0.0;
  asign_price(_cost_prod: number, _descu: number, xnomProd: string, prec_acum: number) {

    localStorage.setItem('precio-prod-asign', _cost_prod.toString());
    localStorage.setItem('descu-prod-asign', _descu.toString());

    this.subtot = _cost_prod ;
    this.totDesc =- ( _cost_prod * (_descu / 100));
    this.desc_s = _descu;
    localStorage.setItem('calc-descu-prod', this.subtot.toString());

    let xcia: any = sessionStorage.getItem('Companies')

    this.getCProds(xcia, xnomProd);

    this._nom_prod = xnomProd;

    this._cost_prod = _cost_prod;
    this._descu = _descu;

    this._PVP = _cost_prod;
    this.sumatoriaCostServs = prec_acum;
    console.log(prec_acum)
    console.log(this.sumatoriaCostServs);

    this.xnumbpoc = ((this._PVP - this.sumatoriaCostServs)/this.sumatoriaCostServs)*100;

    // console.log('==============================');
    // console.log(this.arrProdC[0].costoTotal);

  }

  public sumCostArr: any = [];
  gCostProd(naprod: string, ccia: string) {
    this.cprodService.getCostProd(naprod, ccia).subscribe( {
      next:(x) => {
        this.sumCostArr = x;
      },
      error:() => {
        console.warn('Algo ha pasado en traer la sumatoria');
      },
      complete: () => {
        console.log(this.sumCostArr);
      }
    } )
  }


  public arrProdCreate: any = [];
  createProd(servicio:string, costo: number) {
    this.arrProdCreate.push([{servicio: servicio, costo: costo}]);
    console.log(this.arrProdCreate);
  }

  persistNameProd(_nom_prod: string) {
    localStorage.setItem('_nom_prod', _nom_prod);
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

  public proveeArrGet: any = [];
  public proveServArrGet: any = [];
  public _serv_vis: boolean = true;
  public _prods_vis: boolean = false;
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

  public arrCProds: any = [];
  saveProdsCreate(cod_prov: string, cod_serv: string, cod_prod: string) {

    this._show_spinner = true;
    let xCcia: any = sessionStorage.getItem('Companies');
    let npord: any = localStorage.getItem('_nom_prod');
    let cprod = cod_prod.slice(0,3) + '-' + cod_prov + '-' + new Date().getFullYear();
    // let cserv = cod_prov.slice(0,5) + '-' + new Date().getFullYear() + '-' + 'SERV' + '-' + cod_serv.slice(0,30).replace(/\s+/g, '_');

    console.log(cprod.length)
    console.log(cod_serv)

    this.arrCProds = {
      cod_prov: cod_prov,
      cod_serv: cod_serv,
      cod_prod: cprod,
      cod_cia:  xCcia,
      date_match_serv: new Date(),
      name_prod: cod_prod
    }

    console.log(this.arrCProds);

    this.cprodService.saveCreateProds(this.arrCProds).subscribe({
      next: (cprod) => {
        this._show_spinner = false;
        console.log('cprod');
      },
      error: () => {
        this._show_spinner = false;
      },
      complete: () => {
        this._show_spinner = false;
        // localStorage.removeItem('_nom_prod');
        let xnomProd: any = localStorage.getItem('_nom_prod');
        this.getCProds(xCcia, xnomProd);
        // this.gCostProd(xnomProd, xCcia);
      }
    })

  }

  dCprod(cprov: string, codserv: string, codprod: string, id: number) {

    let xcia: any = sessionStorage.getItem('Companies');
    this._show_spinner = true;

    this.cprodService.delCreateProds(cprov, codserv, codprod, id).subscribe( {
        next: () => {
          this._show_spinner = false;
        },
        error: () => {
          this._show_spinner = false;
        },
        complete: () => {
          this._show_spinner = false;
          console.log('xxxsxsxsxxxxs')
          let xnomProd: any = localStorage.getItem('_nom_prod');
          this.getCProds(xcia, xnomProd);
        }
      }
    )
  }

  public arrProdC: any = [];
  public cantCProd: number = 0;
  public sumatoriaCostServs: number = 0.0;
  public _color_numb: string = 'whitesmoke';
  public xnumbpoc: number = 0.0;
  getCProds(ccia: string, nprods: string) {
    this._show_spinner = true;
    console.log(ccia + '  ' + nprods);
    this.cprodService.getCreateProds( ccia, nprods ).subscribe({
      next: (prod) => {
        this.arrProdC = prod;
        this.cantCProd = this.arrProdC.length;
        console.log('=================PROD=========================');
        console.log(this.arrProdC);
        console.log('==============================================');
        // if( this.arrProdC.length = 0 ) {
        //   // this.sumatoriaCostServs = 0.0;
        //   alert('HEMOS LLEGADO A 0')
        // }
      },
      error: () => {
        this._show_spinner = false;
      },
      complete: () => {
        this._show_spinner = false;
        let arr = [];
        for(let n = 0;  n < this.arrProdC.length; n++ ) {

          let xy = this.arrProdC[n].costoTotal;
          //console.log(xy)
          arr.push(xy);
          console.log(arr)
          let xx = (previousValue: number, currentValue: number) => previousValue + currentValue;
          this.sumatoriaCostServs = arr.reduce(xx);

          localStorage.setItem('tot_sumatoria', this.sumatoriaCostServs.toString());

          //console.log(this.sumatoriaCostServs);
        }
        // console.log('Obteniendo la data');
        // console.log(this.arrProdC);
        // this.cantCProd = this.arrCProds.length;
        // console.log(this.cantCProd);
      }
    })
  }

  detextColor(xnumbpoc:number) {
    console.log('activando: ' + xnumbpoc);
    if( xnumbpoc <= 0 ) {
      this._color_numb = 'orangered';
    }
    if ( xnumbpoc > 0 && xnumbpoc <= 50) {
      this._color_numb = 'orange';
    }
    if( xnumbpoc > 50  ) {
      this._color_numb = 'yellowgreen';
    }

  }

  public xArrServs: any = [];
  public cantServs: number = 0.00;
  public _show_servs_provs: boolean = false;
  public nom_server_prov: string = '';
  getServicios(cprov: string, properties:string, data:string, order:string, name_prov: string) {
    localStorage.setItem('name_proveedor', name_prov);
    this.nom_server_prov = name_prov;
    this._show_spinner = true;
    this.OrtoservServices.getServs(cprov, properties, data, order).subscribe({
      next:(servs)=>{
        this.xArrServs = servs;
      }, error: () => {
        this._show_spinner = false;
      }, complete: () => {
        this.cantServs = this.xArrServs.length;
        this._show_spinner = false;
        console.log(this.xArrServs);
      }
    })
  }

  //spinner
  public _show_spinner: boolean = false;
  public cantProducts: number = 0;
  public arrProducts: any = [];
  getProducts(top:number, properties:string, data:string, order:string, ccia:string) {

    // console.log(ccia);

    this.Prod.getProds(top, properties, data, order, ccia).subscribe({
      next:(x)=>{
        this.arrProducts = x;
        console.log(this.arrProducts);
      },
      error: () => {
        console.warn('No se ha podido encontrar el producto');
      },
      complete: () => {
        this.cantProducts = this.arrProducts.length;

      }
    })
  }

  delProd(id:number) {

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

        this.Prod.delProds(id).subscribe({
          next:(x)=>{
            console.log(x);
          },
          error:()=>{
            Toast.fire({
              icon: 'error',
              title: 'Producto no se ha sido eliminado'
            })
          },
          complete:()=>{
            Toast.fire({
              icon: 'success',
              title: 'Producto eliminado con éxito'
            })

            this.getProducts(75, 'cod_prod', '_', 'asc', this.x);

          }
        })

      }

    })

  }

  public arrProdsS: any = [];
  saveProdDB() {

    let x: any = sessionStorage.getItem('Companies');

    this.arrProdsS = {
      nom_prod  : this._nom_prod,
      desc_prod: this._desc_prod,
      cod_prod : x.slice(0,5)+'_'+this.tk.generateRandomString(10)+'_'+this._nom_prod.slice(0,5)+'_PROD',
      pres_prod: this._pres_prod,
      cost_prod: this._cost_prod,
      color    : this._color,
      uso      : this._uso,
      descu    : this._descu,
      grupo    : this._grupo,
      sgrupo   : this._sgrupo,
      master   : '',
      cod_cia  : x,
      img_prods: this.picc_servicio
    }

    this.Prod.savProds(this.arrProdsS).subscribe({
      next:(x)=>{
        console.log(x);
      },
      error:()=>{
        Toast.fire({
          icon: 'error',
          title: 'Producto no se guardó'
        })
      },
      complete:()=>{
        Toast.fire({
          icon: 'success',
          title: 'Producto guardado con éxito'
        })
        localStorage.removeItem('_nom_prod');
        this.getProducts(75, 'cod_prod', '_', 'asc', this.x);
        this.getCProds('-', '-');
        this.cleanUp();

      }
    })
  }

  public arrUpProd: any = [];
  upProdDB() {
    this._show_spinner = true
    let x: any = sessionStorage.getItem('Companies');
    let codec_prod: any =localStorage.getItem('Codec_edit_prod');
    let id: any =localStorage.getItem('ID-PROD');

    this.arrUpProd = {
      nom_prod: this._nom_prod,
      desc_prod: this._desc_prod,
      cod_prod: codec_prod,
      pres_prod: this._pres_prod,
      cost_prod: this._cost_prod,
      color: this._color,
      uso: this._uso,
      descu: this._descu,
      grupo: this._grupo,
      sgrupo: this._sgrupo,
      master: "",
      cod_cia: x,
      img_prods: this.picc_servicio,
      id: id
    }

    this.Prod.putProds(id,this.arrUpProd).subscribe({
      next:(x)=>{
        console.log(x);
      },
      error:()=>{
        Toast.fire({
          icon: 'error',
          title: 'Producto ha sido guardado con éxito'
        })
        this._show_spinner = false
      },
      complete:()=>{
        Toast.fire({
          icon: 'success',
          title: 'Producto guardado con éxito'
        })
        this._show_spinner = false
        this.getProducts(75, 'cod_prod', '_', 'asc', this.x);
        this.cleanUp();

      }
    })
  }

  cleanUp() {
    this._nom_prod      = '';
    this.picc_servicio  = '';
    this._cost_prod = 0.0;
    this._descu = 0.0;
    this._pres_prod = '';
    this._desc_prod = '';
    this._color = '';
    this._uso = '';
    this._grupo = '';
    this._sgrupo = '';
    this._PVP = 0.0;
    this.xnumbpoc = 0.0;
    this.sumatoriaCostServs = 0.0;
    this.subtot = 0.0;
    this.totDesc = 0.0;
    this.btnPost = true;
    this.btnPut = false;
    this._colorProv = '#EFEFEF';

    const yy: any = document.getElementById('boxImg') as HTMLDivElement
    yy.style.backgroundImage = ``;

  }

  asignData(ccia: string, _imgg:string, id:number, _nom_prod: string, _cost_prod: number,
    _descu:number, _pres_prod: string, _desc_prod: string, _color: string, _uso: string, _grupo: string
    ,_sgrupo: string, codec_edit: string) {

    console.log('asign data esta activado');
    //_desc_prod
    // console.log(_imgg);
    localStorage.setItem('ID-PROD', (id).toString());
    localStorage.setItem('Codec_edit_prod', codec_edit);
    console.log(codec_edit)
    console.log(ccia)
    this.getImg( ccia, codec_edit );
    this._nom_prod      = _nom_prod;
    this.picc_servicio  = _imgg;
    this._cost_prod = _cost_prod;
    this._descu = _descu;
    this._pres_prod = _pres_prod;
    this._desc_prod = _desc_prod;
    this._color = _color;
    this._uso = _uso;
    this._grupo = _grupo;
    this._sgrupo = _sgrupo;
    this._colorProv     = '#B2E1DF';
    this.btnPost        = false;
    this.btnPut         = true;

    console.log(1)
    setTimeout(()=>{
      let yy = document.getElementById('boxImg') as HTMLDivElement
      console.log(yy);
      yy.style.backgroundImage = `url(${this.picc_servicio})`;
    },1000)
    console.log(2)
    this.changeModsView(true, false, '#361E45', '#5C277B', '#0EC9BB', 'whitesmoke', false);
    // this.changeModsView(false, true, '#361E45', '#5C277B', 'whitesmoke', '#0EC9BB', false);
    console.log(3)
  }

  public arrProdImg: any = [];
  getImg(ccia: string,cprod: string) {
    this._show_spinner = true;
    this.Prod.getImgProds(ccia,cprod).subscribe(
      x => {

        this.arrProdImg = x;
        // console.log(x)
        this.picc_servicio = this.arrProdImg[0].img_prods;
        this._show_spinner = false;

      }
    )
  }

  asignCompany( companie: string, ncomp: string ) {
    sessionStorage.setItem('Companies',      companie);
    sessionStorage.setItem('Name-Companies', ncomp);
    this.labelMessage = ncomp;
    this.getProducts(75, 'cod_prod', '_', 'asc', companie);
    this._lock = false;
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
