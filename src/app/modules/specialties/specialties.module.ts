import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { SpecialtyDetailsPageComponent, SpecialtiesPageComponent } from '@modules/specialties/containers';
import { AddSpecialtyModalComponent } from './components/add-specialty-modal/add-specialty-modal.component';
import { EditSpecialtyModalComponent } from './components/edit-specialty-modal/edit-specialty-modal.component';
import { specialitiesRoutes } from '@modules/specialties/specialties.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
  EditSpecialtyModalComponent,
  AddSpecialtyModalComponent
];

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
  entryComponents: [
    ...COMPONENTS
  ],
  declarations: [SpecialtyDetailsPageComponent, SpecialtiesPageComponent, ...COMPONENTS]
})
export class SpecialtiesModule {}
