import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpecialtiesService } from '../../specialties.service';
import { Subscription } from 'rxjs';
import { Specialty } from '@shared/models/specialty';

@Component({
  selector: 'app-specialty-details-page',
  templateUrl: './specialty-details-page.component.html',
  styleUrls: ['./specialty-details-page.component.scss']
})
export class SpecialtyDetailsPageComponent implements OnInit, OnDestroy {

  id: string;
  specialty: Specialty;
  isEditable = false;

  subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private specialtyService: SpecialtiesService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.id = params.id;
      this.subscriptions.push(this.specialtyService.getSpecialty(this.id).subscribe((element) => {
        this.specialty = element;
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  deleteGroup() {
    this.specialtyService.deleteSpecialty(this.id).toPromise();
  }

  submitGroup() {
    this.specialtyService.updateSpecialty(this.id, this.specialty).toPromise();
  }
}
