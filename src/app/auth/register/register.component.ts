import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    
    nombre : [ 'Fernando', [ Validators.required, Validators.minLength(3) ] ],
    email : [ 'test100@gmail.com', [ Validators.required, Validators.minLength(3) ] ],
    password : [ '1234567', [ Validators.required, Validators.minLength(3) ]],
    password2 : [ '1234567', [ Validators.required, Validators.minLength(3) ]],
    terminos: [ false, [ Validators.required, Validators.minLength(3) ]]

  });


  constructor( private fb: FormBuilder) { }

  crearUsuario() {
    console.log( this.registerForm.value );
  }

  

}
