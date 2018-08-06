import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Specialty } from '@shared/models/specialty';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-add-specialty-modal',
  templateUrl: './add-specialty-modal.component.html',
  styleUrls: ['./add-specialty-modal.component.scss']
})
export class AddSpecialtyModalComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  specialtyForm: FormGroup;
  submitted = false;
  subscriptions: Array<Subscription> = [];
  specialties: Array<Specialty> = [];

  constructor(private modalService: BsModalService, private fromBuilder: FormBuilder, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.specialtyForm = this.fromBuilder.group({
      name: ['', [Validators.required]]
    });
    this.subscriptions.push(this.specialtiesService.getSpecialties().subscribe(specialties => this.specialties = specialties));
  }

  get fields() {
    return this.specialtyForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    this.submitted = true;

    const newSpecialty = {
      name: this.specialtyForm.value.name
    };
    this.subscriptions.push(this.specialtiesService.addSpecialty(newSpecialty).subscribe(() => {
      this.modalRef.hide();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
