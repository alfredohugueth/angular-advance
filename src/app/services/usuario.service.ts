/* Angular Components and Materials */
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";

/* Interfaces */
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi : any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2 : any;
  public usuario : Usuario ;

  constructor( private http : HttpClient, private router : Router, private ngZone : NgZone) 
  { 
      this.googleInit();
      this.usuario = new Usuario( 'nombre', 'email', '', 'img', false , 'user', 'uid');
      
  }

  get token() : string
  {

    return localStorage.getItem( 'token' ) || 'NoValido';
  
  }

  get uid() : string
  {

    return this.usuario.uid || '';

  }

  get headers()
  {
    return {
      headers : {
      
        'x-token' : this.token
      
      }
    }
  }

  validarToken() : Observable<boolean> {


    console.log('Se procede a validar el token ');

    return this.http.get( `${base_url}/login/renew`, {
      headers : {
      
        'x-token' : this.token
      
      }
    }).pipe(
      tap( (resp : any) => {

        console.log( 'Recibimos la respuesta del servidor: ', resp);

        /* Definimos las propiedades del usuario */
        const {
          email,
          google,
          nombre,
          role,
          img,
          uid
        } = resp [ 'usuario' ];

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
        
        localStorage.setItem( 'token', resp[ 'token' ] );
        console.log( this.usuario );

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

  async logout() {

    localStorage.removeItem( 'token' );

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {

        this.router.navigateByUrl( '/login' );
      
      })
    });

  }

  async googleInit() {

    return new Promise<void>( resolve  => {

      console.log( 'Google Init ');

      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '285988215249-g49qcb1l7dc0dkv4koivefvnl6ee4h03.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
  
        resolve();
      });

    })


  }

  actualizarPerfil( data : { email : string, nombre : string, role : string | undefined } )
  {

    data = {
    
      ...data,
      role : this.usuario.role
    
    };

    return this.http.put( `${base_url}/usuarios/${ this.uid }`, data, { headers : {
      
      'x-token' : this.token
    
    }} )
    
  }

  cargarUsuarios( desde : number = 0 )
  {
    return this.http.get<cargarUsuario>( `${ base_url}/usuarios?desde=${ desde }`, this.headers )
                    .pipe(                      
                      map( resp => {
                        const usuarios = resp.usuarios.map( user => new Usuario( 
                          user.nombre, 
                          user.email, 
                          '',
                          user.img,
                          user.google,
                          user.role,
                          user.uid
                          ))
                        return {
                          total : resp.total,
                          usuarios
                        };
                      })
                    )
  }
}
