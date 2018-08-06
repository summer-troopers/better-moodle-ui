import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Specialty } from '@shared/models/specialty';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-specialities-page',
  templateUrl: './specialties-page.component.html',
  styleUrls: ['./specialties-page.component.scss']
})
export class SpecialtiesPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  specialties: Array<Specialty> = [];

  constructor(private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.subscription = this.specialtiesService.getSpecialties().subscribe((specialties: Array<Specialty>) => this.specialties = specialties);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
