import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokengenerateService {

  constructor() { }

  generateRandomString(num: number) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i: number = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;

  }

}
