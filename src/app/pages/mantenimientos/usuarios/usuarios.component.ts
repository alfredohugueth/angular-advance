import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = [];
  public desde : number = 0;
  public cargando : boolean = true;
  public usuariosTemp : Usuario[] = [];
  constructor( private usuarioService : UsuarioService, private busquedaService : BusquedasService ) 
  { }

  ngOnInit(): void 
  {
    this.cargarUsuarios();
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
  
      console.log( 'eliminando' )
      return Swal.fire({
        title: '¿Borrar Usuario?',
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
    console.log( usuario );
    this.usuarioService.guardarUsuario( usuario )
                       .subscribe( resp => 
                        {
                          
                          console.log( resp );

                        })
  }

}
