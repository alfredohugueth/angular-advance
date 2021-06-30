import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

}
