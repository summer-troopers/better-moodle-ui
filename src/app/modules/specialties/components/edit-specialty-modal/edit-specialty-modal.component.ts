import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Specialty } from '@shared/models/specialty';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { SpecialtyDetailsPageComponent } from '@modules/specialties/containers';

@Component({
  selector: 'app-edit-specialty-modal',
  templateUrl: './edit-specialty-modal.component.html',
  styleUrls: ['./edit-specialty-modal.component.scss']
})
export class EditSpecialtyModalComponent implements OnInit, OnDestroy {

  @Input('specialty')
  specialty: Specialty;

  @Input('parent')
  parent: SpecialtyDetailsPageComponent;

  id: string;
  modalRef: BsModalRef;
  specialtyForm: FormGroup;
  submitted = false;
  subscriptions: Array<Subscription> = [];
  specialties: Array<Specialty> = [];

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private fromBuilder: FormBuilder, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.id = params.id;
    }));
    this.specialtyForm = this.fromBuilder.group({
      name: ['', [Validators.required]],
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
      id: this.id,
      name: this.specialtyForm.value.name
    };
    this.subscriptions.push(this.specialtiesService.updateSpecialty(this.id, newSpecialty).subscribe(() => {
      this.modalRef.hide();
      this.parent.specialty = newSpecialty;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
