import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { Specialty } from '@shared/models/specialty';

@Component({
  selector: 'app-specialty-details-page',
  templateUrl: './specialty-details-page.component.html',
  styleUrls: ['./specialty-details-page.component.scss']
})
export class SpecialtyDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
  isEditable = false;
  specialty: Specialty;

  constructor(private route: ActivatedRoute, private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
   this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.id;
      this.specialtiesService.getSpecialty(this.id).pipe(takeUntil(this.destroy$)).subscribe((element) => {
        this.specialty = element;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  deleteSpecialty() {
    this.specialtiesService.deleteSpecialty(this.id).toPromise();
  }
}
