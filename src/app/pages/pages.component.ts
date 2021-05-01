import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme= document.querySelector("#theme");
  private theme='./assets/css/colors/dark-purple.css'
  variable:any=null

  ngOnInit(): void {
    /* Buscamos el tema del local storage */

    this.variable = localStorage.getItem("theme");
    /* Comprobamos si el valor es null */

    if(this.variable == null) this.linkTheme?.setAttribute('href', this.theme)
    else this.linkTheme?.setAttribute('href',this.variable);

    
  }

}
