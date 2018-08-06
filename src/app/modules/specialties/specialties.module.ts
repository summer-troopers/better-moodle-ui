import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpecialtyDetailsPageComponent, SpecialtiesPageComponent } from '@modules/specialties/containers';
import { AddSpecialtyModalComponent } from './components/add-specialty-modal/add-specialty-modal.component';
import { EditSpecialtyModalComponent } from './components/edit-specialty-modal/edit-specialty-modal.component';
import { specialitiesRoutes } from '@modules/specialties/specialties.routes';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    specialitiesRoutes
  ],
  declarations: [SpecialtyDetailsPageComponent, SpecialtiesPageComponent, AddSpecialtyModalComponent, EditSpecialtyModalComponent]
})
export class SpecialtiesModule {
}
