import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';

import { SpecialtyDetailsPageComponent, SpecialtiesPageComponent } from '@modules/specialties/containers';
import { specialitiesRoutes } from '@modules/specialties/specialties.routes';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    specialitiesRoutes
  ],
  declarations: [SpecialtyDetailsPageComponent, SpecialtiesPageComponent]
})
export class SpecialtiesModule { }
