import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnatomicalStructuresComponent } from './components/anatomical-structures/anatomical-structures.component';

const routes: Routes = [
  {path:"",component:AnatomicalStructuresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
