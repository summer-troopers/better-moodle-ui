import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-add-specialty-modal',
  templateUrl: './add-specialty-modal.component.html',
  styleUrls: ['./add-specialty-modal.component.scss']
})
export class AddSpecialtyModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;
  specialtyForm: FormGroup;
  isSubmitted = false;
  specialties: Array<Specialty> = [];

  constructor(private modalService: BsModalService,
              private fromBuilder: FormBuilder,
              private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
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
      name: this.specialtyForm.value.name
    };
    this.specialtiesService.addSpecialty(newSpecialty).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.modalRef.hide();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
