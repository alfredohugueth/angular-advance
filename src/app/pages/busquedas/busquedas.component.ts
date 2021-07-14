import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  constructor( private activatedRoute : ActivatedRoute ) { }

  ngOnInit(): void 
  {

    this.activatedRoute.params
      .subscribe( ({ termino }) => 
        {

          console.log( termino  );

        })
  }

}
