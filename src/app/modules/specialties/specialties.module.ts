import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpecialtyDetailsPageComponent, SpecialtiesPageComponent} from '@modules/specialties/containers';
import {RouterModule} from '@angular/router';
import {AddSpecialtyComponent} from '@modules/specialties/components/add-specialty/add-specialty.component';
import {specialitiesRoutes} from '@modules/specialties/specialties.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    specialitiesRoutes
  ],
  declarations: [AddSpecialtyComponent, SpecialtyDetailsPageComponent, SpecialtiesPageComponent]
})
export class SpecialtiesModule {
}
