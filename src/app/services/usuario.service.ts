/* Angular Components and Materials */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";

/* Interfaces */
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http : HttpClient ) { }

  validarToken() : Observable<boolean> {

    const token = localStorage.getItem( 'token' ) || 'NoValido';

    console.log('Se procede a validar el token ');

    return this.http.get( `${base_url}/login/renew`, {
      headers : {
      
        'x-token' : token
      
      }
    }).pipe(
      tap( (resp : any) => {

        console.log( 'Recibimos la respuesta del servidor: ', resp);
        localStorage.setItem( 'token', resp[ 'token' ] );

      }),
      map( resp => true ),
      catchError( error => of(false))
    );

  }

  crearUsuario( formData : RegisterForm ) : Observable<any> {

    console.log('-----> Creando al Usuario ');
    
    return this.http.post( `${base_url}/usuarios`, formData )
                    
                    .pipe(
                      tap( (res : any) => {

                        localStorage.setItem( 'token', res[ 'token' ] );

                      })
                    )
 }

  login( formData : LoginForm ) : Observable<any> {

    console.log('-----> Logeando al Usuario ');
    
    return this.http.post( `${base_url}/login`, formData )
                  
                    .pipe(
                    
                      tap( (res : any) => {
                        
                        localStorage.setItem( 'token', res[ 'token' ] );

                      })
                    
                    )
    
  }

  loginGoogle( token : string ) : Observable<any> {

    console.log('-----> Logeando al Usuario ');
    
    return this.http.post( `${base_url}/login/google`, { token } )
                  
                    .pipe(
                    
                      tap( (res : any) => {
                        
                        localStorage.setItem( 'token', res[ 'token' ] );

                      })
                    
                    )
    
  }
}
