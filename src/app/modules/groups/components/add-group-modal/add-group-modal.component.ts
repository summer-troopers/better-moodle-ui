import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GROUPS_URL, SPECIALTIES_URL, CONFIRM_MODAL_TIMEOUT } from '@shared/constants';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html'
})
export class AddGroupModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  groupForm: FormGroup;
  isSubmitted = false;
  alerts: Array<Alert> = [];
  specialties: Array<Specialty> = [];

  lastSpecialtyMatchNotPresent = true;

  constructor(public modalRef: BsModalRef,
              private fromBuilder: FormBuilder,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.initForm();
    this.initSpecialties();
  }

  initForm() {
    this.groupForm = this.fromBuilder.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required]
    });
  }

  initSpecialties() {
    this.crudService.getItems(SPECIALTIES_URL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        specialties => {
          this.specialties = specialties;
        },
        error => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the specialties!`});
        });
  }

  get groupName() {
    return this.groupForm.controls.name;
  }

  get specialtyName() {
    return this.groupForm.controls.specialty;
  }

  handleNoResults(event) {
    this.lastSpecialtyMatchNotPresent = event;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.groupForm.invalid || this.lastSpecialtyMatchNotPresent) {
      this.alerts.push({type: AlertType.Error, message: `Invalid form!`});
      return;
    }

    const specialtyName: string = this.groupForm.value.specialty;
    const {id} = this.specialties.find((specialty) => specialty.name === specialtyName);
    const newGroup = {
      name: this.groupForm.value.name,
      specialtyId: id
    };

    this.crudService.addItem(GROUPS_URL, newGroup)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        success => {
          this.alerts.push({type: AlertType.Success, message: `New group successfully added!`});
          setTimeout(this.modalRef.hide, CONFIRM_MODAL_TIMEOUT);
        },
        error => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't add new group!`});
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
