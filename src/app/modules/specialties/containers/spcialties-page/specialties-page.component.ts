import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Specialty } from '@shared/models/specialty';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-specialities-page',
  templateUrl: './specialties-page.component.html',
  styleUrls: ['./specialties-page.component.scss']
})
export class SpecialtiesPageComponent implements OnInit, OnDestroy {

  specialtyForm: FormGroup;
  submitted = false;
  subscriptions: Array<Subscription> = [];
  specialties: Array<Specialty> = [];

  constructor(private fromBuilder: FormBuilder, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.specialtyForm = this.fromBuilder.group({
      name: ['', [Validators.required]],
    });
    this.subscriptions.push(this.specialtiesService.getSpecialties().subscribe(specialties => this.specialties = specialties));
  }

  get fields() {
    return this.specialtyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const newSpecialty = {
      name: this.specialtyForm.value.name,
    };
    this.specialtiesService.addSpecialty(newSpecialty).toPromise();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
