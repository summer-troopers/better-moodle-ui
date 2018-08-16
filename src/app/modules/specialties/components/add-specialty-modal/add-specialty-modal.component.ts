import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL, CONFIRM_MODAL_TIMEOUT } from '@shared/constants';

@Component({
  selector: 'app-add-specialty-modal',
  templateUrl: './add-specialty-modal.component.html'
})
export class AddSpecialtyModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  public event: EventEmitter<any> = new EventEmitter();

  alerts: Array<Alert> = [];
  specialtyForm: FormGroup;
  isSubmitted = false;
  specialties: Array<Specialty> = [];

  constructor(public modalRef: BsModalRef,
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
      name: this.specialtyForm.value.name
    };
    this.crudService.addItem(SPECIALTIES_URL, newSpecialty).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.alerts.push({type: AlertType.Success, message: `New specialty successfully added!`});
        setTimeout(this.modalRef.hide, CONFIRM_MODAL_TIMEOUT);
      },
      () => {
        this.alerts.push({type: AlertType.Error, message: `Couldn't add new specialty!`});
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
