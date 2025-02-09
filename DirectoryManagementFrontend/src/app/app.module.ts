import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessFormComponent } from './components/business-form/business-form.component';
import { BusinessAddComponent } from './components/business-add/business-add.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    BusinessListComponent,
    BusinessFormComponent,
    BusinessAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
