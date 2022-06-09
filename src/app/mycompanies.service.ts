import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MycompaniesService {


  constructor( private http: HttpClient ) { }

  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'dcias/'

  saveCompanies(model:any[]) {
    return this.http.post( this.apiUrl + 'SaveDascias', model );
  }

  putCompanies( id: number, model: any [] ) {
    return this.http.put( this.apiUrl + 'PutDascias/' + id, model );
  }

  //LAST
  // getCompanies(properties: string, data: string, order: string) {
  //   return this.http.get(this.apiUrl + 'SelDascias/' + properties + '/' + data + '/' + order);
  // }

  getCompanies(coduser: string) {
    return this.http.get(this.apiUrl + 'SelDascias/' + coduser );
  }


  delCompanies( id: number ) {
    return this.http.get( this.apiUrl + 'DelDascias/' + id );
  }


}
