import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpModsService {

  constructor() { }

  LigiPopUp( ObjectFather:string,
             type:string,
             classDiv:string,
             titleStyle: string,
             titleParagraph: string,
             subTitleStyle: string,
             subTitleParagraph: string,
             paragraphStyle: string,
             pa:string, pb: string, pc:string,
             img: string,
             paData: string, pbData: string, pcData: string ) {

    let ObjectChild: string = '';
    let xObject: any = document.getElementById(ObjectFather) as HTMLDivElement;
    if( type=='Maestros' ) {
        ObjectChild = `
          <div class="${classDiv}">
            ${img}
            <div style="${titleStyle}">
              ${titleParagraph}
            </div>
            <div style="${subTitleStyle}">
            ${subTitleParagraph}
            </div>
            <div style="${paragraphStyle}">
              <div style="${pa}">${paData}</div>
              <div style="${pb}">${pbData}</div>
              <div style="${pc}">${pcData}</div>
            <div>
          </div>
        `

      xObject.innerHTML = ObjectChild;

    }
  }

}
