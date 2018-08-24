import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HomePageComponent]
})
export class HomeModule {
}
