import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir! : File;
  public imgTemp : any;


  constructor( public modalImagenService : ModalImagenService ) { }

  ngOnInit(): void {
  }

  cerrarModal()
  {
    
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
    
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


}
