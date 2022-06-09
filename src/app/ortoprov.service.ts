import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrtoprovService {

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'OrtoProv/'

  constructor( private http: HttpClient ) { }

  saveProveedor( model: any [] ) {
    return this.http.post( this.apiUrl + 'SaveProv', model )
  }

  //{tipo}/{properties}/{data}/{order}
  getProv( tipo: string, properties: string, data: string, order: string, ccia:string ) {
    return this.http.get( this.apiUrl + 'selProveedores/' + tipo + '/' + properties + '/' + data + '/' + order + '/' + ccia );
  }

  delProv( codec: string ) {
    return this.http.get( this.apiUrl + 'DELProveedores/'+ codec );
  }

  updateProv( id: number, model: any [] ) {
    return this.http.put( this.apiUrl + 'PutProveed/'+id, model)
  }

  // SaveServ( model: any [] ) {
  //   return this.http.post( this.apiUrl + 'SaveServs', model )
  // }

  // getServ( codec: string ) {
  //   return this.http.get( this.apiUrl + 'selServicios' + codec )
  // }



}
