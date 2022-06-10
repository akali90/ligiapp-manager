import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { AnimationsService } from '../animations.service';
import { TokengenerateService } from '../tokengenerate.service';
import { MailingService } from '../mailing.service';
import {FormControl, Validators} from '@angular/forms';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public nameUs: string  = '';
  public passUs: string  = '';
  public rpassUs: string  = '';
  public hide:   boolean = true;

  constructor( private sendmail: MailingService, public Log: LoginService, public router: Router, public anim:AnimationsService, public tkn: TokengenerateService ) { }
  public x: any;
  public y: any;

  public log: boolean = true;
  public sign: boolean = false;

  public nameUsSign: string = '';

  ngOnInit(): void {

      this.x = sessionStorage.getItem('User');
      this.nameUs = this.x;
      this.y = sessionStorage.getItem('Token');

      this.verification();

      setInterval(()=>{
        this.hi();
      },1000)

      this.validatePassword(0);

      this.passUs = '';
      this.rpassUs = '';

   }

   public userRepeat: any = [];
   public xpasss: boolean = true;
   public xrpasss: boolean = true;
   public icon_su_rep: string = '';
   public _color_icon_rep: string = '';
   verificationRepeatUS(user: string) {
     this.Log.validateRepeatuser(user).subscribe({
      next: (x) => {
        this.userRepeat = x;
      }, error: ()=>{
        console.warn('Error (505)');
      }, complete: () => {
        if( this.userRepeat.length != 0 ) {
          // this.nameUsSign = '';

          this.xpasss = true;
          this.xrpasss = true;
          this.icon_su_rep = 'cancel';
          this._color_icon_rep = 'red';
          Swal.fire({
            icon: 'info',
            title: 'Esta cuenta ya existe',
            text: 'Prueba con un correo diferente, o logeate directamente.'
          })
          console.log(this.userRepeat);
          return

        } else {
          this.xpasss = false;
          this.xrpasss = false;
          this.icon_su_rep = 'done';
          this._color_icon_rep = 'yellowgreen';
        }
      }
     })
   }

   public arrEmail: any = [];
   sendMail(emailDestiny: string, asunto: string, contentBody: string) {
    this.arrEmail = {
      emailDestinity: emailDestiny,
      asunto: asunto,
      contentBody: contentBody
    }

      this.sendmail.sendEmail(this.arrEmail).subscribe( x => {
        console.log('Email enviado');
      }, () => {
        console.warn('Error al enviar el email');
      })

   }

   email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

   public arrUserSave: any = [];
   saveUserAccount() {

    this.arrUserSave = {
          nombre:   this.nameUsSign,
          password: this.passUs,
          DateInit: new Date(),
          token_us: this.nameUsSign.slice(0,5)+'-'+this.tkn.generateRandomString(10)+'-'+new Date().getFullYear(),
          tipo: 'S',
          license: 'prueba'
    }

    this.Log.saveUser(this.arrUserSave).subscribe({
      next: (x) => {
        console.log(x);
      },
      error: () => {
        console.warn('Algo ha sucedido error S-504');
      },
      complete: () => {


        /* EN LA PRÓXIMA VERSIÓN EJECUTAR EL LANZADOR DE EMAILS
        --------------------------------------------------------------------------------------*/
        // this.sendMail(
        //   'andrenimacion@gmail.com',
        //   'Autenticación de cuenta casi listo',
        //   'De click en el siguiente enlace para terminar el proceso de creación de cuenta'
        // )
        /*------------------------------------------------------------------------------------*/
        sessionStorage.setItem('User',  this.us.nombre);
        sessionStorage.setItem('Token', this.us.token_us);

        this.router.navigate(['/Dash']);

        Toast.fire({
          icon: 'success',
          title: '¡Tu cuenta ha sido creada con éxito!'
        });

      }
    }
    )

    // console.log(this.arrUserSave);

   }
   public saludo: string = '';
   hi() {
     let now = new Date()
     let hora = now.getHours()

    if( hora < 12 ) {
      this.saludo = 'Buenos días';
    }
    if( hora >= 12 && hora < 18) {
      this.saludo = 'Buenas tardes';
    }
    if( hora >= 18 && hora < 24) {
      this.saludo = 'Buenas noches';
    }

   }

   public dis_user_save: boolean = true;
   public colorbar: string = 'transparent';
   public textLog: string = '';
   public textLog2: string = '';
   public icon_re: string = '';
   public color_icon: string = '';
   validatePassword( type:number ) {

    switch( type ){
    case 0:

      if( this.passUs.length >= 0 && this.passUs.length <= 5 ) {
        this.textLog = 'Seguridad baja (' + this.passUs.length + ')';
        this.colorbar= 'red'
      }
      else if(this.passUs.length >= 6 && this.passUs.length <= 8) {
        this.textLog = 'Seguridad media (' + this.passUs.length + ')';
        this.colorbar= 'orange'
      }
      else if(this.passUs.length >= 9) {
        this.textLog = 'Seguridad alta (' + this.passUs.length + ')';
        this.colorbar= 'yellowgreen'
      }
      break;
    case 1:
      if( this.rpassUs == this.passUs ) {
        this.dis_user_save = false;
        this.icon_re = 'done';
        this.color_icon = 'yellowgreen';
        this.textLog2 = 'Coinciden (' + this.rpassUs.length + ')';
      }
      else {
        this.dis_user_save = true;
        this.icon_re = 'close';
        this.color_icon = 'red';
        this.textLog2 = 'No coinciden (' + this.rpassUs.length + ')';
      }
    }
   }

  choiceEnter(opt: boolean, opt2: boolean) {
    this.log = opt;
    this.sign = opt2;
  }

  public kus: any = [];
  public us: any = [];

   verification() {
     if( (this.x == '' && this.y == '') || (this.x == undefined && this.y == undefined) ) {
       console.log('No hay usuarios')
       this.router.navigate(['/Login']);
     } else {
      this.router.navigate(['/Dash']);
     }
   }

  Login() {

    this.kus = {
      nombre:   this.nameUs,
      password: this.passUs
    }

    // console.log(this.kus)
    this.Log.Login(this.kus).subscribe({
      next: (x) => {
        this.us= x;
      }, error: () => {
        Toast.fire({
          icon: 'error',
          title: '¡Algo ha pasado!'
        })
      },

      complete: () => {

        sessionStorage.setItem('User',  this.us.nombre);
        sessionStorage.setItem('Token', this.us.token_us);
        this.router.navigate(['/Dash']);

        Toast.fire({
          icon: 'success',
          title: '¡Haz accedido con éxito!'
        });

      }
    })
  }



  //esta funcion ubicar en un servicio
  public imgurl: string = '../../assets/pictures/success.png';
  public imgurlA: string = '../../assets/pictures/eating.png';
  fade(object:string, option: string) {
    let x:any = document.getElementById(object) as HTMLDivElement;
    switch(option) {
      case 'IN':
        this.imgurl = '../../assets/pictures/work.png';
        x.style.animation = 'fadeIn ease 2s 1';
        break;
      case 'OUT':
        this.imgurl = '../../assets/pictures/success.png';
        x.style.animation = 'fadeOut ease 2s 1';
        break;
    }
  }


}
