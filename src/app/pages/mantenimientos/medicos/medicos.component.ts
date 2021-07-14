import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos! : Medico[];
  public medicosTemp! : Medico[];
  public imgSubs! : Subscription;

  constructor( private medicosServices : MedicoService, private modalImageService : ModalImagenService, private busquedaService : BusquedasService ) { }

  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();
  
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe( img => 
      {
        
        this.cargarMedicos();

      })


  }

  cargarMedicos()
  {
    this.cargando = true;
    this.medicosServices.cargarMedicos()
    .subscribe(
      ( res ) => 
      {

        this.cargando = false;
        this.medicos = res;
        this.medicosTemp = this.medicos

      }
    )

  }

  abrirModal( medico : Medico )
  {

    this.modalImageService.abrirModal( 'medicos', medico._id, medico.img );

  }

  buscar( termino : string )
  {
    if ( termino.length == 0 )
    {

      this.medicos = this.medicosTemp;

    } 
    else 
    {
      this.busquedaService.buscar( 'medicos', termino )
                        .subscribe(
                          (resp : any) => {

                            this.medicos = resp;
                          
                          }
                        )

    }
    
  }

  borrarMedico( medico : Medico )
  {

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de eliminar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) 
      {

        this.medicosServices.borrarMedico( medico._id )
                           .subscribe( resp => 
                            {

                             this.cargarMedicos();
                             
                            Swal.fire( 'Médico Borrado',
                                         `${ medico.nombre } fue eliminado correctamente`,
                                         'success'
                          
                                      )
                          
                            }
                          )
      }
    })


  }

}
