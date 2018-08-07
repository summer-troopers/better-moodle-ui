import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Specialty } from '@shared/models/specialty';
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

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
  modalRef: BsModalRef;
  specialtyForm: FormGroup;
  isSubmitted = false;
  specialties: Array<Specialty> = [];

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private fromBuilder: FormBuilder,
              private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.id;
    });
    this.initForm();
    this.specialtiesService.getSpecialties().pipe(takeUntil(this.destroy$)).subscribe(specialties => this.specialties = specialties);
  }

  initForm() {
    this.specialtyForm = this.fromBuilder.group({
      name: ['', Validators.required]
    });
  }

  get fields() {
    return this.specialtyForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.specialtyForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const newSpecialty = {
      id: this.id,
      name: this.specialtyForm.value.name
    };
    this.specialtiesService.updateSpecialty(this.id, newSpecialty).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.modalRef.hide();
      this.parent.specialty = newSpecialty;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
