import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateprodService {

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'ProdCreate/'

  constructor( public http:HttpClient ) { }

  saveCreateProds( model: any [] ) {
    return this.http.post( this.apiUrl + 'SaveProds', model );
  }

  // SelProdCreate/
  getCreateProds( ccia: string, nprods: string ) {
    return this.http.get( this.apiUrl + 'SelProdCreate/' + nprods + '/' + ccia );
  }

  delCreateProds( cprov: string, codServs: string, codProd: string, id: number ) {
    return this.http.get( this.apiUrl + 'DelProdCreate/' + cprov + '/' + codServs + '/' + codProd + '/' + id );
  }

}
