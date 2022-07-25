import { Component, OnInit } from '@angular/core';
import { ProductServsService } from 'src/app/product-servs.service';
import { TbInvEnitityService } from '../../services/tb-inv-enitity.service';

@Component({
  selector: 'app-mod-inv',
  templateUrl: './mod-inv.component.html',
  styleUrls: ['./mod-inv.component.scss']
})
export class ModInvComponent implements OnInit {

  public xtoken: any = sessionStorage.getItem('Token');
  public xCia: any = sessionStorage.getItem('Companies');


  public _bool_ing_prod: boolean = false;
  public _mov_prod: boolean = false;
  public _crea_bod: boolean = false;
  public _bool_inv: boolean = false;

  constructor( private Prod: ProductServsService, public tbentity: TbInvEnitityService ) { }

  ngOnInit(): void {
  }

  public subArrMod: any = [{

    name: 'Ingreso de productos',
    icon: 'add_circle',
    description: `Ingresa productos a tu inventario (creados con anticipación en tu maestro de productos), para poder realizar otros
                  procesos que generen movimientos del mismo.`

  },
  {

    name: 'Movimiento de productos',
    icon: 'move_down',
    description: `Mueve productos entre tus bodegas digitales.`

  },

  {

    name: 'Crear Bodegas',
    icon: 'add_home_work',
    description: `Crea bodegas digitales que te ayuden a claseficar tus productos, y agilizar su busqueda más adelante.`

  },
  {

    name: 'Mi inventario',
    icon: 'assignment',
    description: `Revisa tu inventario y genera reportes`

  }
]


public _show_spinner: boolean = false;
  public cantProducts: number = 0;
  public arrProducts: any = [];
  getProducts( ccia: string, tipo: number, ord: string, nprod: string ) {

    // console.log(ccia);

    this.Prod.getProds(ccia, tipo, ord, nprod).subscribe({
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


  public arrInv: any = [];
  getInv(tokenUs: string, codCia: string) {
    this.tbentity.getInv(tokenUs, codCia).subscribe( inv => {
      this.arrInv = inv;
      console.log(this.arrInv);
    }, () => {
      console.warn('Error 505, problemas al caargar el inventario');
    })
  }

  public modInvArr: any = [];
  saveInv(cod_prod: string, prec_compra: string, prec_venta: string, prov: string, med: string, stock: string) {

    this.modInvArr = {
      // id
      cod_prod: cod_prod,
      prec_compra: prec_compra,
      prec_venta: prec_venta,
      stock: stock,
      medicion: med,
      fecha_ing: new Date(),
      token_us:  this.xtoken,
      cod_cia: this.xCia,
      cod_prov: prov

    }

    console.log(this.modInvArr);

  }

}
