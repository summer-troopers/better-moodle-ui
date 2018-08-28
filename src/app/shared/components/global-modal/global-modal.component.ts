import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { STUDENTS_URL, TEACHERS_URL, ADMINS_URL, GROUPS_URL, SPECIALTIES_URL, COURSES_URL } from '@shared/constants';

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

  title: string;
  buttonTitle: string;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public itemModalRef: BsModalRef) { }

  ngOnInit() {
    this.initForm();
    this.initUrl();
  }

  initForm() {
    if (this.onAdd) {
      this.initAddForm();
    } else {
      this.initEditForm();
    }
  }

  initAddForm() {
    if (this.itemType === 'student' || this.itemType === 'admin' || this.itemType === 'teacher') {
      this.itemForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      });
      this.addGroupIdIfStudent();
    } else {
      switch (this.itemType) {
        case 'specialty': {
          this.itemForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)]],
          });
          break;
        }
        case 'group': {
          this.itemForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern(`^[A-Z]{3}\d{3}`)]],
            spacialtyId: ['', Validators.required]
          });
          break;
        }
        case 'course': {
          this.itemForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]]
          });
          break;
        }
      }
    }
  }

  initEditForm() {
    if (this.itemType === 'student' || this.itemType === 'admin' || this.itemType === 'teacher') {
      this.itemForm = new FormGroup({
        id: new FormControl(this.item.id, Validators.required),
        firstName: new FormControl(this.item.firstName, [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]),
        lastName: new FormControl(this.item.lastName, [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]),
        email: new FormControl(this.item.email, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(this.item.phoneNumber, Validators.required)
      });
      this.addGroupIdIfStudent();
    } else {
      switch (this.itemType) {
        case 'specialty': {
          this.itemForm = new FormGroup({
            id: new FormControl(this.item.id),
            name: new FormControl(this.item.name, [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)]),
            description: new FormControl(this.item.name, [Validators.required, Validators.pattern(`^[a-z A-Z]*$`), Validators.maxLength(50)])
          });
          break;
        }
        case 'group': {
          this.itemForm = new FormGroup({
            id: new FormControl(this.item.id),
            name: new FormControl(this.item.name, [Validators.required, Validators.pattern(`^[A-Z]{3}\d{3}`)]),
            specialtyId: new FormControl(this.item.specialtyId, Validators.required),
          });
          break;
        }
        case 'course': {
          this.itemForm = new FormGroup({
            id: new FormControl(this.item.id),
            name: new FormControl(this.item.name, [Validators.required, Validators.pattern(`^[a-z A-Z -]*$`), Validators.maxLength(50)]),
          });
          break;
        }
      }
    }
  }

  addGroupIdIfStudent() {
    if (this.itemType === 'student') {
      this.itemForm.addControl('groupId', new FormControl(this.getGroupIdValue(), Validators.required));
    }
  }

  getGroupIdValue() {
    if (!this.onAdd) {
      return this.item.groupId;
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
