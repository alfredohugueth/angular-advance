import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm!: FormGroup;

  constructor( private formBuilder : FormBuilder, private userService : UsuarioService ) 
  { 

  }

  ngOnInit(): void 
  {
    
    this.profileForm = this.formBuilder.group({

      nombre : [ '123', Validators.required ],
      email : [ 'abc', [Validators.required, Validators.email ] ]

    });

  }

  actualizarPerfil()
  {

    console.log( this.profileForm?.value );
    this.userService.actualizarPerfil( this.profileForm.value )
      .subscribe( resp => {

        console.log( '-----> La respuesta del servidor a actualizar perfil es: ', resp );
        
      })

  }

}
