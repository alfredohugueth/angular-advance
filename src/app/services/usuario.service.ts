/* Angular Components and Materials */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from "rxjs/operators";

/* Interfaces */
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http : HttpClient ) { }

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
}
