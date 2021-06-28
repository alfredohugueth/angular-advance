import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm!: FormGroup;
  public usuario : Usuario;
  public imagenSubir! : File;

  constructor( private formBuilder : FormBuilder, private userService : UsuarioService, private fileUploadService : FileUploadService ) 
  { 

    this.usuario = userService.usuario;

  }

  ngOnInit(): void 
  {
    
    this.profileForm = this.formBuilder.group({

      nombre : [ this.usuario.nombre, Validators.required ],
      email : [ this.usuario.email, [Validators.required, Validators.email ] ]

    });

  }

  actualizarPerfil()
  {

    console.log( this.profileForm?.value );
    this.userService.actualizarPerfil( this.profileForm.value )
      .subscribe( () => {

        const { nombre, email} = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

      })

  }

  cambiarImagen( $event : Event )
  {

    console.log( $event );
    const target = ( $event.target as HTMLInputElement );
    const file = ( target.files as FileList)[0];

    /* Definimos los datos para enviar el archivo */
    this.imagenSubir =  file;


  }

  subirImagen()
  {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '' )
    .then( img => console.log( img ))
  }

}
