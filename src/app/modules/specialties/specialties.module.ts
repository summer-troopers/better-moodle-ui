import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpecialtyDetailsPageComponent, SpecialtiesPageComponent} from '@modules/specialties/containers';
import {RouterModule} from '@angular/router';
import {specialitiesRoutes} from '@modules/specialties/specialties.routes';
import { AddSpecialtyModalComponent } from './components/add-specialty-modal/add-specialty-modal.component';
import { EditSpecialtyModalComponent } from './components/edit-specialty-modal/edit-specialty-modal.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    specialitiesRoutes
  ],
  declarations: [SpecialtyDetailsPageComponent, SpecialtiesPageComponent, AddSpecialtyModalComponent, EditSpecialtyModalComponent]
})
export class SpecialtiesModule {
}
