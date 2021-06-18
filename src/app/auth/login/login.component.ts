import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public loginForm = this.fb.group({
    
    email : [ 'test100@gmail.com', [ Validators.required, Validators.minLength(3), Validators.email ] ],
    password : [ '123456', [ Validators.required, Validators.minLength(3) ]],
    remember : [false]

  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService : UsuarioService) { }
  
  login(){
    
    console.log(this.loginForm.value)
    // this.router.navigateByUrl('/');
    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {

                          console.log(resp);
                        
                        }, (err) => {

                          Swal.fire( 'Error', err.error.msg, 'error' );

                        })

  }

}
