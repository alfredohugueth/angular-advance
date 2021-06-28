import { Component, OnInit } from '@angular/core';
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
  public usuario : Usuario | undefined;


  constructor( private userService : UsuarioService) 
  { 
    
    this.imgUrl = userService.usuario?.imagenUrl;
    this.usuario = userService.usuario;
    
  }

  logouth() {

    this.userService.logout();
    
  }



}
