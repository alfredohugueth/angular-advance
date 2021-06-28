import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
  public imgTemp : any;

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
        Swal.fire( 'Guardado', 'Cambios fueron guardados', 'success' )

      }, ( err ) => {
        Swal.fire( 'Error', err.error.msg, 'error' );

      })

  }

  async cambiarImagen( $event : Event )
  {

    console.log( $event );
    const target = ( $event.target as HTMLInputElement );
    const file = ( target.files as FileList)[0];

    /* Definimos los datos para enviar el archivo */
    this.imagenSubir =  file;

    if ( !file ) 
    {
      this.imgTemp = null
    } 
    else
    {
      
      const reader = new FileReader();
      reader.readAsDataURL( file );
  
      reader.onloadend = async() => {
        this.imgTemp = reader.result;
      }
      
    }
  }

  subirImagen()
  {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '' )
    .then( img => {
      this.usuario.img = img
      Swal.fire( 'Actualizado', 'La imagen fue actualizada satisfactoriamente.', 'success');
    })
    .catch( err => console.log( err ));
  }

}
