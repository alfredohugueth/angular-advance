/* Modules*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components*/
import { PagesComponent } from './pages.component';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: 'dashboard', 
        component:PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad : [ AuthGuard ],
        loadChildren : () => import('./child-routes.module').then( m => m.ChildRoutesModule )
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
