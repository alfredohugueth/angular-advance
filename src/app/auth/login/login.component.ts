import { Component, NgZone, OnInit } from '@angular/core';
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
               private usuarioService : UsuarioService,
               private ngZone : NgZone) { }
  async ngOnInit() {

    await this.renderButton();
  
  }
  
  login(){
    
    /* Petición post a wbs para verificar usuario */
    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {
                          
                          /* Recordar contraseña */
                          if ( this.loginForm.get( 'remember' )?.value ) {

                            localStorage.setItem( 'Email', this.loginForm.get( 'email' )?.value );
                          
                          } else {

                            localStorage.removeItem( 'Email' );

                          }
                          
                          // Navegar a Dashboard
                          this.router.navigateByUrl('/');
                        
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

  async startApp() {
    
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    
    this.attachSignin(document.getElementById('google_btn'));
  };

   attachSignin( element : any ) {
    this.auth2.attachClickHandler(element, {},
        ( googleUser : any) => {
          
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle( id_token )
            .subscribe( resp => {

              this.ngZone.run( () => {

                // Navegar a Dashboard
                this.router.navigateByUrl('/');

              })

            });

        
        }, ( error : any ) => {
          
          alert(JSON.stringify(error, undefined, 2));
        
        });
  }





}
