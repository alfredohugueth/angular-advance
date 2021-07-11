import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public base_url : string = environment.base_url;

  constructor( private http : HttpClient ) { }

  get token() : string
  {

    return localStorage.getItem( 'token' ) || 'NoValido';
  
  }

  get headers()
  {
    return {
      headers : {
      
        'x-token' : this.token
      
      }
    }
  }

  // Servicio de listado de médicos
  cargarMedicos ( desde : number = 0 )
  {

    return this.http.get( `${ this.base_url }/medicos`, this.headers)
                    .pipe(
                      
                      map( (res : any) => res.medicos )

                    )
  }


  crearMedico ( medico : Medico )
  {

    return this.http.post( `${ this.base_url}/medicos`, medico  ,this.headers )
                    
                
  }

  actualizarMedico ( medico : Medico )
  {

    return this.http.put( `${ this.base_url}/medicos/${ medico._id }`, medico ,this.headers )
                    
                
  }

  borrarMedico ( _id : string )
  {

    return this.http.delete( `${ this.base_url}/medicos/${ _id }`, this.headers )
                    
                
  }
  

}
