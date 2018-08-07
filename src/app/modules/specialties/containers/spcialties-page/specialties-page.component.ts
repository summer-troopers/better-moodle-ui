import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-specialties-page',
  templateUrl: './specialties-page.component.html',
  styleUrls: ['./specialties-page.component.scss']
})
export class SpecialtiesPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  specialties: Array<Specialty> = [];

  constructor(private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
 this.specialtiesService.getSpecialties().pipe(takeUntil(this.destroy$)).subscribe((specialties: Array<Specialty>) => this.specialties = specialties);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
