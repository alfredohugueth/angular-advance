import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    
    nombre : [ 'Alfredo', [ Validators.required, Validators.minLength(3) ] ],
    email : [ 'test100@gmail.com', [ Validators.required, Validators.minLength(3), Validators.email ] ],
    password : [ '', [ Validators.required, Validators.minLength(3) ]],
    password2 : [ '', [ Validators.required, Validators.minLength(3) ]],
    terminos: [ false, [ Validators.required, Validators.minLength(3) ]]

  });


  constructor( private fb: FormBuilder) { }

  crearUsuario() {
    
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.valid ) {
      
      console.log(' ----> Posteando formulario ');
    
    } else {

      console.log(' ----> Formulario no valido ');

    }
  
  }

  campoNoValido( campo: string ) : boolean {

    if ( this.registerForm.get( campo )?.invalid && this.formSubmitted ) {
      
      return true;
    
    } else {

      return false;
      
    }

  }

  aceptaTerminos () {

    return !this.registerForm.get( 'terminos' )?.value && this.formSubmitted;

  }

  

}
