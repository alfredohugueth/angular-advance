import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http : HttpClient ) 
  { }

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

  buscar ( tipo : 'usuarios' | 'medicos' | 'hospitales',
          termino : string )
  {
    return this.http.get<cargarUsuario>( `${ base_url}/todo/coleccion/${ tipo }/${ termino }`, this.headers )
                    .pipe(
                      map( ( resp : any ) =>  resp.resultados 
                        
                      )
                    )

  }

}
