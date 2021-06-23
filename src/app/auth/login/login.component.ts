import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2 : any;

  public loginForm = this.fb.group({
    
    email : [ localStorage.getItem( 'Email' ) || '', [ Validators.required, Validators.minLength(3), Validators.email ] ],
    password : [ '', [ Validators.required, Validators.minLength(3) ]],
    remember : [false]

  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService : UsuarioService) { }
  async ngOnInit() {

    await this.renderButton();
  
  }
  
  login(){
    
    /* Recordar contraseña */
    if ( this.loginForm.get( 'remember' )?.value ) {

      localStorage.setItem( 'Email', this.loginForm.get( 'email' )?.value );
    
    } else {

      localStorage.removeItem( 'Email' );

    }

    /* Petición post a wbs para verificar usuario */
    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {

                          console.log(resp);
                        
                        }, (err) => {

                          Swal.fire( 'Error', err.error.msg, 'error' );

                        })

  }

  //   // var id_token = googleUser.getAuthResponse().id_token;


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    
    this.startApp();

  }

  startApp() {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '285988215249-g49qcb1l7dc0dkv4koivefvnl6ee4h03.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });

      this.attachSignin(document.getElementById('google_btn'));
    
    });
  };

   attachSignin( element : any ) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        ( googleUser : any) => {
          
          const id_token = googleUser.getAuthResponse().id_token;
          console.log('----> El token de google generado es: ', id_token);
          this.usuarioService.loginGoogle( id_token ).subscribe();

          // TODO: Mover al dashboard
        
        }, ( error : any ) => {
          
          alert(JSON.stringify(error, undefined, 2));
        
        });
  }





}
