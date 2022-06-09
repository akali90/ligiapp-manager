import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor( private http: HttpClient ) { }

  public env: any = environment
  private apiUrl: any = this.env.apiUrl

  getModules(estado:number) {
    return this.http.get( this.apiUrl + 'ModTab/sel_ModTab/' + estado )
  }

  ordModules( modulo: string ) {
    return this.http.get( this.apiUrl + 'ModTab/exec_ModTab/' + modulo);
  }

}
