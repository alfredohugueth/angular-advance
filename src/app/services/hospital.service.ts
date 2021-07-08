import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { creationHospital, hospitalResponse } from '../interfaces/backend-response';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  
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

  cargarHospitales ( desde : number = 0 )
  {

    return this.http.get<hospitalResponse>( `${ base_url}/hospitales`, this.headers )
                    .pipe(
                      map( ( res : hospitalResponse ) => res.hospitales )
                    )
                
  }

  crearHospital ( nombre : string )
  {

    return this.http.post<creationHospital>( `${ base_url}/hospitales`, { nombre } ,this.headers )
                    
                
  }

  actualizarHospital ( _id : string, nombre : string )
  {

    return this.http.put<creationHospital>( `${ base_url}/hospitales/${ _id }`, { nombre } ,this.headers )
                    
                
  }

  borrarHospital ( _id : string )
  {

    return this.http.delete<creationHospital>( `${ base_url}/hospitales/${ _id }`, this.headers )
                    
                
  }

  

}
