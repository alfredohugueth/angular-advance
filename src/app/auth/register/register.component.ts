import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

// import swal from 'sweetalert'; 

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
    password : [ '123456', [ Validators.required, Validators.minLength(3) ]],
    password2 : [ '123456', [ Validators.required, Validators.minLength(3) ]],
    terminos: [ true, [ Validators.required, Validators.minLength(3) ]]

  }, {
    validators: this.passwordsIguales( 'password', 'password2')
  });


  constructor( private fb: FormBuilder,
               private usuarioService : UsuarioService ) { }

  crearUsuario() {
    
    this.formSubmitted = true;

    console.log( this.registerForm);

    if ( this.registerForm.invalid ) {
      
          return

    }
    
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( res => {
          
          console.log( 'Usuario Creado' );
          console.log(' -------> El usuario creado es: ', res);

        }, (err) => console.log( 'Error creando el usuario: ', err.error.msg ));
  
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

  contrasenasNoValidas() {

    const pass1 = this.registerForm.get( 'password' )?.value;
    const pass2 = this.registerForm.get( 'password2' )?.value;

    /* Verificamos que ambas sean iguales */
    if ( pass1 == pass2 ) {
      
      return false;

    } else {
      
      return true;

    }

  }

  passwordsIguales( password1 : string, password2 : string) : Function {

    return ( formGroup : FormGroup ) => {

      const pass1Control = formGroup.get( password1 );
      const pass2Control = formGroup.get( password2 );

      /* Verificamos que sean iguales las contraseñas */
      if ( pass1Control?.value === pass2Control?.value ) {

        pass2Control?.setErrors( null );

      } else {

        pass2Control?.setErrors({ noEsIgual : true });

      }
    }
  }

  

}
