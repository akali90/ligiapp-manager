import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionalEntitiesService {


  public env: any = environment
  private apiUrl: any = this.env.apiUrl + 'TranSac/'

  constructor( private http: HttpClient ) { }

  //save_TraCab
  saveCab( model: any [] ) {
    this.http.post( this.apiUrl + 'save_TraCab', model )
  }

  //save_TraDet
  saveDet( model: any [] ) {
    return this.http.post( this.apiUrl + 'save_TraDet', model )
  }

  //sel_TranCab
  getCab(tokenus: string, estado: number, codCia: string, codCli: string) {
    return this.http.get( this.apiUrl + 'sel_TranCab/' + tokenus + '/' + estado + '/' + codCia + '/' +codCli )
  }

  //sel_TranDet
  getDet(codCia: string, trnType: string, trnNumber: string, codCli: string) {
    return this.http.get( this.apiUrl + 'sel_TranCab/' + trnType + '/' + trnNumber + '/' + codCia + '/' +codCli )
  }

  //PutTranCab
  updateCab(model: any [], trnType: string, trnNumber: string, token_us: string) {
    return this.http.put( this.apiUrl + 'PutTranCab/'+trnType+'/'+ trnNumber + '/' + token_us, model )
  }

  //PutTranDet
  updateDet(model: any [], trnType: string, trnNumber: string, token_us: string) {
    return this.http.put( this.apiUrl + 'PutTranDetail/'+trnType+'/'+ trnNumber + '/' + token_us, model )
  }


}
