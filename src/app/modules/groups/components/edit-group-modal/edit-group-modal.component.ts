import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { Group } from '@shared/models/group';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL, GROUPS_URL, CONFIRM_MODAL_TIMEOUT } from '@shared/constants';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html'
})
export class EditGroupModalComponent implements OnInit, OnDestroy {

  editItem: (event: any) => void;
  destroy$: Subject<boolean> = new Subject<boolean>();

  group: Group;
  specialty: Specialty;
  groupForm: FormGroup;
  isSubmitted = false;
  alerts: Array<Alert> = [];
  specialties: Array<Specialty> = [];

  lastMatchNotPresent = true;

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
        () => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the specialties!`});
        }
      );
  }

  get groupName() {
    return this.groupForm.controls.name;
  }

  get specialtyName() {
    return this.groupForm.controls.specialty;
  }

  handleNoResults(event) {
    this.lastMatchNotPresent = event;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.groupForm.invalid || this.lastMatchNotPresent) {
      this.alerts.push({type: AlertType.Error, message: `Invalid form!`});
      return;
    }
    const specialtyName: string = this.groupForm.value.specialty;
    const specialty = this.specialties.find((spec) => spec.name === specialtyName);
    const newGroup = {
      id: this.group.id,
      name: this.groupForm.value.name,
      specialtyId: specialty.id,
    };
    this.crudService.editItem(GROUPS_URL, newGroup).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.alerts.push({type: AlertType.Success, message: `The group successfully updated!`});
        setTimeout(this.modalRef.hide, CONFIRM_MODAL_TIMEOUT);
        const event = {
          groupName: this.groupForm.get('name').value,
          specialty
        };
        this.editItem(event);
      },
      () => {
        this.alerts.push({type: AlertType.Error, message: `Couldn't update the group!`});
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
