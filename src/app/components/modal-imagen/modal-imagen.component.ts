import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir! : File;
  public imgTemp : any;



  constructor( public modalImagenService : ModalImagenService, private fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal()
  {
    
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
    
  }

  async cambiarImagen( $event : Event )
  {

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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, id || '' )
    .then( img => {
      Swal.fire( 'Actualizado', 'La imagen fue actualizada satisfactoriamente.', 'success');

      this.modalImagenService.nuevaImagen.emit( img );
      
      this.cerrarModal();
    })
    .catch( err => console.log( err ));
  }


}
