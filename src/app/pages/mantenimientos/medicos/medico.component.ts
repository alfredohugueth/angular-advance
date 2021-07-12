import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

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

  constructor( private fb : FormBuilder, private hospitalService : HospitalService ) { }

  ngOnInit(): void 
  {
    this.medicoForm = this.fb.group({
      nombre : [ 'Alfredo', Validators.required],
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
  }

  cargarHospitales()
  {

    this.hospitalService.cargarHospitales()
    .subscribe( ( hospitales : Hospital[] ) =>
    {
      console.log( hospitales );
      this.hospitales = hospitales;
    })
  
  }

}
