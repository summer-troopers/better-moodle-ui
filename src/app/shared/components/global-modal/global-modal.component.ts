import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { STUDENTS_URL, TEACHERS_URL, ADMINS_URL, GROUPS_URL, SPECIALTIES_URL, COURSES_URL } from '@shared/constants';
import { Group } from '@shared/models/group';
import { Specialty } from '@shared/models/specialty';

@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html'
})
export class GlobalModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  itemAdded: EventEmitter<any> = new EventEmitter();
  itemEdited: EventEmitter<any> = new EventEmitter();
  onAdd: boolean;

  confirmModalRef: BsModalRef;

  itemForm: FormGroup;
  isSubmitted = false;

  item;
  ITEM_URL: string;
  itemType: string;
  groupsName: Array<Group>;
  specialtiesName: Array<Specialty>;

  title: string;
  buttonTitle: string;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public itemModalRef: BsModalRef) { }

  ngOnInit() {
    this.getGroups();
    this.getSpecialties();
    this.initForm();
    this.initUrl();
  }

  initForm() {
    this.initItemForm();
  }

  initItemForm() {
    switch (this.itemType) {
      case 'student':
      case 'teacher':
      case 'admin': {
        this.itemForm = this.formBuilder.group({
          firstName: [this.getItemValue('firstName'), [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]],
          lastName: [this.getItemValue('lastName'), [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]],
          email: [this.getItemValue('email'), [Validators.required, Validators.email]],
          password: [this.getItemValue('password'), Validators.required],
          phoneNumber: [this.getItemValue('phoneNumber'), Validators.required],
        });
        this.addGroupIdIfStudent();
        break;
      }
      case 'specialty': {
        this.itemForm = this.formBuilder.group({
          name: [this.getItemValue('name'), [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)]],
          description: [this.getItemValue('description'), [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)]],
        });
        break;
      }
      case 'group': {
        this.itemForm = this.formBuilder.group({
          name: [this.getItemValue('name'), [Validators.required, Validators.pattern(`^[A-Z]{3}\d{3}`)]],
          spacialtyId: [this.getItemValue('spacialtyId'), Validators.required]
        });
        break;
      }
      case 'course': {
        this.itemForm = this.formBuilder.group({
          name: [this.getItemValue('name'), [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]]
        });
        break;
      }
    }

    if (!this.onAdd) {
      this.itemForm.addControl('id', new FormControl(this.item.id, Validators.required));
    }
  }

  addGroupIdIfStudent() {
    if (this.itemType === 'student') {
      this.itemForm.addControl('groupId', new FormControl(this.getGroupIdValue(), Validators.required));
    }
  }

  getGroupIdValue() {
    if (!this.onAdd) {

      return this.item.groupName;
    } else {
      return '';
    }
  }

  addSpecialtyIdIfGroup() {
    if (this.itemType === 'group') {
      this.itemForm.addControl('specialtyId', new FormControl(this.getSpecialtyIdValue(), Validators.required));
    }
  }

  getItemValue(control) {
    if (!this.onAdd) {
      return this.item[control];
    } else {
      return '';
    }
  }

  get firstName() {
    return this.itemForm.controls.firstName;
  }

  get lastName() {
    return this.itemForm.controls.lastName;
  }

  get email() {
    return this.itemForm.controls.email;
  }

  get password() {
    return this.itemForm.controls.password;
  }

  get phoneNumber() {
    return this.itemForm.controls.phoneNumber;
  }

  get groupId() {
    return this.itemForm.controls.groupId;
  }

  get name() {
    return this.itemForm.controls.name;
  }

  get specialtyId() {
    return this.itemForm.controls.specialtyId;
  }

  get description() {
    return this.itemForm.controls.description;
  }

  getGroups() {
    this.crudService.getItems(GROUPS_URL).subscribe(
      groups => {
        this.groupsName = groups;
      }
    );
  }

  getSpecialties() {
    this.crudService.getItems(SPECIALTIES_URL).subscribe(
      specialties => {
        this.specialtiesName = specialties;
      }
    );
  }

  initUrl() {
    switch (this.itemType) {
      case 'student': {
        this.ITEM_URL = STUDENTS_URL;
        break;
      }
      case 'teacher': {
        this.ITEM_URL = TEACHERS_URL;
        break;
      }
      case 'admin': {
        this.ITEM_URL = ADMINS_URL;
        break;
      }
      case 'group': {
        this.ITEM_URL = GROUPS_URL;
        break;
      }
      case 'specialty': {
        this.ITEM_URL = SPECIALTIES_URL;
        break;
      }
      case 'course': {
        this.ITEM_URL = COURSES_URL;
        break;
      }
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.itemForm.invalid) {
      return;
    }

    if (this.onAdd) {
      this.onAddSubmit();
    } else {
      this.onEditSubmit();
    }
  }

  onAddSubmit() {
    this.crudService.addItem(this.ITEM_URL, this.itemForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((newUser) => {
        this.itemAdded.emit(newUser);
        this.itemModalRef.hide();
      });
  }

  onEditSubmit() {
    this.crudService.editItem(this.ITEM_URL, this.itemForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.itemEdited.emit(this.itemForm.value);
        this.itemModalRef.hide();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
