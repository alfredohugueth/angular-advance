import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales : Hospital[] = [];
  public cargando : boolean = true;
  public imgSubs! : Subscription;
  public hospitalesTemp! : Hospital[];


  constructor( private hospitalService : HospitalService, private modalImageService : ModalImagenService, private busquedaService : BusquedasService ) { }

  ngOnDestroy(): void {
    
    this.imgSubs.unsubscribe()
    
  }

  ngOnInit(): void 
  {

    this.cargarHospitales();

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe( img => 
      {
        
        this.cargarHospitales();

      })

  }

  cargarHospitales()
  {
    
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => 
          {
            this.cargando = false;
            this.hospitales = hospitales;
            this.hospitalesTemp = hospitales;
          })

  }

  guardarCambios( hospital : Hospital )
  {
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
    .subscribe( res => 
      {

        this.cargarHospitales();
        Swal.fire( 'Actualizado', `Se actualizo el hospital con nombre ${ hospital.nombre }`, 'success' );

      })
  }

  eliminarHospital( hospital : Hospital )
  {
    this.hospitalService.borrarHospital( hospital._id )
    .subscribe( res => 
      {
        
        Swal.fire( 'Borrado', `Se Borro el hospital con nombre ${ hospital.nombre }`, 'success' );
        this.cargarHospitales();

      })
  }

  async abrirSweetAlert()
  {
    const { value = '' } = await Swal.fire<string>({
      title : 'Crear Hospital',
      text : 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton : true
    })
    
    if ( value?.trim().length )
    {
      this.hospitalService.crearHospital( value )
      .subscribe( res => 
        {
          
          this.hospitales.push( res.hospital );

        })
    }

  }

  abrirModal( hospital : Hospital)
  {

    this.modalImageService.abrirModal( 'hospitales', hospital._id, hospital.img );

  }

  buscar( termino : string)
  {
    if ( termino.length == 0 )
    {

      this.hospitales = this.hospitalesTemp;

    } 
    else 
    {
      this.busquedaService.buscar( 'hospitales', termino )
                        .subscribe(
                          (resp : any) => {

                            this.hospitales = resp;
                          
                          }
                        )

    }
    
  }

}
