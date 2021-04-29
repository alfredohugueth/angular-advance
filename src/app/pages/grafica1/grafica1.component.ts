import { Component } from '@angular/core';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

 public labels1:Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 public data1 = [
  [350, 450, 100]
];

}
