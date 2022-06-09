import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }

  fade(object:string, option: string, url:string) {

    switch(option) {
      case 'IN':

        break;
      case 'OUT':
        break;
    }
  }

}

