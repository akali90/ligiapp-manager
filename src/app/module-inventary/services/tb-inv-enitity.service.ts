import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TbInvEnitityService {

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'tbinv/'

  constructor( private http: HttpClient ) { }

  getInv( tokenus: string, codCia: string ) {
    return this.http.get( this.apiUrl + 'sel_Tbinv/' + tokenus + '/' + codCia );
  }

  saveInv(model: any) {
    return this.http.post( this.apiUrl + 'save_TbInv', model );
  }

  putInv(model: any, id: number) {
    return this.http.put( this.apiUrl + 'Put_TbInv/' + id, model );
  }

  delInv(id:string) {
    return this.http.get( this.apiUrl + 'del_Tbinv/' + id );
  }

}
