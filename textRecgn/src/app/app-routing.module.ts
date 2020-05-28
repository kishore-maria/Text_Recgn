import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecgnComponent } from './Pages/recgn/recgn.component';

const routes: Routes = [
  {
    path: '',
    component: RecgnComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // useHash: true,
      // enableTracing: true,
      initialNavigation: false,
    })
  ]
})
export class AppRoutingModule { }
