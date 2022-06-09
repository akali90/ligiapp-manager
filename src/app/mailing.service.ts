import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  public env: any = environment;
  private apiUrl: any = this.env.apiUrl + 'mailing/'

  constructor(public http:HttpClient) { }

  sendEmail(model: any []) {

    // console.log(this.apiUrl);

    return this.http.post(this.apiUrl + 'MailSendSave', model);
  }

  verification(nomUser: string) {
    return this.http.get(this.apiUrl + ''+nomUser);
  }


}
