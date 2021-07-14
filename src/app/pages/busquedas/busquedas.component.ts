import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios : Usuario[] = [];
  public medicos : Medico[] = [];
  public hospitales : Hospital[] = [];


  constructor( private activatedRoute : ActivatedRoute,
               private busquedaService : BusquedasService,
               private router : Router ) { }

  ngOnInit(): void 
  {

    this.activatedRoute.params
      .subscribe( ({ termino }) => 
        {

          this.busquedaGlobal( termino );

        })
  }


  busquedaGlobal( termino : string )
  {

    this.busquedaService.buscarGlobal( termino )
      .subscribe( (resp : any ) => 
        {
          console.log( 'La respuesta del servidor fue ----> ',resp );
          this.usuarios = resp.usuario_busqueda;
          this.medicos = resp.medico_busqueda;
          this.hospitales = resp.hospital_busqueda;

        })
  }

  abrirMedico( medico : Medico )
  {

    this.router.navigateByUrl( `/dashboard/medico/${ medico._id }`);

  }

}
