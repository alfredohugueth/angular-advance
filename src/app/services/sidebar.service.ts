import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] =[
    {
      title:'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'/'},
        {titulo:'ProgressBarr', url:'progress'},
        {titulo:'Gráficas', url:'grafica1'},
        {titulo:'Promesas', url:'promesas'},
        {titulo:'Rxjs', url:'rxjs'}
        

      ]
    },
    {
      title:'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios', url:'usuarios'},
        {titulo:'Hospitales', url:'hospitales'},
        {titulo:'Médicos', url:'medicos'},
        

      ]
    }
  ]

  constructor() { }
}
