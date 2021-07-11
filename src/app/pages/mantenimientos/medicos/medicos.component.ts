import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos! : Medico[];

  constructor( private medicosServices : MedicoService, private modalImageService : ModalImagenService ) { }

  ngOnInit(): void {

    this.cargarMedicos();

  }

  cargarMedicos()
  {
    this.cargando = true;
    this.medicosServices.cargarMedicos()
    .subscribe(
      ( res ) => 
      {

        this.cargando = false;
        console.log( res );
        this.medicos = res;

      }
    )

  }

  abrirModal( medico : Medico )
  {

    this.modalImageService.abrirModal( 'medicos', medico._id, medico.img );

  }

}
