import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrtoservService {

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'Ortoservs/'

  constructor( private http: HttpClient ) { }

  savServs(model: any []) {
    return this.http.post( this.apiUrl + 'SaveServs', model );
  }

  getServs(cprov: string, properties:string, data:string, order: string) {
    return this.http.get( this.apiUrl + 'SelServicios/' + cprov + '/' + properties + '/' + data + '/' + order );
  }

  putServs(id:number, model: any []) {
    return this.http.put( this.apiUrl + 'PutServs/'+id, model )
  }

  delServs( id: number ) {
    return this.http.get( this.apiUrl + 'DelServicios/' + id );
  }

}
