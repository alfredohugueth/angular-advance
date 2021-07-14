import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imgUrl : string | undefined = '' ;
  public usuario : Usuario;


  constructor( private userService : UsuarioService, 
               private router : Router ) 
  { 
    
    this.imgUrl = userService.usuario?.imagenUrl;
    this.usuario = userService.usuario;
    
  }

  logouth() {

    this.userService.logout();
    
  }

  buscar( termino : string )
  {

    if ( termino.length === 0 ) return; // verificamos que no este vaciá.
    
    this.router.navigateByUrl( `/dashboard/buscar/${ termino }` )
  }



}
