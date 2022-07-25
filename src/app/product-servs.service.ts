import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductServsService {

  public env: any = environment;
  private apiUrl: any = this.env.apiUrl;

  constructor( private http: HttpClient ) { }

  savProds(model: any []) {
    return this.http.post(this.apiUrl + 'ProdMast/SaveProdMast',  model);
  }

  putProds(id: number, model: any []) {
    return this.http.put(this.apiUrl + 'ProdMast/PutProdMaster/' + id, model);
  }

  // getProds(top:number, properties:string, data:string, order:string, ccia: string) {
  //   return this.http.get( this.apiUrl + 'ProdMast/SelProdMaster/'+top+'/'+properties+'/'+data+'/'+order+'/'+ccia )
  // }

  //SelProdMaster/{ccia}/{tipo}/{ord}/{nprod}
  getProds(ccia: string, tipo: number, ord: string, nprod: string ) {
    return this.http.get( this.apiUrl + 'ProdMast/SelProdMaster/'+ccia+'/'+tipo+'/'+ord+'/'+nprod )
  }

  getImgProds( ccia: string, cprod: string) {
    return this.http.get( this.apiUrl + 'ProdMast/SelImgMaster/' + ccia + '/' + cprod )
  }

  delProds( id:number ) {
    return this.http.get( this.apiUrl + 'ProdMast/DelProdMaster/' + id );
  }

}

