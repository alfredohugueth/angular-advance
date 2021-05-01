import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme= document.querySelector("#theme");


  constructor() {
    const url = localStorage.getItem("theme") || './assets/css/colors/dark-purple.css'
    /* Comprobamos si el valor es null */

    this.linkTheme?.setAttribute('href', url)
    

  }

  changeTheme( theme:String ){
    

    const url = `./assets/css/colors/${ theme }.css`;
    /* Remplazamos el atributo href del elemento */
    this.linkTheme?.setAttribute('href', url);
    /* Guardamos en el localStorage */
    localStorage.setItem('theme', url);

    
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links =document.querySelectorAll('.selector');


  
    links?.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl =  `./assets/css/colors/${ btnTheme }.css`;

      const currenTheme = this.linkTheme?.getAttribute('href');
      

      if ( btnThemeUrl === currenTheme ) elem.classList.add('working');



    })
  }
}
