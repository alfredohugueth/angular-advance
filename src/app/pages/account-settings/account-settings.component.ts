import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme= document.querySelector("#theme");


  constructor() { }

  ngOnInit(): void {
    

  }

  changeTheme( theme:String ){
    

    const url = `./assets/css/colors/${ theme }.css`;
    /* Remplazamos el atributo href del elemento */
    this.linkTheme?.setAttribute('href', url);
    /* Guardamos en el localStorage */
    localStorage.setItem('theme', url);
  }

}
