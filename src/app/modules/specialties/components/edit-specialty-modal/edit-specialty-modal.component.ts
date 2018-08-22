import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL, CONFIRM_MODAL_TIMEOUT } from '@shared/constants';
import { Specialty } from '@shared/models/specialty';

@Component({
  selector: 'app-edit-specialty-modal',
  templateUrl: './edit-specialty-modal.component.html'
})
export class EditSpecialtyModalComponent implements OnInit, OnDestroy {

  editItem: (event: any) => void;

  destroy$: Subject<boolean> = new Subject<boolean>();

  specialtyForm: FormGroup;
  isSubmitted = false;
  specialty: Specialty;
  alerts: Array<Alert> = [];

  constructor(private route: ActivatedRoute,
              public modalRef: BsModalRef,
              private fromBuilder: FormBuilder,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.specialtyForm = this.fromBuilder.group({
      name: ['', Validators.required]
    });
  }

  get specialtyName() {
    return this.specialtyForm.controls.name;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.specialtyForm.invalid) {
      return;
    }
    const newSpecialty = {
      id: this.specialty.id,
      name: this.specialtyForm.value.name
    };
    this.crudService.editItem(SPECIALTIES_URL, newSpecialty).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.alerts.push({type: AlertType.Success, message: `The specialty successfully updated!`});
        setTimeout(this.modalRef.hide, CONFIRM_MODAL_TIMEOUT);
        const event = {
          specialtyName: this.specialtyForm.get('name').value,
          id: this.specialty.id
        };
        this.editItem(event);
      },
      () => {
        this.alerts.push({type: AlertType.Error, message: `Couldn't update the specialty!`});
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
