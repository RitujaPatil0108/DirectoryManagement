import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessFormComponent } from './components/business-form/business-form.component';
import { BusinessAddComponent } from './components/business-add/business-add.component';


export const routes: Routes = [
    { path: '', redirectTo: '/business-list', pathMatch: 'full' },
    { path: 'business-list', component: BusinessListComponent },
    { path: 'business-form', component: BusinessFormComponent },
    { path: 'business-add', component: BusinessAddComponent } ,
    { path: 'business-form/:id', component: BusinessFormComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
