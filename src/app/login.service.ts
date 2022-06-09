import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'UserLogin/'

  constructor( private http: HttpClient) { }

  Login( model: any [] ) {
    return this.http.post ( this.apiUrl + 'login', model )
  }

  saveUser(model: any []) {
    return this.http.post ( this.apiUrl + 'save_webuser', model )
  }

  validateRepeatuser(user:string) {
    return this.http.get( this.apiUrl + 'getUser/' + user );
  }

  private apiUrlB: any = this.env.apiUrl + 'mailing/'
  updateStateUser(nameUser: string,tokenUs: string, state: number) {
    return this.http.get(this.apiUrlB + 'UpdateState/' + nameUser+'/'+tokenUs+'/'+state);
  }

}

