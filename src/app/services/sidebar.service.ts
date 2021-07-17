import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu : any = [];

  cargarMenu()
  {
    this.menu = JSON.parse( localStorage.getItem( 'menu' ) || '') || [];

    if ( this.menu.length === 0 ) this.router.navigateByUrl('/login');

  }
  // menu: any[] =[
  //   {
  //     title:'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       {titulo:'Main', url:'/'},
  //       {titulo:'ProgressBarr', url:'progress'},
  //       {titulo:'Gráficas', url:'grafica1'},
  //       {titulo:'Promesas', url:'promesas'},
  //       {titulo:'Rxjs', url:'rxjs'}
        

  //     ]
  //   },
  //   {
  //     title:'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'Usuarios', url:'usuarios'},
  //       {titulo:'Hospitales', url:'hospitales'},
  //       {titulo:'Médicos', url:'medicos'},
        

  //     ]
  //   }
  // ]

  constructor( private router : Router ) { }
}
