import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = [];
  public desde : number = 0;
  public cargando : boolean = true;
  public usuariosTemp : Usuario[] = [];

  public imgSubs! : Subscription;

  constructor( private usuarioService : UsuarioService, private busquedaService : BusquedasService, private modalImageService : ModalImagenService ) 
  { }

  ngOnDestroy(): void {
    
    this.imgSubs.unsubscribe();
    
  }

  ngOnInit(): void 
  {
    this.cargarUsuarios();

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => 
      {
        
        this.cargarUsuarios();

      })
  }

  cambiarPagina( valor : number )
  {
    this.desde += valor;

    if ( this.desde < 0 )
    {
      this.desde = 0;
    } 
    else if (this.desde >= this.totalUsuarios )
    {
      this.desde -= valor;
    }

    this.cargarUsuarios();


  }

  cargarUsuarios()
  {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
                       .subscribe( ({ total, usuarios }) => {
                          this.totalUsuarios = total;
                          if ( usuarios.length !== 0)
                          {

                            this.usuarios = usuarios;                         
                            this.cargando = false;
                            this.usuariosTemp = usuarios;

                          }
                       })
    
  }

  buscar( termino : string)
  {
    if ( termino.length == 0 )
    {

      this.usuarios = this.usuariosTemp;

    } 
    else 
    {
      this.busquedaService.buscar( 'usuarios', termino )
                        .subscribe(
                          (resp : any) => {
                            this.usuarios = resp;
                          }
                        )

    }
    
  }

  eliminarUsuario( usuario : Usuario )
  {

    /* Verificamos que no se elimine el usuario actual */
    if ( usuario.uid === this.usuarioService.uid )
    {
      return Swal.fire( 'Error','No puede borrar a ese usuario ', 'error')
    }
  
      return Swal.fire({
        title: '??Borrar Usuario?',
        text: `Esta a punto de eliminar a ${ usuario.nombre }`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo'
      }).then((result) => {
        if (result.isConfirmed) 
        {
  
          this.usuarioService.eliminarUsuario( usuario )
                             .subscribe( resp => 
                              {
  
                               this.cargarUsuarios();
                               
                              Swal.fire( 'Usuario Borrado',
                                           `${ usuario.nombre } fue eliminado correctamente`,
                                           'success'
                            
                                        )
                            
                              }
                                      )
        }
      })

    
  }

  cambiarRole( usuario : Usuario )
  {
    this.usuarioService.guardarUsuario( usuario )
                       .subscribe( resp => 
                        {
                          
                          console.log( resp );

                        })
  }

  abrirModal( usuario : Usuario )
  {
    this.modalImageService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }
}
