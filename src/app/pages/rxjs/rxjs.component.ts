import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() { 
    
    


    this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs:', valor),
      (err) => console.log('Error:',err),
      () => console.log('Obs terminado')

    );
  }


  retornaObservable(): Observable<number>{
    let i= -1;
    
    return new Observable<number>( observer => {

      const intervalo = setInterval( ()=> {
        
        i++;
        observer.next(i);

        if(i === 4){ 
          clearInterval( intervalo );
          observer.complete();
        }

        if(i === 2){ 
          observer.error('i llego al valor de 2');
        }
      },1000)

    });

  }


}
