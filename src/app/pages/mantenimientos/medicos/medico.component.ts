import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm! : FormGroup;
  public hospitales! : Hospital[];

  public hospitalSeleccionado! : Hospital | undefined;
  public medicoSeleccionado! : Medico;

  constructor( private fb : FormBuilder, 
               private hospitalService : HospitalService, 
               private medicoService : MedicoService, 
               private router : Router,
               private activatedRoute : ActivatedRoute ) { }

  ngOnInit(): void 
  {
    // Buscamos el parametro del ID del medico en la url
    this.activatedRoute.params
        .subscribe( ( { id } ) => this.cargarMedico( id ) );

    this.medicoForm = this.fb.group({
      nombre : [ '', Validators.required],
      hospital : [ '', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalID => 
          {
            
            this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalID );

          })

  }

  guardarMedico()
  {
    console.log( this.medicoForm.value );
    this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp : any ) => 
          {
            console.log( resp );
            Swal.fire( 'Creado', `${ this.medicoForm.value.nombre } creado correctamente`, 'success');
            this.router.navigateByUrl( `/dashboard/medico/${ resp.medico._id}`)

          })
  }

  cargarHospitales()
  {

    this.hospitalService.cargarHospitales()
    .subscribe( ( hospitales : Hospital[] ) =>
    {
      this.hospitales = hospitales;

    })
  
  }

  private cargarMedico( id : string )
  {

    this.medicoService.obtenerMedicoPorID( id )
        .subscribe( medico => 
          {
            
            this.medicoSeleccionado = medico;
            
          })
  }

}
