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

  onSuccess( googleUser : any ) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('----> El token generado fue: ', id_token );
    
  }

  onFailure( error : any ) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }




}
